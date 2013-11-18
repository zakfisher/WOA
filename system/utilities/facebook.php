<?php
class FB {

    private $appId = 241415132595566;
    private $appSecret = '018951220397255e07804c71a80859f6';

    function __construct() {}

    public function graph($request = '?') {
        $request .= '&access_token=' . $this->appId . '|' . $this->appSecret;
        $curl = Curl::runCurl('https://graph.facebook.com/' . $request);
        return $curl;
    }
}
