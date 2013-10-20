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
            'has_modal' => 1,
            'requires_login' => 0,
            'requires_ajax' => 0,
            'title' => 'Now Playing',
            'icon' => 'now-playing'
        ),
        array(
            'has_modal' => 1,
            'requires_login' => 1,
            'requires_ajax' => 0,
            'title' => 'My Playlist',
            'icon' => 'my-playlist'
        ),
        array(
            'has_modal' => 1,
            'requires_login' => 0,
            'requires_ajax' => 1,
            'title' => 'Browse By Artist',
            'icon' => 'browse-by-artist'
        ),
        array(
            'has_modal' => 1,
            'requires_login' => 0,
            'requires_ajax' => 1,
            'title' => 'Latest Mixes',
            'icon' => 'latest-mixes'
        ),
        array(
            'has_modal' => 0,
            'requires_login' => 0,
            'requires_ajax' => 1,
            'title' => 'Random Mix',
            'icon' => 'random-mix'
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
$tpl->display('templates/footer.tpl.php');
