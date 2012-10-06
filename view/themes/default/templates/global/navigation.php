<?php session_start(); ?>
      <div id="header">
         <div id="navigation">
            <div class="inner-container">
               <div id="logo" class="left">
                  <div class="sprite" data-page="home"></div>
               </div>
               <!-- end #logo -->
               <ul class="sub-pages left">
                  <li class="page-link<?= $_SESSION['page'] == 'music' ? ' active' : ''; ?>" data-page="music">
                     <a href="javascript:void(0);">Music</a>
                  </li>
                  <li class="page-link<?= $_SESSION['page'] == 'about' ? ' active' : ''; ?>" data-page="about">
                     <a href="javascript:void(0);">About</a>
                  </li>
                  <li class="page-link<?= $_SESSION['page'] == 'contact' ? ' active' : ''; ?>" data-page="contact">
                     <a href="javascript:void(0);">Contact</a>
                  </li>
               </ul>
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
                  </div>
                  <!-- end .sign-out -->
               </div>
               <!-- end .right -->
               <a href="javascript:void(0);" data-page="dashboard" class="right username <?= ($_SESSION['logged_in'] == true) ? '' : 'hidden'; ?>"><?= $_SESSION['user']['username']; ?></a>
            </div>
            <!-- end .inner-container -->
         </div>
         <!-- end #navigation -->
      </div>
      <!-- end #header -->
      <div class="container top">
         <div class="sprite"></div>
      </div>
      <!-- end .container.top -->
      <div id="main-content">
