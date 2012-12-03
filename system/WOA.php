<?php
class WOA {

   function __construct() {
      session_start();
      require_once('config/connect.php');
      require_once('utilities/all.php');
   }

   public function login_check($return_type = 'print')
   {
      $login_status = ($_SESSION['logged_in'] == true AND isset($_COOKIE['user_key'])) ? 'true' : 'false';
      if ($return_type == 'print') print $login_status;
      else return $login_status;
   }

}