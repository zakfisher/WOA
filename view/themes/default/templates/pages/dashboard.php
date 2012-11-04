<?php session_start(); ?>
         <div class="content left">
            <div class="inner-container">
               <div class="logo">
                  <div class="sprite"></div>
               </div>
               <!-- end .logo -->
               <div class="inner-container">
                  <ul class="sub-nav default">
<?php if ($_SESSION['user']['access'] == 'admin'): ?>
                     <li data-sub-page="updates"<?= ($_SESSION['sub_page'] == 'updates') ? ' class="active"' : ''; ?>>Updates</li>
                     <li data-sub-page="projects"<?= ($_SESSION['sub_page'] == 'projects') ? ' class="active"' : ''; ?>>Projects</li>
                     <li data-sub-page="contacts"<?= ($_SESSION['sub_page'] == 'contacts') ? ' class="active"' : ''; ?>>Contacts</li>
                     <li data-sub-page="site_emails"<?= ($_SESSION['sub_page'] == 'site-emails') ? ' class="active"' : ''; ?>>Site Emails</li>
                     <li data-sub-page="settings"<?= ($_SESSION['sub_page'] == 'settings') ? ' class="active"' : ''; ?>>Settings</li>
                     <li data-sub-page="admin"<?= ($_SESSION['sub_page'] == 'admin') ? ' class="active"' : ''; ?>>Admin</li>
<?php endif; ?>
<?php if ($_SESSION['user']['access'] != 'admin'): ?>
                     <li data-sub-page="updates"<?= ($_SESSION['sub_page'] == 'updates') ? ' class="active"' : ''; ?>>Updates</li>
                     <li data-sub-page="projects"<?= ($_SESSION['sub_page'] == 'projects') ? ' class="active"' : ''; ?>>Projects</li>
                     <li data-sub-page="settings"<?= ($_SESSION['sub_page'] == 'settings') ? ' class="active"' : ''; ?>>Settings</li>
<?php endif; ?>
                  </ul>
                  <span class="sub-page-nav hidden">
                     <div class="back-to-page">
                        <div class="btn btn-inverse back-to-dashboard"><i class="icon-white icon-arrow-left"></i> Back to Dashboard</div>
                     </div>
                     <ul class="sub-nav sub-page"></ul>
                  </span>
               </div>
               <!-- end .sub-nav -->
            </div>
            <!-- end .inner-container -->
         </div>
         <!-- end .content.left -->
         <div class="content right">
            <div class="content-loading"></div>
         </div>
         <!-- end .content.right -->
         <div class="clr"></div>
<?php
$templates = array('wrapper', 'list', 'updates', 'projects', 'settings', 'site-emails');
$admin_templates = array('admin', 'contacts');
foreach ($templates as $template) require_once('dashboard/' . $template . '-templates.php');
if ($_SESSION['user']['access'] == 'admin')
   foreach ($admin_templates as $template) require_once('dashboard/' . $template . '-templates.php');
?>
