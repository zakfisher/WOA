<?php session_start(); ?>
      <div id="header">
         <div id="navigation">
            <div class="inner-container">
               <div id="logo" class="left">
                  <div class="sprite" data-page="home"></div>
               </div>
               <!-- end #logo -->

               <a href="javascript:void(0);" data-page="dashboard" class="left username <?= ($_SESSION['logged_in'] == true) ? '' : 'hidden'; ?>"><?= $_SESSION['user']['username']; ?></a>

               <div class="right">
                  <div class="link left sign-in <?= ($_SESSION['logged_in'] != true) ? '' : 'hidden'; ?>">
                     <p class="left">Log In</p>
                     <div class="caret"></div>
                     <div class="dropdown">
                        <div id="login-form">
                           <input type="text" name="un" value="username" />
                           <input type="text" name="pw-fake" value="password" />
                           <input type="password" name="pw" />
                           <div class="btn btn-inverse right login">Log In</div>
                           <p class="error"></p>
                        </div>
                     </div>
                     <!-- end .dropdown -->
                  </div>
                  <!-- end .sign-in -->

                  <div class="link left sign-out <?= ($_SESSION['logged_in'] == true) ? '' : 'hidden'; ?>">
                     <p class="left">Log Out</p>
                     <!-- end .dropdown -->
                  </div>
                  <!-- end .sign-out -->

               </div>
               <!-- end .right.home -->
            </div>
            <!-- end .inner-container -->
         </div>
         <!-- end #navigation -->
      </div>
      <!-- end #header -->
      <div id="main-content">
