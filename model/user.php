<?php
class User_Model extends WOA {

   function __construct() {
      parent::__construct();
   }

   function authenticate_user($assoc_arr)
   {
      // Sanitize User Input
      $text = new Text();
      foreach ($assoc_arr as $key => $value) $assoc_arr[$key] = $text->sanitize_string($value);

      // Convert Keys to Variables (ex. $_POST['name'] -> $name)
      extract($assoc_arr);

      // Fetch User from DB
      $db = new DB();
      $results = $db->select_from_where_and(array('*'), 'users', 'username', $un, 'password', $pw);

      // Match Found
      if (count($results) > 0) {

         $user = $results[0];
         $user['sub_page'] = 'updates';

         // Set session vars
         $this->set_user_session($user);
         JSON::print_json(array('response' => 'true', 'user' => $_SESSION['user']));
      }

      // Match NOT Found
      else
      {
         $_SESSION['logged_in'] = false;
         JSON::print_json(array('response' => 'false'));
      }
   }

   function restore_user_session($user, $obj = null)
   {
      $this->set_user_session($user, $obj);
      if ($obj == null) JSON::print_json(array('response' => 'true', 'user' => $_SESSION['user']));
   }

   private function set_user_session($user, $obj = null)
   {
      $_SESSION['logged_in'] = true;
      $_SESSION['user']['user_id']    = ($obj == null) ? $user['user_id']    : $user->user_id;
      $_SESSION['user']['username']   = ($obj == null) ? $user['username']   : $user->username;
      $_SESSION['user']['first_name'] = ($obj == null) ? $user['first_name'] : $user->first_name;
      $_SESSION['user']['last_name']  = ($obj == null) ? $user['last_name']  : $user->last_name;
      $_SESSION['user']['email']      = ($obj == null) ? $user['email']      : $user->email;
      $_SESSION['user']['access']     = ($obj == null) ? $user['access']     : $user->access;
   }

   function update_user($assoc_arr)
   {
      // Sanitize User Input
      $text = new Text();
      foreach ($assoc_arr as $key => $value) $assoc_arr[$key] = $text->sanitize_string($value);

      $db = new DB();

      // Check for existing username
      if (isset($assoc_arr['username'])) {
         $results = $db->select_from_where(array('*'), 'users', 'username', $assoc_arr['username']);

         // Match Found
         if (count($results) > 0) {
            JSON::print_json(array('error' => 'Username is taken.'));
            exit;
         }
      }

      // Check for existing email
      if (isset($assoc_arr['email'])) {
         $results = $db->select_from_where(array('*'), 'users', 'email', $assoc_arr['email']);

         // Match Found
         if (count($results) > 0) {
            JSON::print_json(array('error' => 'Email is taken.'));
            exit;
         }
      }

      // Update into DB
      $db->update_where('users', $assoc_arr, 'user_id', $_SESSION['user']['user_id']);

      // Update Session
      foreach ($assoc_arr as $key => $value) $_SESSION['user'][$key] = $assoc_arr[$key];
      JSON::print_json(array('response' => 'true', 'user' => $_SESSION['user'], 'sub_page' => $_SESSION['sub_page']));
   }

   function reset_password($assoc_arr)
   {
      $text = new Text();
      $db = new DB();
      $email = new Email();

      // Sanitize User Input
      $assoc_arr['email'] = $text->sanitize_string($assoc_arr['email']);

      // Find Existing User
      $results = $db->select_from_where(array('*'), 'users', 'email', $assoc_arr['email']);

      // Match Found
      if (count($results) > 0) {
         $user = $results[0];

         // Change User PW
         $new_pw = $text->random_string();
         $db->update_where('users', array('password' => $new_pw), 'user_id', $user['user_id']);

         // Send Email
         $msg = 'Your password has been reset.<br/><br/>Username: ' . $user['username'] . '<br/><br/>Password: ' . $new_pw;
         $email->send($user['email'], 'World Of Anarchy', 'Password Reset', $msg);
      }

      // Match Not Found
      else JSON::print_json(array('error' => 'Account not found.'));
   }

   function get_updates_data($project_id)
   {
      $db = new DB();
      $text = new Text();
      $updates = array();

      // Return ALL Updates (all projects for this user)
      if ($project_id === null)
      {
         $all_posts = $db->select_from(array('*'), 'posts');
         foreach ($all_posts as $post)
         {
            // Find associated project, then check if user has access
            $access = $db->select_from_where_and(array('access'), 'project_users', 'user_id', $_SESSION['user']['user_id'], 'proj_id', $post['project_id']);

            // No Access = Remove from List
            if (count($access) != 0) $posts[] = $post;
         }
      }

      // Return Updates for this Project (if user has access)
      else $posts = $db->select_from_where(array('*'), 'posts', 'project_id', $project_id);

      // Set Post Values (add comments and links)
      foreach ($posts as $post)
      {
         // Post Values
         $project = $db->select_from_where(array('project'), 'projects', 'id', $post['project_id']);
         $author = $db->select_from_where(array('username'), 'users', 'user_id', $post['user_id']);
         $post['time'] = $text->format_post_date($post['time']);
         $post['template'] = 'updates-list-items';
         $post['project'] = $project[0]['project'];
         $post['author'] = $author[0]['username'];
         $post['content']['message'] = $post['message'];

         //if ($post['links'] !== null) $post['content'][] = $post['links'];

         unset($post['project_id']);
         unset($post['user_id']);
         unset($post['message']);

         // Links
         $links = $db->select_from_where(array('*'), 'post_links', 'post_id', $post['id']);
         foreach ($links as $link)
         {
            unset($link['id']);
            unset($link['post_id']);

            $post['content']['links'][] = $link;
         }

         // Comments
         $comments = $db->select_from_where(array('*'), 'comments', 'post_id', $post['id']);
         foreach ($comments as $comment)
         {
            $comment_author = $db->select_from_where(array('username'), 'users', 'user_id', $comment['user_id']);
            $comment['author'] = $comment_author[0]['username'];
            $comment['time'] = $text->format_post_date($comment['time']);

            unset($comment['post_id']);
            unset($comment['user_id']);
            unset($comment['id']);

            $post['content']['comments'][] = $comment;
         }

         $updates[] = $post;
      }

      JSON::print_json($updates);
   }

   function get_user_projects()
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
}