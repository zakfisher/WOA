<?php
require_once('../system/config.php');
require_once('../system/model/admin.php');
require_once('../system/controller/admin.php');
$admin = new AdminController();

if (isset($_GET['logout'])) $user->logout();

$tpl->page    = 'Admin Panel';
$tpl->action  = $_GET['action'];
$tpl->section = 'data-tools';
$tpl->subsection = '';
$tpl->actions = $admin->getActions();
$tpl->user = $user->getUser();

if (isset($_GET['section']) && !empty($_GET['section'])) $tpl->section = $_GET['section'];
if (isset($_GET['subsection']) && !empty($_GET['subsection'])) $tpl->subsection = $_GET['subsection'];

// Handle Form Submission
if (isset($_POST['submit'])) {
    switch ($tpl->action) {
        case 'update-missing-data':
            $admin->updateMissingData($_POST);
            break;
    }
}
if (isset($_POST['delete'])) {
    switch ($tpl->action) {
        case 'update-missing-data':
            $admin->deleteTrack($_POST);
            break;
    }
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

if ($user->isLoggedIn()) {
    $tpl->display('templates/navigation.tpl.php');
    $tpl->display('templates/message.tpl.php');
    $tpl->display('templates/dashboard.tpl.php');
}
else {
    $tpl->display('templates/login.tpl.php');
}
$tpl->display('templates/footer.tpl.php');
