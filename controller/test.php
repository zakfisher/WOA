<?php
class Test extends WOA {

    function __construct() {
        parent::__construct();
    }

   function test($string = null) {
      if ($string != null)
      {
         $arr = array ('a'=>1,'b'=>2,'c'=>3,'d'=>4,'e'=>5);

         $response['array'] = $arr;
         $response['post'] = $_POST;
         $response['string'] = Text::sanitize_string($string);

         //debug_print_backtrace();
         JSON::print_json($response);
      }
   }

   function another_test($test, $a)
   {
      print $test . "<br/><br/>" . $a;
   }
}