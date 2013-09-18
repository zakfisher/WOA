<?php
class MusicModel {

   function __construct() {}

   public function get_all_tracks($filter) {
      $db = new DB();
      $results = array_reverse($db->select_from(array($filter), 'music'));
      return $results;
   }

}