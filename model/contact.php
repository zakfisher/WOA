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

      $msg =
         "<p>Sender: "  . $assoc_array['name'] . "</p>
          <p>Email: "   . $assoc_array['email'] . "</p>
          <p>Subject: " . $assoc_array['subject'] . "</p>
          <p>Message: " . $assoc_array['message'] . "</p>
      ";

      // Send Email
      $email->send('info@worldofanarchy.com', 'World of Anarchy', 'Visitor Email', $msg);
   }
}