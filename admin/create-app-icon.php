<?php
require_once('../system/config.php');
require_once('../system/model/admin.php');
require_once('../system/controller/admin.php');
if (!$user->isLoggedIn()) $user->logout('/admin/');

// Create .ico file for mobile
require_once('../system/libraries/PHP-ICO/class-php-ico.php');

$source = '../ui/images/app-icon.png';
$destination = '../ui/images/app.ico';

$ico_lib = new PHP_ICO($source, array(152, 152));
$ico_lib->save_ico($destination);