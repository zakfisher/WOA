<?php
class Contacts extends WOA {

   function __construct() {
      parent::__construct();
      require_once('model/contacts.php');
   }

   function get_contacts()
   {
      if ($this->login_check('return') == 'true')
      {
         $contacts_model = new Contacts_Model();
         $contacts_model->get_contacts_data();
      }
   }

}
