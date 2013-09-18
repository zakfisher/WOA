<?php
require_once('../system/config.php');

if (isset($_GET['logout'])) $user->logout();

$tpl->user = $user->getUser();

//JSON::print_array($tpl->user); exit;

$tpl->page = 'Home';
$tpl->display('templates/header.tpl.php');

if ($user->loggedIn()) {
    $tpl->display('templates/navigation.tpl.php');
    $tpl->display('templates/index.tpl.php');
}
else {
    $tpl->display('templates/login.tpl.php');
}
$tpl->display('templates/footer.tpl.php');
