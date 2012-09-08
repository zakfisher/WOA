<?php
session_start();

$pages = array('home', 'employees', 'managers', 'prices', 'about', 'legal');

$uri = explode("/", $_SERVER['REQUEST_URI']);

$controller = null;
$function = 'index';
$params = array();

define(BASE_URL, ($_SERVER['SERVER_NAME'] != 'www-zak.i.upmo.com') ? 'Location: http://www.upmo.com' : 'Location: http://www-zak.i.upmo.com');

if (file_exists('controller/' . $uri[1] . '.php'))
{
   $controller = $uri[1];
   $function = ($uri[2] == '') ? $function : $uri[2];
   $params = $uri;
   unset($params[0], $params[1], $params[2]);
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
         $_SESSION['page'] = $p;
         header(BASE_URL . '#!/' . $p);
         exit;
      }
   }

   require_once('controller/' . $controller . '.php');
   $controller = ucfirst(strtolower($controller));

   // If Method doesn't exist, BASE_URL to home page
   if (! method_exists($controller, $function))
   {
      header(BASE_URL);
      exit;
   }

   $c = new $controller();
   call_user_func_array(array($c, $function), $params);
   exit;
}