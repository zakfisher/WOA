<?php
class Projects_Model extends WOA {

   function __construct() {
      parent::__construct();
   }

   public function get_user_projects()
   {
      $db = new DB();
      $all_projects = array();

      $projects = $db->select_from(array('*'), 'projects');
      foreach ($projects as $project)
      {
         // Return Project ONLY if User has Access
         $access = $db->select_from_where_and(array('access'), 'project_users', 'user_id', $_SESSION['user']['user_id'], 'proj_id', $project['id']);
         if (count($access) != 0)
         {
            $access = $access[0]['access'];

            $project['template'] = 'projects-list-items';
            $user_count = $db->select_from_where(array('count(*)'), 'project_users', 'proj_id', $project['id']);
            $project['user_count'] = $user_count[0]['count(*)'];
            $project['sub_nav'] = array();

            switch ($access) {
               case 'admin':
                  $project['sub_nav'][] = array('sub_page' => 'overview', 'title' => 'Overview');
                  $project['sub_nav'][] = array('sub_page' => 'updates',  'title' => 'Updates');
                  $project['sub_nav'][] = array('sub_page' => 'biz_plan', 'title' => 'Business Plan');
                  $project['sub_nav'][] = array('sub_page' => 'partners', 'title' => 'Partners');
                  $project['partners'] = array();
                  break;
               case 'high':
                  $project['sub_nav'][] = array('sub_page' => 'overview',  'title' => 'Overview');
                  $project['sub_nav'][] = array('sub_page' => 'updates',   'title' => 'Updates');
                  $project['sub_nav'][] = array('sub_page' => 'biz_plan',  'title' => 'Business Plan');
                  $project['sub_nav'][] = array('sub_page' => 'contracts', 'title' => 'Contracts');
                  $project['contracts'] = array();
                  break;
               case 'low':
                  $project['sub_nav'][] = array('sub_page' => 'overview',  'title' => 'Overview');
                  $project['sub_nav'][] = array('sub_page' => 'updates',   'title' => 'Updates');
                  $project['sub_nav'][] = array('sub_page' => 'contracts', 'title' => 'Contracts');
                  $project['contracts'] = array();
                  break;
               default:
            }

            $all_projects[] = $project;
         }
      }

      JSON::print_json($all_projects);
   }

   public function get_user_project_names()
   {
      $db = new DB();
      $project_names = array();

      $results = $db->select_from_where(array('*'), 'project_users', 'user_id', $_SESSION['user']['user_id']);
      foreach ($results as $row)
      {
         $p_name = $db->select_from_where(array('project'), 'projects', 'id', $row['proj_id']);
         $project_names[] = array('project' => $p_name[0]['project'], 'id' => $row['proj_id']);
      }

      JSON::print_json($project_names);
   }

}