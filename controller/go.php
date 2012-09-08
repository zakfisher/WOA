<?php
class Go {
   function __construct() { session_start(); }

   function index()
   {
      $_SESSION['page'] = 'home';
      $_SESSION['go'] = true;
      header(BASE_URL);
   }
}