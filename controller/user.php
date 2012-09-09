<?php
class User extends User_Model {
   function __construct() { session_start(); }

   function submit_login_form()
   {
      if ($_POST) { $this->authenticate_user($_POST); }
   }

   function restore_user_data()
   {
      if ($_POST) { $this->restore_user_session($_POST); }
   }

   function test_login($un,$pw)
   {
      $this->authenticate_user(array('un'=>$un,'pw'=>$pw));
   }
}
