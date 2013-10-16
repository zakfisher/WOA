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
            'title' => 'Now Playing',
            'icon' => 'now-playing',
            'color' => 'yellow'
        ),
        array(
            'requires_login' => 0,
            'title' => 'Browse By Artist',
            'icon' => 'browse-by-artist',
            'color' => 'gold'
        ),
        array(
            'requires_login' => 1,
            'title' => 'My Playlist',
            'icon' => 'my-playlist',
            'color' => 'pink'
        )
    )
);

$tpl->message = array('type' => 'success', 'message' => 'some shit..');

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
