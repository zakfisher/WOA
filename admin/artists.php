<?php
require_once('../system/config.php');
require_once('../system/model/admin.php');
require_once('../system/controller/admin.php');
if (!$user->isLoggedIn()) $user->logout('/admin/');

// Local Vars
$admin = new AdminController();

// Global Vars
$tpl->page    = 'Admin Panel';
$tpl->user    = $user->getUser();
$tpl->section = 'artists';
$tpl->action  = $_GET['action'];
$tpl->actions = $admin->getActions('artists');

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

// Get Message
$tpl->message = $admin->getMessage();

// Display Templates
$tpl->display('templates/header.tpl.php');
$tpl->display('templates/navigation.tpl.php');
$tpl->display('templates/message.tpl.php');
if (empty($tpl->action)) {
    $tpl->display('templates/actions.tpl.php');
}
else {
    if (file_exists('templates/artists/' . $tpl->action . '.tpl.php')) {
        $tpl->display('templates/artists/' . $tpl->action . '.tpl.php');
    }
}
$tpl->display('templates/footer.tpl.php');