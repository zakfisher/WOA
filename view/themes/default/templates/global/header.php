<?php session_start(); ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="description" content="In a World of Anarchy, anything is possible." />
<meta name="keywords" content="EDM, electronic music, dubstep, trance, electro, house, house music, anarchy, world of anarchy" />
<title>World of Anarchy :: In a world of anarchy, anything is possible.</title>
<meta name="description" content="World of Anarchy <?= date("Y"); ?>">
<link id="page_favicon" href="favicon.ico" rel="icon" type="image/x-icon">
<?php
// Check for IE 7 and below
if (preg_match('/MSIE ([0-9].[0-9])/', $_SERVER['HTTP_USER_AGENT'], $reg) != 0) $ie_version = floatval($reg[1]);
if (isset($ie_version) AND $ie_version < 9)
{
   print '<h2>This site requires IE9 or higher.<br/>Please upgrade your browser or use a different one (Firefox, Chrome, Opera, Safari).</h2>';
   exit;
}
?>
<?php foreach ($css as $path): ?>
<link href="<?= $css_path . $path . '.css'; ?>" rel="stylesheet" type="text/css" media="screen, print" />
<?php endforeach; ?>
<link rel="stylesheet" href="view/themes/default/js/libraries/signature/build/jquery.signaturepad.css">
</head>
<body>
   <div id="container" data-theme="<?= $theme; ?>" data-page="<?= $page; ?>">
