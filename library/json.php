<?php
class JSON {
   function __construct() { }

   function print_json($data) {
      header('Content-type: application/json');
      print json_encode($data);
   }
}