<?php
if (isset($_GET['mp3'])) {
    $filepath = 'http://www.worldofanarchy.com/_WOA/music/' . str_replace('::', '/', $_GET['mp3']);
    print $filepath; exit;
    header('Content-Disposition: attachment');
    header("Content-Transfer-Encoding: binary");
    header("Content-Type: audio/mpeg");
//    header('Pragma: no-cache');
//    readfile($filepath);
    echo file_get_contents($filepath);
    exit;
}