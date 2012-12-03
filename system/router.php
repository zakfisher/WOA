<?php
session_start();

$pages = array('home', 'dashboard', 'music', 'about', 'contact');

$uri = explode("/", $_SERVER['REQUEST_URI']);
$controller = $uri[1];
$function = $uri[2] == '' ? 'index' : $uri[2];

// If logged in, restore session
if (isset($_COOKIE['user_key']))
{
   require_once('model/user.php');
   $user_model = new User_Model();
   $user_model->restore_user_session($_COOKIE['user_key']);
}

// Login Check (for dashboard)
if (($controller == 'dashboard') AND (!isset($_SESSION['logged_in']) OR $_SESSION['logged_in'] == false ))
{
   $_SESSION['page'] = 'home';
   header('Location: ' . BASE_URL);
   exit;
}

// Page Check (Default to Home)
if (!in_array($controller, $pages) AND $controller != '' AND !file_exists('controller/' . $controller . '.php'))
{
   $_SESSION['page'] = 'home';
   header('Location: ' . BASE_URL);
   exit;
}

if (file_exists('controller/' . $controller . '.php'))
{
   require_once('controller/' . $controller . '.php');

   /* * * * * * * * * * * * * * * * * * *
    * Use Cases:                        *
    *                                   *
    * 1) /music                         *
    *    - Direct to Page, no params    *
    *    - End: #!/music                *
    *                                   *
    * 2) /music/track/artist            *
    *    - Direct to Page, with params  *
    *    - End: #!/music/track/artist   *
    *                                   *
    * 3) /music/all_tracks              *
    *    - API Call, params optional    *
    *                                   *
    * * * * * * * * * * * * * * * * * * */

   // Set Params
   $params = $uri;

   // Method DOES NOT Exist (Use Cases: 1, 2)
   if (! method_exists(ucfirst(strtolower($controller)), $function))
   {
      /* * * * * * * * * * * * * * * * * * * * *
       * (UC 1) - Direct to Page, no params    *
       * ex: /music                            *
       * * * * * * * * * * * * * * * * * * * * */
      if ($function == 'index')
      {
         // Specific Page
         if (in_array($controller, $pages))
         {
            $_SESSION['page'] = $controller;
            header('Location: ' . BASE_URL . '#!/' . $controller);
            exit;
         }

         // Default to Home
         else { header('Location: ' . BASE_URL); exit; }
      }

      /* * * * * * * * * * * * * * * * * * * * *
       * (UC 2) - Direct to Page, with params  *
       * ex: /music/track/artist               *
       * $function != 'index'                  *
       * * * * * * * * * * * * * * * * * * * * */
      else
      {
         unset($params[0], $params[1]);

         // Format params for URL
         $params = implode("/", $params);

         $_SESSION['page'] = $controller;
         header('Location: ' . BASE_URL . '#!/' . $controller . '/' . $params);
         exit;
      }
   }

   // Method DOES exist (Use Case: 3)
   else
   {
      /* * * * * * * * * * * * * * * * * * * * *
       * (UC 3) - API Call, params optional    *
       * ex: /music/all_tracks                 *
       * * * * * * * * * * * * * * * * * * * * */
      unset($params[0], $params[1], $params[2]);

      $c = new $controller();
      call_user_func_array(array($c, $function), $params);
      exit;
   }
}