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
            <div class="inner-container">
               <div class="header">
                  <h1><?= ucfirst(strtolower($_SESSION['user']['first_name']));?>'s WOA</h1>
                  <h2>This is your dashboard. From here, you can  access various pages - like contracts, business plans, etc.</h2>
                  <div class="shadow"></div>
               </div>
               <!-- end .header -->
            </div>
            <!-- end .inner-container -->
         </div>
         <!-- end .content.right -->
         <div class="clr"></div>
