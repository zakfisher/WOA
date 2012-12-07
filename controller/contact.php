<?php
class Contact extends WOA {

   function __construct() {
      parent::__construct();
      require_once('model/contact.php');
   }

   public function submit_form()
   {
      if ($_POST)
      {
         $contact = new Contact_Model();
         $contact->send_visitor_email($_POST);
      }
   }

}