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

   public function get_mix_of_the_day()
   {
      $db = new DB();
      $results = $db->select_from_where(array('*'), 'music', 'mix_of_the_day', date('n.j.Y'));
      JSON::print_json($results[0]);
   }
}