<?php
class Navigation {

   function __construct() { session_start(); }

   function update_session_page()
   {
      if ($_POST) $_SESSION['page'] = $_POST['page'];
   }

}