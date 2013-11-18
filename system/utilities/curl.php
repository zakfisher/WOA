<?php
class Curl {

    function __construct() {}

    function runCURL($url,$type='json',$post=array()) {
        $curl = curl_init();
        curl_setopt ($curl, CURLOPT_URL, $url);
        curl_setopt ($curl, CURLOPT_RETURNTRANSFER, 1);
        if (!empty($post)) {
            $post_arr=array();
            foreach($post as $key=>$value) { $post_arr[]= $key.'='.$value; }

            curl_setopt ($curl,CURLOPT_POST,count($post));
            curl_setopt ($curl,CURLOPT_POSTFIELDS,implode("&",$post_arr));
        }
        $data = curl_exec($curl);
        curl_close($curl);

        if ($data=="") return false;
        else {
            if ($type=='json') return json_decode($data,true);
            else {
                try {
                    $xml = new SimpleXMLElement($data);
                }
                catch (Exception $e) {
                    return false;
                }

                return json_decode(json_encode($xml),true);
            }
        }
    }
}
