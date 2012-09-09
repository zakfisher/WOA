<?php
class Login extends User_Model {
   function __construct() { session_start(); }

   function submit_login_form()
   {
      if ($_POST) { $this->authenticate_user($_POST); }
   }
}
