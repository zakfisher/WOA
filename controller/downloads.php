<?php
class Downloads {
   function __construct() { session_start(); }

   function test($str)
   {
      print 'oops i shit myself, ' . $str;
   }
}
