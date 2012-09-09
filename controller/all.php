<?php
session_start();

$pages = array('home', 'dashboard', 'downloads', 'about', 'contact');

$uri = explode("/", $_SERVER['REQUEST_URI']);

$controller = null;
$function = 'index';
$params = array();

define(BASE_URL, ($uri[1] == 'dev') ? 'http://www.worldofanarchy.com/dev/' : 'http://www.worldofanarchy.com/');

// User NOT Logged In
if (!isset($_COOKIE['user'])) $_SESSION['logged_in'] = false;
else
{
   $user_obj = json_decode(stripcslashes($_COOKIE['user']));
   $_SESSION['logged_in'] = true;
   $_SESSION['user']['username'] = $user_obj->username;
   $_SESSION['user']['first_name'] = $user_obj->first_name;
   $_SESSION['user']['last_name'] = $user_obj->last_name;
   $_SESSION['user']['access'] = $user_obj->access;
}

// Dev
if ($uri[1] == 'dev')
{
   if (file_exists('controller/' . $uri[2] . '.php'))
   {
      $controller = $uri[2];
      $function = ($uri[3] == '') ? $function : $uri[3];
      $params = $uri;
      unset($params[0], $params[1], $params[2], $params[3]);
   }
}

// Prod
else
{
   if (file_exists('controller/' . $uri[1] . '.php'))
   {
      $controller = $uri[1];
      $function = ($uri[2] == '') ? $function : $uri[2];
      $params = $uri;
      unset($params[0], $params[1], $params[2]);
   }
}

// Call Method
if ($controller != null) {

   // If BASE_URLing to a page,
   // - Change the url for client-side processing
   // - This BASE_URLs to the home page with #!
   foreach ($pages as $p)
   {
      if ($controller == $p && $function == 'index')
      {
         $loadpage = true;

         // Check if user is logged in
         if ($p == 'dashboard' AND $_SESSION['logged_in'] == false) $loadpage = false;

         if ($loadpage == true)
         {
            $_SESSION['page'] = $p;
            header('Location: ' . BASE_URL . '#!/' . $p);
         }
         else
         {
            $_SESSION['page'] = 'home';
            header('Location: ' . BASE_URL);
         }
         exit;
      }
   }

   require_once('controller/' . $controller . '.php');
   $controller = ucfirst(strtolower($controller));

   // If Method doesn't exist, BASE_URL to home page
   if (! method_exists($controller, $function))
   {
      header('Location: ' . BASE_URL);
      exit;
   }

   $c = new $controller();
   call_user_func_array(array($c, $function), $params);
   exit;
}