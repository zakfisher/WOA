<?php
class Music extends WOA {
   function __construct() { session_start(); }

   function test($str)
   {
      print $str;
   }
}
