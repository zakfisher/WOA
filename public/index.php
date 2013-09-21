<?php
require_once('../system/config.php');

//$tpl->music = $music->getAll();
//JSON::print_array($tpl->music); exit;

$tpl->page = 'Home';

$tpl->display('templates/header.tpl.php');
$tpl->display('templates/index.tpl.php');
$tpl->display('templates/footer.tpl.php');
