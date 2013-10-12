<?php
require_once('../system/config.php');
require_once('../system/model/admin.php');
require_once('../system/controller/admin.php');
if (!$user->isLoggedIn()) $user->logout();

$admin = new AdminController();

$tpl->page    = 'Admin Panel';
//$tpl->actions = $admin->getActions();
$tpl->user = $user->getUser();
$tpl->section = 'users';

// Handle Form Submission
if (isset($_POST['submit'])) {

}

// Handle Current Action
if (isset($tpl->action) && !empty($tpl->action)) {
    $results = $admin->executeAction($tpl->action);
    if (!empty($results)) {
        if (!empty($results['customData'])) $tpl->actions[$tpl->action]['info'] = $results['customData'];
        if (!empty($results['results'])) $tpl->actionResults = $results['results'];
    }
}

$tpl->message = $admin->getMessage();

$tpl->display('templates/header.tpl.php');
$tpl->display('templates/navigation.tpl.php');
$tpl->display('templates/users.tpl.php');
$tpl->display('templates/footer.tpl.php');