<?php session_start(); ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
   <title>Upwardly Mobile :: Get Promoted</title>
   <meta name="description" content="Upwardly Mobile, Inc. <?= date("Y"); ?>">
   <link id="page_favicon" href="favicon.ico" rel="icon" type="image/x-icon">
<?php foreach ($css as $path): ?>
   <link href="<?= $css_path . $path . '.css'; ?>" rel="stylesheet" type="text/css" media="screen, print" />
<?php endforeach; ?>
<?php
// Check for IE 7 and below
if (preg_match('/MSIE ([0-9].[0-9])/', $_SERVER['HTTP_USER_AGENT'], $reg) != 0):
   $ie_version = floatval($reg[1]);
endif;
if (isset($ie_version) AND $ie_version == 7):
?>
   <link href="view/themes/default/css/ie<?= $ie_version; ?>.css" rel="stylesheet" type="text/css" media="screen, print" />
<?php endif; ?>
</head>
<body>
   <div id="container" data-theme="<?= $theme; ?>" data-page="<?= $page; ?>" class="<?= $page; ?>">
      <div id="header">
