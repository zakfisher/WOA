<?php
require_once('../system/config.php');

//if (isset($_GET['logout'])) $user->logout();

$tpl->page    = 'Desktop';
//$tpl->music = $music->getAll();
//$tpl->user = $user->getUser();

// Handle Form Submission
if (isset($_POST['submit'])) {

}

//$tpl->message = $admin->getMessage();

$tpl->display('templates/header.tpl.php');
$tpl->display('templates/navigation.tpl.php');
//$tpl->display('templates/message.tpl.php');
$tpl->display('templates/desktop.tpl.php');
$tpl->display('templates/footer.tpl.php');
