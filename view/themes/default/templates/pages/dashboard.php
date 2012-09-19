<?php session_start(); ?>
         <div class="content left">
            <div class="inner-container">
               <div class="logo">
                  <div class="sprite"></div>
               </div>
               <!-- end .logo -->
            </div>
            <!-- end .inner-container -->
         </div>
         <!-- end .content.left -->
         <div class="content right">
            <?php if ($_SESSION['page'] == 'dashboard') require_once('view/themes/default/templates/pages/user/' . $_SESSION['sub_page'] . '.php'); ?>
         </div>
         <!-- end .content.right -->
         <div class="clr"></div>
