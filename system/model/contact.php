<?php
class Contact_Model {

    function __construct() {}

    public function send_visitor_email($assoc_array)
    {
        $db = new DB();

        // Sanitize Data & Store in DB
        foreach($assoc_array as $value) Text::sanitize_string($value);
        $db->insert_into('visitor_emails', $assoc_array);

        $msg =
         "<p><b>Name:</b><br/> "    . $assoc_array['name'] . "</p>
          <p><b>Email:</b><br/> "   . $assoc_array['email'] . "</p>
          <p><b>Phone:</b><br/> "   . $assoc_array['phone'] . "</p>
          <p><b>Subject:</b><br/> " . $assoc_array['subject'] . "</p>
          <p><b>Message:</b><br/> " . $assoc_array['message'] . "</p>
        ";

        $text_msg =
         "Name: "    . $assoc_array['name'] . "
          Email: "   . $assoc_array['email'] . "
          Phone: "   . $assoc_array['phone'] . "
          Subject: " . $assoc_array['subject'] . "
          Message: " . $assoc_array['message'] . "
        ";

        // Send Email
        if (ENV == 'development') Email::send('zfisher@zfidesign.com', 'Scrap & Haul', 'Visitor Email', $msg);
        else {
            Email::send('6507711975@mymetropcs.com', 'Scrap & Haul', 'Visitor Email', $text_msg);
            Email::send('scrapandhaul@scrapandhaul.com', 'Scrap & Haul', 'Visitor Email', $msg);
        }
        return array('response' => 'Your message has been sent!');
    }
}