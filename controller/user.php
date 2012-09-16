<?php
class User extends User_Model {
   function __construct() { session_start(); }

   function login_check()
   {
      if ($_SESSION['logged_in'] == TRUE) return true;
      else return false;
   }

   function submit_login_form()
   {
      if ($_POST) { $this->authenticate_user($_POST); }
   }

   function refresh_user()
   {
      if ($_POST) { $this->refresh_user_session($_POST); }
   }

   function log_out()
   {
      $_SESSION['logged_in'] = false;
      unset($_SESSION['user']);
   }
}
