<?php
class User extends User_Model {
   function __construct() { session_start(); }

   function submit_login_form()
   {
      if ($_POST) { $this->authenticate_user($_POST); }
   }

   function refresh_user_session()
   {
      if ($_POST) { $this->restore_user_session($_POST); }
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
