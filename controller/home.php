<?php
class Home {
   function __construct() { session_start(); }

   function test($str)
   {
      print 'test ' . $str;
   }
}