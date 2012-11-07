<?php
class Emails_Model extends WOA {

   function __construct() {
      parent::__construct();
   }

   function get_all_emails()
   {
      $db = new DB();
      $emails = array();

      $all_emails = $db->select_from(array('*'), 'emails');
      foreach ($all_emails as $email)
      {

      }

      JSON::print_json($emails);
   }
}