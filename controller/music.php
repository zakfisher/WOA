<?php
class Music extends WOA {

   function __construct() {
      parent::__construct();
      require_once('model/music.php');
   }

   public function all_tracks($filter='*')
   {
      $music_model = new Music_Model();
      $music_model->get_all_tracks($filter);
   }

   public function latest_mix()
   {
      $music_model = new Music_Model();
      $music_model->get_latest_mix();
   }
}
