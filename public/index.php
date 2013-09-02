<?php
require_once('../system/config.php');

$tpl->music = MusicController::getContent();

$tpl->page = 'Home';

$tpl->display('templates/header.tpl.php');
$tpl->display('templates/index.tpl.php');
$tpl->display('templates/footer.tpl.php');
