<?php
class Music_Model extends WOA {

   function __construct() {
      parent::__construct();
   }

   function get_all_tracks($filter)
   {
      $db = new DB();
      $results = array_reverse($db->select_from(array($filter), 'music'));
      JSON::print_json($results);
   }
}