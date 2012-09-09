<?php
class User_Model extends DB {
   function __construct() { session_start(); }

   function authenticate_user($assoc_arr)
   {
      // Sanitize User Input
      $text = new Text();
      foreach ($assoc_arr as $key => $value) $assoc_arr[$key] = $text->sanitize_string($value);

      // Convert Keys to Variables (ex. $_POST['name'] -> $name)
      extract($assoc_arr);

      // Fetch User from DB
      $results = $this->select_from_where_and(array('*'), 'users', 'username', $un, 'password', $pw);

      // Match Found
      if (count($results) > 0) {
         // Set session vars
         $this->set_user_session($results[0]);

         JSON::print_json(array('response' => 'true', 'user' => $_SESSION['user']));
      }

      // Match NOT Found
      else
      {
         $_SESSION['logged_in'] = false;

         JSON::print_json(array('response' => 'false'));
      }
   }

   function set_user_session($user_obj)
   {
      $_SESSION['user']['username'] = $user_obj['username'];
      $_SESSION['user']['first_name'] = $user_obj['first_name'];
      $_SESSION['user']['last_name'] = $user_obj['last_name'];
      $_SESSION['user']['access'] = $user_obj['access'];
   }
}