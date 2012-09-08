<?php session_start(); ?>
   <div id="contact-modal" style="display:none;">
      <div class="modal">
         <div class="modal-header">
            <div class="close">x</div>
         </div>
         <div class="modal-body">
            <p style="font-size:20px;padding-bottom:0px;">Interested in working with ZFi?</p>
            <p style="font-size:14px;color:#005299;">Send an email below and receive a response within 24 hours.</p>
            <form action="javascript:void(0);" id="contact-form">
               <div style="float:left;">
                  <label>Name</label>
                  <input type="text" />
                  <label>Email</label>
                  <input type="text" />
                  <label>Subject</label>
                  <input type="text" />
               </div>
               <div style="float:right;">
                  <label>Message</label>
                  <textarea></textarea>
               </div>
            </form>
         </div>
         <div class="modal-footer">
            <a href="javascript:void(0);" class="btn btn-danger x">Cancel</a>
            <a id="submit-contact-form" href="javascript:void(0);" class="btn btn-primary">Send Email</a>
         </div>
      </div>
      <div class="modal-backdrop"></div>
   </div>
