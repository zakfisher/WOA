<?php
class Dashboard extends WOA {

   function __construct() {
      parent::_construct();
      if ($_SESSION['logged_in'] != TRUE) header('Location: ' . BASE_URL);
   }

}
