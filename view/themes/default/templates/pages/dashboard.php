<?php
session_start();

// Page Vars
$_SESSION['sub_page'] = (isset($_SESSION['dashboard'])) ? $_SESSION['dashboard'][0] : $_SESSION['sub_page'];
?>
         <div class="content left">
            <div class="inner-container">
               <div class="logo">
                  <div class="sprite"></div>
               </div>
               <!-- end .logo -->
               <div class="inner-container">
                  <ul class="sub-nav">
<?php if ($_SESSION['user']['access'] == 'admin'): ?>
                     <li data-sub-page="updates"<?= ($_SESSION['sub_page'] == 'updates') ? ' class="active"' : ''; ?>>Updates</li>
                     <li data-sub-page="projects"<?= ($_SESSION['sub_page'] == 'projects') ? ' class="active"' : ''; ?>>Projects</li>
                     <li data-sub-page="settings"<?= ($_SESSION['sub_page'] == 'settings') ? ' class="active"' : ''; ?>>Settings</li>
                     <li data-sub-page="contacts"<?= ($_SESSION['sub_page'] == 'contacts') ? ' class="active"' : ''; ?>>Contacts</li>
                     <li data-sub-page="site-emails"<?= ($_SESSION['sub_page'] == 'site-emails') ? ' class="active"' : ''; ?>>Site Emails</li>
                     <li data-sub-page="admin"<?= ($_SESSION['sub_page'] == 'admin') ? ' class="active"' : ''; ?>>Admin</li>
<?php endif; ?>
<?php if ($_SESSION['user']['access'] != 'admin'): ?>
                     <li data-sub-page="updates"<?= ($_SESSION['sub_page'] == 'updates') ? ' class="active"' : ''; ?>>Updates</li>
                     <li data-sub-page="projects"<?= ($_SESSION['sub_page'] == 'projects') ? ' class="active"' : ''; ?>>Projects</li>
                     <li data-sub-page="settings"<?= ($_SESSION['sub_page'] == 'settings') ? ' class="active"' : ''; ?>>Settings</li>
<?php endif; ?>
                  </ul>
               </div>
               <!-- end .sub-nav -->
            </div>
            <!-- end .inner-container -->
         </div>
         <!-- end .content.left -->
         <div class="content right">
<?php if ($_SESSION['page'] == 'dashboard') require_once('dashboard/' . $_SESSION['sub_page'] . '.php'); ?>
         </div>
         <!-- end .content.right -->
         <div class="clr"></div>
<?php require_once('dashboard/templates.php'); ?>
<?php
if ($_SESSION['user']['access'] == 'admin') require_once('dashboard/admin-templates.php');
?>
