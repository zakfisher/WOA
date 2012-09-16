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
         $user = $results[0];

         // Create Login Token and store in DB
         $user['token'] = rand(0, 32000);
         $this->update_where('users', array('login_token' => $user['token']), 'user_id', $user['user_id']);

         // Set session vars
         $this->set_user_session($user);
         JSON::print_json(array('response' => 'true', 'user' => $_SESSION['user']));
      }

      // Match NOT Found
      else
      {
         $_SESSION['logged_in'] = false;
         JSON::print_json(array('response' => 'false'));
      }
   }

   function refresh_user_session($login_token)
   {
      // Fetch User from DB
      $results = $this->select_from_where(array('*'), 'users', 'login_token', $login_token);

      // Match Found
      if (count($results) > 0) {
         $user = $results[0];

         // Set Session vars
         $this->set_user_session($user);
         JSON::print_json($_SESSION['user']);
      }
   }

   private function set_user_session($user_obj)
   {
      $_SESSION['logged_in'] = true;
      $_SESSION['access'] = $user_obj['access'];

      // Store User Info in Session
      $_SESSION['user']['username'] = $user_obj['username'];
      $_SESSION['user']['first_name'] = $user_obj['first_name'];
      $_SESSION['user']['last_name'] = $user_obj['last_name'];
      $_SESSION['user']['token'] = $user_obj['token'];
   }
}