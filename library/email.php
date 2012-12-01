<?php
class Email extends WOA {

   function __construct() {parent::__construct(); }

   public function send($to, $from, $subject, $msg) {
      $headers  = 'MIME-Version: 1.0' . "\r\n";
      $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
      $headers .= 'From: ' . $from . ' <noreply@woa.com>' . "\r\n";

      mail($to, $subject, $msg, $headers) or print 'fail';
   }

}