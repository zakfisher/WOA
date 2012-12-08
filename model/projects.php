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
               'description' => 'Now, without further ado, Get Ready India! April 2014 our vision of promoting “Above the influence” centered principles of living a truly P.L.U.R (Peace, Love, Unity, Respect) lifestyle along with the love for Electronic Dance Music will manifest! NAME OF EVENT will set a Benchmark for events to follow. The Festival will further propel our stance that electronic shows are much more than they appear to third persons. The venue hosting this years Gala event will be a safe haven to those who remain open minded, where those who attend can learn and experience two incredible cultures, different in so many ways, yet able to coexist so beautifully. Thus, it is our goal to ultimately found a completely new culture encompassing the new with the old.',
               'content' => 'content'
            );

             $project['biz_plan'] = array(
                 array(
                     'section' => 'administrative',
                     'articles' => array(
                         array(
                             'article' => 'Article 1',
                             'body' => 'text goes here'
                         ),
                         array(
                             'section' => 'administrative',
                             'article' => 'Article 2',
                             'body' => 'text goes here'
                         ),
                         array(
                             'section' => 'administrative',
                             'article' => 'Article 3',
                             'body' => 'text goes here'
                         )
                     )
                 ),
                 array(
                     'section' => 'marketing',
                     'articles' => array(
                         array(
                             'article' => 'Article 1',
                             'body' => 'text goes here'
                         ),
                         array(
                             'section' => 'administrative',
                             'article' => 'Article 2',
                             'body' => 'text goes here'
                         ),
                         array(
                             'section' => 'administrative',
                             'article' => 'Article 3',
                             'body' => 'text goes here'
                         )
                     )
                 ),
                 array(
                     'section' => 'production',
                     'articles' => array(
                         array(
                             'article' => 'Article 1',
                             'body' => 'text goes here'
                         ),
                         array(
                             'section' => 'administrative',
                             'article' => 'Article 2',
                             'body' => 'text goes here'
                         ),
                         array(
                             'section' => 'administrative',
                             'article' => 'Article 3',
                             'body' => 'text goes here'
                         )
                     )
                 ),
             );

             $project['contracts'] = array(
                 array(
                     'template' => 'projects-contracts',
                     'contract_name' => 'Non-disclosure Agreement',
                     'user_id' => 6,
                     'username' => 'investor',
                     'email' => 'email@fake.com',
                     'content' => array(),
                     'signature' => true
                 ),
                 array(
                     'template' => 'projects-contracts',
                     'contract_name' => 'Another Contract',
                     'user_id' => 6,
                     'username' => 'vendor',
                     'email' => 'email@fake.com',
                     'content' => array(),
                     'signature' => array()
                 ),
                 array(
                     'template' => 'projects-contracts',
                     'contract_name' => 'Non-disclosure Agreement',
                     'user_id' => 6,
                     'username' => 'bob',
                     'email' => 'email@fake.com',
                     'content' => array(),
                     'signature' => array()
                 ),
                 array(
                     'template' => 'projects-contracts',
                     'contract_name' => 'Another Contract',
                     'user_id' => 6,
                     'username' => 'jimmy jim',
                     'email' => 'email@fake.com',
                     'content' => array(),
                     'signature' => array()
                 ),
                 array(
                     'template' => 'projects-contracts',
                     'contract_name' => 'Another Contract',
                     'user_id' => 6,
                     'username' => 'vendor',
                     'email' => 'email@fake.com',
                     'content' => array(),
                     'signature' => array()
                 ),
                 array(
                     'template' => 'projects-contracts',
                     'contract_name' => 'Non-disclosure Agreement',
                     'user_id' => 6,
                     'username' => 'bob',
                     'email' => 'email@fake.com',
                     'content' => array(),
                     'signature' => array()
                 ),
                 array(
                     'template' => 'projects-contracts',
                     'contract_name' => 'Another Contract',
                     'user_id' => 6,
                     'username' => 'jimmy jim',
                     'email' => 'email@fake.com',
                     'content' => array(),
                     'signature' => array()
                 )
             );

            // Business Plan
            if ($access != 'admin' and $access != 'high') unset($project['biz_plan']);

            switch ($access) {
               case 'admin':
                  $project['sub_nav'][] = array('sub_page' => 'overview',  'title' => 'Overview');
                  $project['sub_nav'][] = array('sub_page' => 'contracts', 'title' => 'Contracts');
                  $project['sub_nav'][] = array('sub_page' => 'biz_plan',  'title' => 'Business Plan');
                  break;
               case 'high':
                  $project['sub_nav'][] = array('sub_page' => 'overview',  'title' => 'Overview');
                  $project['sub_nav'][] = array('sub_page' => 'contracts', 'title' => 'Contracts');
                  $project['sub_nav'][] = array('sub_page' => 'biz_plan',  'title' => 'Business Plan');
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