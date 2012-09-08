<?php
class Login {
   function __construct() { }

   function go()
   {
      list($username, $domain) = explode('@', $_POST['email']);
      global $db;
      $query = "SELECT email_domains, subdomain FROM company WHERE status = 'active' AND email_domains LIKE '%" . mysql_escape_string($domain) . "%';";
      $result_set = mysqli_query($db, $query) or die ('query failed ' . mysqli_error($db));
      while ($row = mysqli_fetch_assoc($result_set))
      {
         $url = 'https://' . $row['subdomain'] . '.upmo.com/';
      }

      $ch = curl_init($url . 'user/login/www');
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
      curl_setopt($ch, CURLOPT_POST, TRUE);
      curl_setopt($ch, CURLOPT_HEADER, FALSE);
      curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
      curl_setopt($ch, CURLOPT_POSTFIELDS, 'email=' . urlencode($_POST['email']) . '&password=' . urlencode($_POST['password']) . '&shared_secret=upmoIsHot456');
      $user_id = json_decode(curl_exec($ch));

      if (is_numeric($user_id))
      {
         print $url . '/user/timewarp/' . base64_encode($user_id);
      }
      else
      {
         print 'false';
      }
   }
}
