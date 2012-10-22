<?php
class Text {
   function __construct() { }

   function sanitize_string($str) {
      return strip_tags(htmlentities(stripslashes($str)));
   }

   function random_string($length = 10) {
      $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      $randomString = '';
      for ($i = 0; $i < $length; $i++) {
         $randomString .= $characters[rand(0, strlen($characters) - 1)];
      }
      return $randomString;
   }
}