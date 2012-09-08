<?php
class Signup {
   function __construct() { }

   function go()
   {
      list($username, $domain) = explode('@', $_POST['email']);

      // Users providing personal email... oops
      if (in_array($domain, array('hotmail.com', 'gmail.com', 'msn.com', 'yahoo.com')))
      {
         print 'Please provide your WORK email. :-)';
         return;
      }

      global $db;
      $query = "SELECT email_domains, subdomain FROM company WHERE status = 'active' AND email_domains LIKE '%" . mysql_escape_string($domain) . "%';";
      $result_set = mysqli_query($db, $query) or die ('query failed ' . mysqli_error($db));
      $url = '';
      while ($row = mysqli_fetch_assoc($result_set))
      {
         $url = 'https://' . $row['subdomain'] . '.upmo.com/';
      }

      // Email does not match any company we have so far
      if ($url == '')
      {
         $query = "SELECT * FROM lead WHERE email = '" . mysql_escape_string($_POST['email']) . "';";
         $result_set = mysqli_query($db, $query) or die("Error at resultset" . mysqli_error($db));
         while ($row = mysqli_fetch_assoc($result_set))
         {
            $rows[] = $row;
         }

         // First entry
         if (count($rows) == 0)
         {
            $query = 'INSERT INTO lead (first_name, last_name, email, role, password, domain) VALUES (\'' . mysql_escape_string($_POST['first_name']) . '\', \'' . mysql_escape_string($_POST['last_name']) . '\', \'' . mysql_escape_string($_POST['email']) . '\', \'' . mysql_escape_string($_POST['title']) . '\', \'' . mysql_escape_string(sha1($_POST['password'])) . '\', \'' . mysql_escape_string($domain) . '\');';
            mysqli_query($db, $query) or die("Error at resultset" . mysqli_error($db));
            print 'Thank You! We\'ll let you know as soon as your account is ready.';
         }

         // Duplicate entry
         else
         {
            print 'This email is already registered.';
         }
         return;
      }

      // OK here we go then.... let's register
      $ch = curl_init($url . 'user/register');
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
      curl_setopt($ch, CURLOPT_POST, TRUE);
      curl_setopt($ch, CURLOPT_HEADER, FALSE);
      curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
      curl_setopt($ch, CURLOPT_POSTFIELDS, 'email=' . urlencode($_POST['email']) . '&first_name=' . urlencode($_POST['first_name']) . '&last_name=' . urlencode($_POST['last_name']) . '&title=' . urlencode($_POST['title']) . '&iagree=true&pass=' . urlencode($_POST['password']) . '&pass_confirm=' . urlencode($_POST['password']) . '&shared_secret=upmoIsHot456');
      $response = json_decode(curl_exec($ch));

      if (! isset($response->messages->error))
      {
         print 'true';
      }
      else
      {
         print $response->messages->error[0];
      }
   }
}
