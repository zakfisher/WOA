<?php
class Admin extends WOA {

   function __construct() {
      parent::__construct();
      require_once('model/admin.php');
   }

   public function get_stats()
   {
      if ($this->login_check('return') == 'true' && $_SESSION['user']['access'] == 'admin')
      {
         $admin = new Admin_Model();
         $admin->get_stats_data();
      }
   }

   public function add_user()
   {
      if ($this->login_check('return') == 'true' && $_SESSION['user']['access'] == 'admin' && $_POST)
      {
         $admin = new Admin_Model();
         $admin->create_user($_POST);
      }
   }

}
