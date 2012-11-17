<?php
session_start();

// Page Vars
$_SESSION['sub_page'] = (isset($_SESSION['projects'])) ? $_SESSION['projects'][0] : $_SESSION['sub_page'];
if (! file_exists('projects/' . $_SESSION['sub_page'] . '.php')) $_SESSION['sub_page'] = 'overview';
?>
         <div class="content left">
            <div class="inner-container">
               <div class="logo">
                  <div class="sprite"></div>
                  projects
               </div>
               <!-- end .logo -->
               <div class="inner-container">
                  <ul class="sub-nav">
                     <li data-sub-page="overview"<?= ($_SESSION['sub_page'] == 'overview') ? ' class="active"' : ''; ?>>Overview</li>
                     <li data-sub-page="updates"<?= ($_SESSION['sub_page'] == 'updates') ? ' class="active"' : ''; ?>>Updates</li>
<?php if ($_SESSION['user']['access'] == 'admin'): ?>
                     <li data-sub-page="partners"<?= ($_SESSION['sub_page'] == 'partners') ? ' class="active"' : ''; ?>>Partners</li>
                     <li data-sub-page="biz-plan"<?= ($_SESSION['sub_page'] == 'biz-plan') ? ' class="active"' : ''; ?>>Business Plan</li>

<?php endif; ?>
<?php if ($_SESSION['user']['access'] == 'partner'): ?>
                     <li data-sub-page="contracts"<?= ($_SESSION['sub_page'] == 'contracts') ? ' class="active"' : ''; ?>>Contracts</li>
                     <li data-sub-page="biz-plan"<?= ($_SESSION['sub_page'] == 'biz-plan') ? ' class="active"' : ''; ?>>Business Plan</li>
<?php endif; ?>
                  </ul>
               </div>
               <!-- end .sub-nav -->
            </div>
            <!-- end .inner-container -->
         </div>
         <!-- end .content.left -->
            <pre>
               <?php print_r($_SESSION); ?>
            </pre>
         <div class="content right">
<?php if ($_SESSION['page'] == 'projects') require_once('projects/' . $_SESSION['sub_page'] . '.php'); ?>
         </div>
         <!-- end .content.right -->
         <div class="clr"></div>
<?php require_once('dashboard/templates.php'); ?>
<?php
if ($_SESSION['user']['access'] == 'admin') require_once('dashboard/admin-templates.php');
?>
