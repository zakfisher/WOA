<?php
class Projects extends WOA {

   function __construct() {
      parent::__construct();
      require_once('model/projects.php');
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
