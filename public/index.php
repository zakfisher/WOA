<?php
require_once('../system/config.php');

$controller = new MusicController();
$tpl->offset = 1;
$tpl->displayable = 50;
$tpl->music = $controller->getMixes($tpl->offset, $tpl->displayable);
$latest = $tpl->music['all'][0]['uploaded'];
$tpl->latest = $tpl->music[$latest];

$tpl->page = 'Home';

$tpl->display('templates/header.tpl.php');
$tpl->display('templates/navigation.tpl.php');
$tpl->display('templates/index.tpl.php');
$tpl->display('templates/footer.tpl.php');
