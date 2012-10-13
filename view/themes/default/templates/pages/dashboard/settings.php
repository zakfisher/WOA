<?php
session_start();

// Page Vars

// url: /page/subpage/param1
$test = (isset($_SESSION['dashboard'])) ? $_SESSION['dashboard'][1] : 'testing....';
?>
            <div class="inner-container">
               <div class="header">
                  <h1>Settings</h1>
                  <h2>Update your account information.</h2>
                  <div class="shadow"></div>
                  <div class="dynamic-shell">
                     <div class="dynamic-content">
                        <div class="main-view">
                           <div class="form">
                              <div class="input left">
                                 <p>Username</p>
                                 <input type="text" name="username" value="<?= $_SESSION['user']['username']; ?>" />
                              </div>
                              <div class="input right">
                                 <p>Email</p>
                                 <input type="text" name="email" value="<?= $_SESSION['user']['email']; ?>" />
                              </div>
                              <div class="clr"></div>
                              <div class="input left">
                                 <p>First Name</p>
                                 <input type="text" name="first_name" value="<?= $_SESSION['user']['first_name']; ?>" />
                              </div>
                              <div class="input right">
                                 <p>Last Name</p>
                                 <input type="text" name="last_name" value="<?= $_SESSION['user']['last_name']; ?>" />
                              </div>
                              <div class="clr"></div>
                              <div class="input left">
                                 <p>Password</p>
                                 <input type="password" name="password" />
                              </div>
                              <div class="input right">
                                 <p>Confirm Password</p>
                                 <input type="password" name="confirm_pw" />
                              </div>
                              <div class="clr"></div>
                           </div>
                           <!-- end .form -->
                           <div class="submit-form right">
                              <div class="btn btn-inverse save-changes">Save Changes</div>
                           </div>
                           <!-- end .submit-form -->
                        </div>
                     </div>
                     <!-- end .dynamic-content -->
                  </div>
                  <!-- end .dynamic-shell -->
               </div>
               <!-- end .header -->
            </div>
            <!-- end .inner-container -->
