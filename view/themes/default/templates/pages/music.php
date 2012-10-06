<?php
session_start();

// Page Vars
$artist = (isset($_SESSION['music'])) ? $_SESSION['music'][0] : 'Artist Name';
$track = (isset($_SESSION['music'])) ? $_SESSION['music'][1] : 'Track Name';
?>
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
                  <h1>Music</h1>
                  <h2>Preview and download hours of FREE mixes by your favorite artists below :)</h2>
                  <div class="shadow down"></div>
                  <?= $artist; ?>
                  <br/>
                  <?= $track; ?>
               </div>
               <!-- end .header -->
            </div>
            <!-- end .inner-container -->
         </div>
         <!-- end .content.right -->
         <div class="clr"></div>
