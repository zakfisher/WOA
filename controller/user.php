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

   function refresh_user_session()
   {
      if ($_POST)
      {
         $user_model = new User_Model();
         $user_model->restore_user_session($_POST);
      }
   }

   function login_check()
   {
      if ($_SESSION['logged_in'] == true) print 'true';
      else print 'false';
   }

   function log_out()
   {
      $_SESSION['logged_in'] = false;
      unset($_SESSION['user']);
   }
}
