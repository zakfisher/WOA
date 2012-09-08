<?php session_start(); ?>
      <div id="login-modal" style="display:none;">
         <div class="modal">
            <div class="close btn btn-inverse">x</div>
            <div class="modal-header">
               <div class="modal-inner-container">
                  <h3>Log In</h3>
               </div>
               <!-- end .modal-inner-container -->
            </div>
            <!-- end .modal-header -->
            <div class="modal-body">
               <div class="modal-inner-container">
                  <div id="login-form">
                     <div class="input long">
                        <p>WORK EMAIL</p>
                        <input type="text" name="email" />
                     </div>
                     <!-- end email -->
                     <div class="input left">
                        <p>PASSWORD</p>
                        <input type="password" name="password" />
                     </div>
                     <!-- end password -->
                     <div class="submit">
                        <div class="login btn btn-info btn-large right">Log In</div>
                        <div class="sprite logo right"></div>
                     </div>
                     <!-- end .submit -->
                  </div>
                  <!-- end #login-form -->
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
      <!-- end #login-modal -->
