<?php
require_once('../system/config.php');
require_once('../system/model/admin.php');
require_once('../system/controller/admin.php');
$admin = new AdminController();

if (isset($_GET['logout'])) $user->logout();

$tpl->user = $user->getUser();

$tpl->actions = array(
    'import-new-tracks' => array(
        'title' => 'Import New Tracks',
        'description' => 'Extract meta data and insert rows in database.'
    )
);

$action = $_GET['action'];
$tpl->actionResults = array();

if (isset($action)) {
    switch ($action) {
        case 'import-new-tracks':
            $results = $admin->importNewTracks();
            $tpl->actions[$action]['info'] = $results['customData'];
            if (!empty($results['results'])) $tpl->actionResults = $results['results'];
            break;
    }
}

//JSON::print_array($tpl->actions);

$tpl->page = 'Admin Panel';
$tpl->display('templates/header.tpl.php');

if ($user->isLoggedIn()) {
    $tpl->display('templates/navigation.tpl.php');
    $tpl->display('templates/dashboard.tpl.php');
}
else {
    $tpl->display('templates/login.tpl.php');
}
$tpl->display('templates/footer.tpl.php');
