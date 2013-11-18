<?php
require_once('../system/config.php');

if (isset($_GET['logout'])) $user->logout('/');

// Handle Form Submission
if (isset($_POST['submit'])) {

}

$tpl->page    = 'Desktop';
$tpl->desktop = array(
    'apps' => array(
        array(
            'requires_login' => 0,
            'requires_ajax' => 1,
            'title' => 'Now Playing',
            'name' => 'now-playing'
        ),
        array(
            'requires_login' => 1,
            'requires_ajax' => 0,
            'title' => 'My Playlist',
            'name' => 'my-playlist'
        ),
        array(
            'requires_login' => 0,
            'requires_ajax' => 1,
            'title' => 'Browse Artists',
            'name' => 'browse-by-artist'
        ),
        array(
            'requires_login' => 0,
            'requires_ajax' => 1,
            'title' => 'Latest Mixes',
            'name' => 'latest-mixes'
        ),
        array(
            'requires_login' => 0,
            'requires_ajax' => 1,
            'title' => 'Random Mix',
            'name' => 'random-mix'
        )
    )
);

//$tpl->message = array('type' => 'success', 'message' => 'some shit..');

//$tpl->music = $music->getAll();
$tpl->isLoggedIn = $user->isLoggedIn();
if ($tpl->isLoggedIn) {
    $tpl->user = $user->getUser();
}

$tpl->display('templates/header.tpl.php');
$tpl->display('templates/navigation.tpl.php');
$tpl->display('templates/modal.tpl.php');
$tpl->display('templates/desktop.tpl.php');
$tpl->display('templates/app.tpl.php');
$tpl->display('templates/footer.tpl.php');
