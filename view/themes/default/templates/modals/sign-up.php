<?php session_start(); ?>
      <div id="sign-up-modal" <?php if (!$_SESSION['go']): ?>style="display:none;<?php endif; ?>">
         <div class="modal">
            <div class="close btn btn-inverse">x</div>
            <div class="modal-header">
               <div class="modal-inner-container">
                  <h3>Sign Up</h3>
               </div>
               <!-- end .modal-inner-container -->
            </div>
            <!-- end .modal-header -->
            <div class="modal-body">
               <div class="modal-inner-container">
                  <div id="sign-up-form">
                     <div class="input short left">
                        <p>FIRST NAME</p>
                        <input type="text" name="first_name" />
                     </div>
                     <!-- end first_name -->
                     <div class="input short right">
                        <p>LAST NAME</p>
                        <input type="text" name="last_name" />
                     </div>
                     <!-- end last_name -->
                     <div class="input long clr">
                        <p>WORK EMAIL</p>
                        <input type="text" name="email" />
                     </div>
                     <!-- end email -->
                     <div class="input long clr">
                        <p>JOB TITLE</p>
                        <input type="text" name="title" />
                     </div>
                     <!-- end title -->
                     <div class="input short left">
                        <p>PASSWORD</p>
                        <input type="password" name="password" />
                     </div>
                     <!-- end password -->
                     <div class="input short right">
                        <p>CONFIRM PASSWORD</p>
                        <input type="password" name="confirm_password" />
                     </div>
                     <!-- end confirm_password -->
                     <div class="sprite logo clr left"></div>
                     <div class="terms left">
                        <div class="sprite checkbox left">
                           <input type="checkbox" class="hidden" name="terms" />
                        </div>
                        <!-- end .checkbox -->
                        <p class="left">I agree to the <a href="javascript:void(0);" id="show-terms-modal" class="show-modal">terms &amp; conditions</a>.</p>
                     </div>
                     <!-- end .terms -->
                     <div class="create-account btn btn-info btn-large right">Create Account</div>
                  </div>
                  <!-- end #sign-up-form -->
                  <div id="sign-up-success" class="hidden">
                     <p class="success">Success!</p>
                     <p>Check your email to activate your account...</p>
                     <div class="sprite"></div>
                     <p>...and start taking control of your career today.</p>
                  </div>
                  <!-- end #sign-up-success -->
               </div>
               <!-- end .modal-inner-container -->
            </div>
            <!-- end .modal-body -->
            <div class="modal-footer">
               <div class="modal-inner-container">
                  <p class="msg"></p>
               </div>
               <!-- end .modal-inner-container -->
            </div>
            <!-- end .modal-footer -->
         </div>
         <!-- end .modal -->
         <div class="modal-backdrop"></div>
      </div>
      <!-- end #sign-up-modal -->
