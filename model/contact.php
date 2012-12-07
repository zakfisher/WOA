<?php
class Contact_Model extends WOA {

   function __construct() {
      parent::__construct();
   }

   public function send_visitor_email($assoc_array)
   {
      $db = new DB();
      $text = new Text();
      $email = new Email();

      // Sanitize Data & Store in DB
      foreach($assoc_array as $value) $text->sanitize_string($value);
      $db->insert_into('emails', $assoc_array);

      // Send Email
      $email->send('info@worldofanarchy.com', 'WOA Visitor: ' . $assoc_array['name'], $assoc_array['subject'], $assoc_array['message']);
   }
}