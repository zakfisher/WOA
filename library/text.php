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

   function format_post_date($timestamp)
   {
      $year = substr($timestamp, 2, 2);
      $month = substr($timestamp, 5, 2);
      if (substr($month, 0, 1) == 0) $month = substr($month, 1, 1);
      $day = substr($timestamp, 8, 2);
      if (substr($day, 0, 1) == 0) $day = substr($day, 1, 1);
      $timestamp = $month . '.' . $day . '.' . $year;

      return $timestamp;
   }
}