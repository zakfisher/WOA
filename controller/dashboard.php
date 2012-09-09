<?php
class Dashboard extends User_Model {
   function __construct() {
      session_start();
      if ($_SESSION['logged_in'] != TRUE) header('Location: ' . BASE_URL);
   }

}
