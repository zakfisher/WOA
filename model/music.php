<?php
class Music_Model extends WOA {

   function __construct() {
      parent::__construct();
   }

   public function get_all_tracks($filter)
   {
      $db = new DB();
      $results = array_reverse($db->select_from(array($filter), 'music'));
      JSON::print_json($results);
   }

   public function get_latest_mix()
   {
      $db = new DB();
      $results = $db->get_last_row('music', 'id');
      JSON::print_json($results[0]);
   }
}