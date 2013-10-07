<?php
class MusicModel {

   function __construct() {}

   public function get_all_tracks($filter) {
      $db = new DB();
      $results = array_reverse($db->select_from(array($filter), 'music'));
      return $results;
   }

    public function getTrackById($musicId) {
        $db = new DB();
        $results = $db->select_from_where(array('*'), 'music', 'music_id', $musicId);
        return $results;
    }

}