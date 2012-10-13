<?php
session_start();
if ($_SESSION['user']['access'] != 'admin' AND $_SESSION['user']['access'] != 'partner') exit;
?>
            <div class="inner-container">
               <div class="header">
                  <h1>Business Plan</h1>
                  <h2>[project name]</h2>
                  <div class="shadow down"></div>
                  <div class="dynamic-shell">
                     <div class="dynamic-content">
                        <div class="page-loading"></div>
                     </div>
                     <!-- end .dynamic-content -->
                  </div>
                  <!-- end .dynamic-shell -->
               </div>
               <!-- end .header -->
            </div>
            <!-- end .inner-container -->
