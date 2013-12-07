<?php
if (isset($_GET['yup'])) {
    echo file_get_contents('http://www.youtube.com/embed/M7lc1UVf-VE?enablejsapi=1&origin=http://example.com&html5=1');
    exit;
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>EDMcake</title>
</head>
<body>

<p>You'll probably forget, so here's what you need to know:</p>
<ol>
    <li><p>Youtube's iframe automatically detects whether to use flash or HTML5</p></li>
    <li><p>Youtube's iframe API:<a href="https://developers.google.com/youtube/iframe_api_reference" target="_blank">https://developers.google.com/youtube/iframe_api_reference</a></p></li>
    <li><p>To prevent unsolicited downloads over cellular networks at the user's expense, embedded media cannot be played automatically in mobile browsers - the user always initiates playback.</p></li>
</ol>

<!-- 1. The <iframe> (and video player) will replace this <div> tag. -->
<iframe id="player" allowfullscreen="1" width="640" height="390" src="?yup" frameborder="0"></iframe>

<script type="text/javascript" src="http://code.jquery.com/jquery-latest.js"></script>
<script>



    $(document).ready(function(){
        $('iframe').load(function(){
//            $('iframe').contents().find('body').html('Hey, i\'ve changed content of <body>! Yay!!!');
        });
    });
</script>
</body>
</html>