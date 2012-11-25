<?php
class Emails extends WOA {

   function __construct() {
      parent::__construct();
      require_once('model/emails.php');
   }

   public function get_emails()
   {
      if ($this->login_check('return') == 'true' && $_SESSION['user']['access'] == 'admin')
      {
         $emails_model = new Emails_Model();
         $emails_model->get_all_emails();
      }
   }

}
