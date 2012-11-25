<?php
class User_Model extends WOA {

   function __construct() { parent::__construct(); }

   public function authenticate_user($assoc_arr)
   {
      // Sanitize User Input
      $text = new Text();
      foreach ($assoc_arr as $key => $value) $assoc_arr[$key] = $text->sanitize_string($value);

      // Convert Keys to Variables (ex. $_POST['name'] -> $name)
      extract($assoc_arr);

      // Fetch User from DB
      $db = new DB();
      $results = $db->select_from_where_and(array('*'), 'users', 'username', $un, 'password', sha1($pw));

      // Match Found
      if (count($results) > 0) {

         $user = $results[0];

         // Set session vars
         $this->set_user_session($user);

         // Generate User Data Key & Cache User Data
         $data_key = sha1($text->random_number(5));
         $data_key = substr($data_key, 0, 16);

         // Overwrite User Cache (if logged in from multiple locations)
         $user_cache_result = $db->select_from_where(array('*'), 'user_cache', 'user_id', $_SESSION['user']['user_id']);
         if (count($user_cache_result) > 0) { $db->delete_from_where('user_cache', 'user_id', $_SESSION['user']['user_id']); }
         $db->insert_into('user_cache', array('user_id' => $_SESSION['user']['user_id'],'data_key' => $data_key, 'user_data' => json_encode($_SESSION['user']) ));

         // Return Data
         JSON::print_json(array('response' => 'true', 'user' => $_SESSION['user'], 'data_key' => $data_key));
      }

      // Match NOT Found
      else
      {
         $_SESSION['logged_in'] = false;
         JSON::print_json(array('response' => 'false'));
      }
   }

   public function restore_user_session($user_key, $json = false)
   {
      // Fetch User Data
      $db = new DB();
      $results = $db->select_from_where(array('user_data'), 'user_cache', 'data_key', $user_key);
      $user = json_decode($results[0]['user_data']);

      // Reset Session
      $this->set_user_session($user);

      // From AJAX, return JSON
      if ($json) JSON::print_json(array('response' => 'true', 'user' => $_SESSION['user']));
   }

   private function set_user_session($user)
   {
       // Array
       if (gettype($user) == 'array') {
           $_SESSION['user']['user_id']    = $user['user_id'];
           $_SESSION['user']['username']   = $user['username'];
           $_SESSION['user']['first_name'] = $user['first_name'];
           $_SESSION['user']['last_name']  = $user['last_name'];
           $_SESSION['user']['email']      = $user['email'];
           $_SESSION['user']['access']     = $user['access'];
       }

       // Object
       else {
           $_SESSION['user']['user_id']    = $user->user_id;
           $_SESSION['user']['username']   = $user->username;
           $_SESSION['user']['first_name'] = $user->first_name;
           $_SESSION['user']['last_name']  = $user->last_name;
           $_SESSION['user']['email']      = $user->email;
           $_SESSION['user']['access']     = $user->access;
       }

      $_SESSION['logged_in'] = true;
   }

   public function update_user($assoc_arr)
   {
      // Sanitize User Input
      $text = new Text();
      foreach ($assoc_arr as $key => $value) $assoc_arr[$key] = $text->sanitize_string($value);

      $db = new DB();

      // Check for existing username
      if (isset($assoc_arr['username'])) {
         $results = $db->select_from_where(array('*'), 'users', 'username', $assoc_arr['username']);

         // Match Found
         if (count($results) > 0) {
            JSON::print_json(array('error' => 'Username is taken.'));
            exit;
         }
      }

      // Check for existing email
      if (isset($assoc_arr['email'])) {
         $results = $db->select_from_where(array('*'), 'users', 'email', $assoc_arr['email']);

         // Match Found
         if (count($results) > 0) {
            JSON::print_json(array('error' => 'Email is taken.'));
            exit;
         }
      }

      // Update into DB
      if (isset($assoc_arr['password'])) $assoc_arr['password'] = sha1($assoc_arr['password']);
      $db->update_where('users', $assoc_arr, 'user_id', $_SESSION['user']['user_id']);

      // Update Session
      foreach ($assoc_arr as $key => $value) $_SESSION['user'][$key] = $assoc_arr[$key];
      $response = $_SESSION['user'];
      unset($response['password']);

      // Update User Cache
      $db->update_where('user_cache', array('user_data' => json_encode($response)), 'user_id', $_SESSION['user']['user_id']);

      JSON::print_json(array('response' => 'true', 'user' => $response));
   }

   public function reset_password($assoc_arr)
   {
      $text = new Text();
      $db = new DB();
      $email = new Email();

      // Sanitize User Input
      $assoc_arr['email'] = $text->sanitize_string($assoc_arr['email']);

      // Find Existing User
      $results = $db->select_from_where(array('*'), 'users', 'email', $assoc_arr['email']);

      // Match Found
      if (count($results) > 0) {
         $user = $results[0];

         // Change User PW
         $new_pw = $text->random_string();
         $db->update_where('users', array('password' => sha1($new_pw)), 'user_id', $user['user_id']);

         // Send Email
         $msg = 'Your password has been reset.<br/><br/>Username: ' . $user['username'] . '<br/><br/>Password: ' . $new_pw;
         $email->send($user['email'], 'World Of Anarchy', 'Password Reset', $msg);
      }

      // Match Not Found
      else JSON::print_json(array('error' => 'Account not found.'));
   }

   public function delete_user_cache()
   {
      $db = new DB();
      $user_id = $_SESSION['user']['user_id'];
      $db->delete_from_where('user_cache', 'user_id', $user_id);

      unset($_SESSION['user']);
      unset($_SESSION['logged_in']);
   }
}