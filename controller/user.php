<?php
class User extends WOA {

   function __construct() {
      parent::__construct();
      require_once('model/user.php');
   }

   function submit_login_form()
   {
      if ($_POST)
      {
         $user_model = new User_Model();
         $user_model->authenticate_user($_POST);
      }
   }

   function reset_user_password()
   {
      if ($_POST)
      {
         $user_model = new User_Model();
         $user_model->reset_password($_POST);
      }
   }

   function refresh_user_session()
   {
      if ($_POST)
      {
         $user_model = new User_Model();
         $user_model->restore_user_session($_POST);
      }
   }

   function login_check($return_type = 'print')
   {
      $login_status = ($_SESSION['logged_in'] == true AND isset($_COOKIE['user'])) ? 'true' : 'false';
      if ($return_type == 'print') print $login_status;
      else return $login_status;
   }

   function update_user_info()
   {
      if ($this->login_check('return') == 'true')
      {
         if ($_POST)
         {
            $user_model = new User_Model();
            $user_model->update_user($_POST);
         }
      }

      else JSON::print_json(array('error' => 'You are not logged in.'));
   }

   function log_out()
   {
      $_SESSION['logged_in'] = false;
      unset($_SESSION['user']);
   }

   function get_updates($project_id = null)
   {
      if ($this->login_check('return') == 'true')
      {
         $user_model = new User_Model();
         $user_model->get_updates_data($project_id);
      }
   }
}
