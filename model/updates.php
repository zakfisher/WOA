<?php
class Updates_Model extends WOA {

   function __construct() {
      parent::__construct();
   }

   public function get_updates_data($project_id)
   {
      $db = new DB();
      $text = new Text();
      $updates = array();

      // Return ALL Updates (all projects for this user)
      if ($project_id === null)
      {
         $all_posts = $db->select_from_order_by(array('*'), 'posts', 'time');
         foreach ($all_posts as $post)
         {
            // Find associated project, then check if user has access
            $access = $db->select_from_where_and(array('access'), 'project_users', 'user_id', $_SESSION['user']['user_id'], 'proj_id', $post['project_id']);

            // No Access = Remove from List
            if (count($access) != 0) $posts[] = $post;
         }
      }

      // Return Updates for this Project (if user has access)
      else $posts = $db->select_from_where_order_by(array('*'), 'posts', 'project_id', $project_id, 'time');

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

         unset($post['user_id']);
         unset($post['message']);

         // Links
         $links = $db->select_from_where(array('*'), 'post_links', 'post_id', $post['id']);
         foreach ($links as $link) $post['content']['links'][] = $link;

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

      JSON::print_json(array_reverse($updates));
   }

   public function update_post($data)
   {
      $id = $data['id'];
      $db = new DB();

      // Security Check
      if ($data['author'] == $_SESSION['user']['username'])
      {
         // Update posts
         $post_data = array(
            'title' => $data['title'],
            'message' => $data['content']['message']
         );
         $db->update_where('posts', $post_data, 'id', $id);

         // Update post_links
         $db->delete_from_where('post_links', 'post_id', $id);
         $links = $data['content']['links'];
         foreach ($links as $link)
         {
            $link_data = array (
               'post_id' => $id,
               'title' => $link['title'],
               'url' => $link['url']
            );
            $db->insert_into('post_links', $link_data);
         }
      }
   }

   public function add_post($data)
   {
      $db = new DB();
      $text = new Text();

      // Security Check
      if ($data['author'] == $_SESSION['user']['username'])
      {
         // Update posts
         $post_data = array(
            'user_id' => $_SESSION['user']['user_id'],
            'title' => $data['title'],
            'message' => $data['content']['message'],
            'project_id' => $data['project_id']
         );
         $db->insert_into('posts', $post_data);

         // Fetch New Post
         $new_entry = $db->select_from_where_and(array('*'), 'posts', 'user_id', $_SESSION['user']['user_id'], 'title', $data['title']);
         $post = $new_entry[0];

         // Update post_links
         $links = $data['content']['links'];
         foreach ($links as $link)
         {
            $link_data = array (
               'post_id' => $post['id'],
               'title' => $link['title'],
               'url' => $link['url']
            );
            $db->insert_into('post_links', $link_data);
         }

         // Prep Return Post Object
         $project = $db->select_from_where(array('project'), 'projects', 'id', $post['project_id']);
         $author = $db->select_from_where(array('username'), 'users', 'user_id', $post['user_id']);
         $post['time'] = $text->format_post_date($post['time']);
         $post['template'] = 'updates-list-items';
         $post['project'] = $project[0]['project'];
         $post['author'] = $author[0]['username'];
         $post['content']['message'] = $post['message'];

         unset($post['user_id']);
         unset($post['message']);

         // Links
         $links = $db->select_from_where(array('*'), 'post_links', 'post_id', $post['id']);
         foreach ($links as $link) $post['content']['links'][] = $link;

         JSON::print_json($post);
      }
   }

   public function delete_post($post_id)
   {
      $db = new DB();
      $db->delete_from_where('posts', 'id', $post_id);
      $db->delete_from_where('post_links', 'post_id', $post_id);
      $db->delete_from_where('comments', 'post_id', $post_id);
   }
}