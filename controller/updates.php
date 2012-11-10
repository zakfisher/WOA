<?php
class Updates extends WOA {

   function __construct() {
      parent::__construct();
      require_once('model/updates.php');
   }

   public function get_updates($project_id = null)
   {
      if ($this->login_check('return') == 'true')
      {
         $updates_model = new Updates_Model();
         $updates_model->get_updates_data($project_id);
      }
   }

   public function submit_post_update() {
      if ($this->login_check('return') == 'true')
      {
         if ($_POST)
         {
            $updates_model = new Updates_Model();
            $updates_model->update_post($_POST);
         }
      }
   }

   public function submit_new_post() {
      if ($this->login_check('return') == 'true')
      {
         if ($_POST)
         {
            $updates_model = new Updates_Model();
            $updates_model->add_post($_POST);
         }
      }
   }
}
