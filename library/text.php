<?php
class Text {
   function __construct() { }

   function sanitize_string($str) {
      return strip_tags(htmlentities(stripslashes($str)));
   }
}