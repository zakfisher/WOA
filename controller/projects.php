<?php
class Projects extends WOA {

   function __construct() {
      parent::__construct();
      require_once('model/projects.php');
   }

   public function get_projects()
   {
      if ($this->login_check('return') == 'true')
      {
         $projects_model = new Projects_Model();
         $projects_model->get_user_projects();
      }
   }

   public function get_project_names()
   {
      if ($this->login_check('return') == 'true')
      {
         $projects_model = new Projects_Model();
         $projects_model->get_user_project_names();
      }
   }

}
