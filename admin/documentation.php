<?php
require_once('../system/config.php');
require_once('../system/model/admin.php');
require_once('../system/controller/admin.php');
if (!$user->isLoggedIn()) $user->logout('/admin/');

$admin = new AdminController();

$tpl->page    = 'Admin Panel';
$tpl->user = $user->getUser();
$tpl->section = 'documentation';
$tpl->subsection = $_GET['subsection'];

// Handle Form Submission
if (isset($_POST['submit'])) {

}

$tpl->message = $admin->getMessage();

$tpl->display('templates/header.tpl.php');
$tpl->display('templates/navigation.tpl.php');
$tpl->display('templates/documentation/suites-'.$tpl->subsection.'.tpl.php');
$tpl->display('templates/footer.tpl.php');