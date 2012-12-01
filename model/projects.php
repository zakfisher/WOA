<?php
class Projects_Model extends WOA {

   function __construct() { parent::__construct(); }

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

            // Fetch from DB
            $project['overview'] = array(
                'description' => 'This project is really nice.  I like it for many reasons, but I\'ll tell you those later ... :P',
                'content' => 'content'
            );

            switch ($access) {
               case 'admin':
                  $project['sub_nav'][] = array('sub_page' => 'overview', 'title' => 'Overview');
                  $project['sub_nav'][] = array('sub_page' => 'partners', 'title' => 'Partners');
                  $project['sub_nav'][] = array('sub_page' => 'biz_plan', 'title' => 'Business Plan');

                  // Fetch from DB
                  $project['partners'] = array(
                      'Investor' => array(
                          array('Non-disclosure Agreement', 'content', 'signature'),
                          array('Another Contract', 'content', 'signature')
                      ),
                      'Vendor' =>  array(
                          array('Non-disclosure Agreement', 'content', 'signature'),
                          array('Another Contract', 'content', 'signature')
                      )
                  );
                  $project['biz_plan'] = array(
                      'administrative' => array(
                          array('Section 1', 'body'),
                          array('Section 2', 'body'),
                          array('Section 3', 'body')
                      ),
                      'marketing' => array(
                          array('Section 1', 'body'),
                          array('Section 2', 'body'),
                          array('Section 3', 'body')
                      ),
                      'production' => array(
                          array('Section 1', 'body'),
                          array('Section 2', 'body'),
                          array('Section 3', 'body')
                      )
                  );

                  break;
               case 'high':
                  $project['sub_nav'][] = array('sub_page' => 'overview',  'title' => 'Overview');
                  $project['sub_nav'][] = array('sub_page' => 'contracts', 'title' => 'Contracts');
                  $project['sub_nav'][] = array('sub_page' => 'biz_plan',  'title' => 'Business Plan');
                  $project['contracts'] = array(
                      array('Non-disclosure Agreement', 'signature'),
                      array('Another Contract', 'signature')
                  );
                  break;
               case 'low':
                  $project['sub_nav'][] = array('sub_page' => 'overview',  'title' => 'Overview');
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