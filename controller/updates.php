<?php
class Updates extends WOA {

   function __construct() {
      parent::__construct();
      require_once('model/updates.php');
   }

   function login_check($return_type = 'print')
   {
      $login_status = ($_SESSION['logged_in'] == true AND isset($_COOKIE['user'])) ? 'true' : 'false';
      if ($return_type == 'print') print $login_status;
      else return $login_status;
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
