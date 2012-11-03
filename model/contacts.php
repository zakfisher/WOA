<?php
class Contacts_Model extends WOA {

   function __construct() {
      parent::__construct();
   }

   function get_contacts_data()
   {
      $db = new DB();
      $contacts = array();

      $all_contacts = $db->select_from(array('*'), 'contacts');
      foreach ($all_contacts as $contact)
      {
         $contact['template'] = 'contacts-list-items';
         $type = $db->select_from_where(array('name'), 'contact_types', 'id', $contact['type_id']);
         $contact['type'] = $type[0]['name'];
         unset($contact['type_id']);

         $contacts[] = $contact;
      }
      JSON::print_json($contacts);
   }
}