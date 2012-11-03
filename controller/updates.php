<?php
class Updates extends WOA {

   function __construct() {
      parent::__construct();
      require_once('model/updates.php');
   }

   function get_updates($project_id = null)
   {
      if ($this->login_check('return') == 'true')
      {
         $updates_model = new Updates_Model();
         $updates_model->get_updates_data($project_id);
      }
   }

}
