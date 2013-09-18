<?php
session_start();

/** Set Environment */
$uri = explode(".", $_SERVER['HTTP_HOST']);
define(ENV, ($uri[0] == 'dev') ? 'development' : 'production');

/** Connect to Database */
require_once('../system/connect.php');

/** Libraries **/
require_once('../system/libraries/Savant3-3.0.1/Savant3.php');
require_once('../system/libraries/getID3-1.9.7/getid3/getid3.php');

/** Utilities **/
require_once('../system/utilities/browser.php');
require_once('../system/utilities/date.php');
require_once('../system/utilities/db.php');
require_once('../system/utilities/email.php');
require_once('../system/utilities/import.php');
require_once('../system/utilities/json.php');
require_once('../system/utilities/text.php');

/** Models **/
require_once('../system/model/music.php');
require_once('../system/model/user.php');

/** Controllers **/
require_once('../system/controller/music.php');
require_once('../system/controller/user.php');

/** Launch **/
$tpl = new Savant3();
$user = new UserController();

// Browser Settings
$browser = new Browser();
$tpl->browser = $browser->get_browser_info();

// Check for IE 8 and below
if ($tpl->browser['short_name'] == 'msie' AND $tpl->browser['version'] <= 8) {
    echo "Please upgrade your browser.";
    exit;
}