<?php
class Admin_Model extends WOA {

   function __construct() {
      parent::__construct();
   }

   public function get_stats_data()
   {
      $db = new DB();

      // User Count
      $user_count = $db->select_from(array('count(*)'), 'users');
      $user_count = $user_count[0]['count(*)'];

      // Contract Count
      $contract_count = $db->select_from(array('count(*)'), 'users');
      $contract_count = $contract_count[0]['count(*)'];

      // Project Count
      $project_count = $db->select_from(array('count(*)'), 'projects');
      $project_count = $project_count[0]['count(*)'];

      JSON::print_json(array('user_count' => $user_count, 'contract_count' => $contract_count, 'project_count' => $project_count));
   }

   public function create_user($assoc_array)
   {
      $db = new DB();

   }
}