<?php
class Navigation {

   function __construct() { session_start(); }

   public function update_session_page()
   {
      if ($_POST)
      {
         $_SESSION['page'] = $_POST['page'];
         if (isset($_POST['sub_page'])) $_SESSION['sub_page'] = $_POST['sub_page'];
      }
   }

}