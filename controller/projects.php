<?php
class Projects extends WOA {

   function __construct() {
      parent::__construct();
      require_once('model/projects.php');
   }

   function login_check($return_type = 'print')
   {
      $login_status = ($_SESSION['logged_in'] == true AND isset($_COOKIE['user'])) ? 'true' : 'false';
      if ($return_type == 'print') print $login_status;
      else return $login_status;
   }

   function get_projects()
   {
      if ($this->login_check('return') == 'true')
      {
         $projects_model = new Projects_Model();
         $projects_model->get_user_projects();
      }
   }

}
