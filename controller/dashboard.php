<?php
class Dashboard extends User_Model {
   function __construct() {
      session_start();
      if (! isset($_SESSION['logged_in']) OR $_SESSION['logged_in'] != TRUE) header('Location: ' . BASE_URL);
   }

}
