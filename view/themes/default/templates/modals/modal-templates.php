<?php session_start(); ?>

      <!-- Modal Wrapper -->
      <script id="template-modal-wrapper" type="text/x-handlebars-template">
         <div id="{{template}}" class="modal-parent" style="display:none;">
            <div class="modal">
               {{renderInnerTemplate template data}}
            </div>
            <div class="modal-backdrop"></div>
         </div>
      </script>

      <!-- Forgot Password Modal -->
      <script id="template-forgot-password-modal" type="text/x-handlebars-template">
         <div class="modal-header">
            <h2 class="left">Reset Password</h2>
            <div class="close right">x</div>
         </div>
         <div class="modal-body">
            <div class="inner">
               <p class="disclaimer">Your new password will be emailed to you.</p>
               <div id="reset-password-form" class="form">
                  <div class="input long">
                     <p class="label">Email</p>
                     <input type="text" name="email" maxlength="140" />
                  </div>
                  <div class="input long">
                     <p class="label">Confirm Email</p>
                     <input type="text" name="confirm_email" maxlength="140" />
                  </div>
               </div>
               <!-- end #reset-password-form -->
            </div>
            <!-- end .inner -->
         </div>
         <div class="modal-footer">
            <div class="inner">
               <p class="left error"></p>
               <a href="javascript:void(0);" class="btn x">Cancel</a>
               <a id="reset-password" href="javascript:void(0);" class="btn btn-inverse">Reset Password</a>
            </div>
         </div>
      </script>

      <!-- Confirm Post Delete Modal -->
      <script id="template-confirm-post-delete-modal" type="text/x-handlebars-template">
         <div class="modal-header">
            <h2 class="left">Confirm Post Delete</h2>
            <div class="close right">x</div>
         </div>
         <div class="modal-body">
            <div class="inner">
               <p class="disclaimer">Do you really want to delete this post?</p>
            </div>
            <!-- end .inner -->
         </div>
         <div class="modal-footer">
            <div class="inner">
               <p class="left error"></p>
               <a href="javascript:void(0);" class="btn btn-danger" id="confirm-post-delete"><i class="icon-white icon-trash"></i> Delete</a>
               <a href="javascript:void(0);" class="btn x"><i class="icon-remove"></i> Cancel</a>
            </div>
         </div>
      </script>
