<?php

session_start();

/** Set Environment */
$uri = explode("/", $_SERVER['DOCUMENT_ROOT']);
define(ENV, (isset($uri[4])) ? $uri[4] : 'www');
define(BASE_URL, 'http://' . ENV . '.worldofanarchy.com/');
if (ENV == 'dev' && !isset($_COOKIE['dev'])) { print 'Access Denied'; exit; }

/** Require WOA Master Class */
require_once('system/WOA.php');

/** Require Controller **/
require_once('system/router.php');

/** Variables **/
$theme = 'default';
$page = (!isset($_SESSION['page'])) ? 'home' : $_SESSION['page'];

$css_path = 'view/themes/' . $theme . '/css/';
$css[] = 'bootstrap.min';
$css[] = 'WOA';

$js_path = 'view/themes/' . $theme . '/js/';
$js[] = 'WOA';
$js[] = 'libraries/jquery/cookie';
$js[] = 'libraries/handlebars/handlebars';
$js[] = 'libraries/handlebars/helpers';
$js[] = 'libraries/signature/build/jquery.signaturepad.min';
$js[] = 'libraries/signature/build/json2.min';
$js[] = 'user';
$js[] = 'navigation';
$js[] = 'utilities/all';
$js[] = 'pages/all';
$js[] = 'modals/all';
