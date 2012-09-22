<?php
session_start();

// Page Vars
$test = (isset($_SESSION['dashboard'])) ? $_SESSION['dashboard'][1] : 'testing....';
?>
            <div class="inner-container">
               <div class="header">
                  <h1>Settings</h1>
                  <h2>Update your account information.</h2>
                  <div class="shadow"></div>
                  <?= $test; ?>
               </div>
               <!-- end .header -->
            </div>
            <!-- end .inner-container -->
