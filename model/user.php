<?php
class User_Model extends WOA {

   function __construct() {
      parent::__construct();
   }

   function authenticate_user($assoc_arr)
   {
      // Sanitize User Input
      $text = new Text();
      foreach ($assoc_arr as $key => $value) $assoc_arr[$key] = $text->sanitize_string($value);

      // Convert Keys to Variables (ex. $_POST['name'] -> $name)
      extract($assoc_arr);

      // Fetch User from DB
      $db = new DB();
      $results = $db->select_from_where_and(array('*'), 'users', 'username', $un, 'password', $pw);

      // Match Found
      if (count($results) > 0) {

         $user = $results[0];
         $user['sub_page'] = 'updates';

         // Set session vars
         $this->set_user_session($user);
         JSON::print_json(array('response' => 'true', 'user' => $_SESSION['user'], 'sub_page' => 'updates'));
      }

      // Match NOT Found
      else
      {
         $_SESSION['logged_in'] = false;
         JSON::print_json(array('response' => 'false'));
      }
   }

   function restore_user_session($user, $obj = null)
   {
      $this->set_user_session($user, $obj);
      if ($obj == null) JSON::print_json(array('response' => 'true', 'user' => $_SESSION['user'], 'sub_page' => $_SESSION['sub_page']));
   }

   private function set_user_session($user, $obj = null)
   {
      $_SESSION['logged_in'] = true;
      $_SESSION['sub_page']           = ($obj == null) ? $user['sub_page']   : $user->sub_page;
      $_SESSION['user']['username']   = ($obj == null) ? $user['username']   : $user->username;
      $_SESSION['user']['first_name'] = ($obj == null) ? $user['first_name'] : $user->first_name;
      $_SESSION['user']['last_name']  = ($obj == null) ? $user['last_name']  : $user->last_name;
      $_SESSION['user']['access']     = ($obj == null) ? $user['access']     : $user->access;
   }
}