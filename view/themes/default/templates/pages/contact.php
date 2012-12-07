<?php session_start(); ?>
         <div id="fb-root"></div>
         <script>(function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=241415132595566";
            fjs.parentNode.insertBefore(js, fjs);
         }(document, 'script', 'facebook-jssdk'));</script>
         <div class="content left">
            <div class="inner-container">
               <div class="logo">
                  <div class="sprite"></div>
               </div>
               <!-- end .logo -->
               <div class="fb-like-box" data-href="http://www.facebook.com/worldofanarchy" data-width="242" data-height="400" data-show-faces="true" data-stream="false" data-header="true"></div>
            </div>
            <!-- end .inner-container -->
         </div>
         <!-- end .content.left -->
         <div class="content right">
            <div class="inner-container">
               <div class="header">
                  <h1>Contact Us</h1>
                  <h2>Send us an email below.</h2>
                  <div class="shadow down"></div>
                  <div class="dynamic-shell">
                     <div class="dynamic-content">
                        <div class="main-view">
                           <div class="form settings">
                              <div class="input left">
                                 <p>Name</p>
                                 <input type="text" name="name">
                              </div>
                              <div class="input right">
                                 <p>Email</p>
                                 <input type="text" name="email">
                              </div>
                              <div class="clr"></div>
                              <div class="input wide">
                                 <p>Subject</p>
                                 <input type="text" name="subject">
                              </div>
                              <div class="input message">
                                 <p>Message</p>
                                 <textarea name="message" rows="15"></textarea>
                              </div>
                              <div class="clr"></div>
                           </div>
                           <!-- end.form -->
                           <div class="shadow"></div>
                           <div class="submit-form">
                              <p class="error left"></p>
                              <div class="btn btn-inverse send-email right"><i class="icon-white icon-envelope"></i> Send Email</div>
                           </div>
                           <!-- end.submit-form -->
                        </div>
                        <!-- end .main-view -->
                     </div>
                     <!-- end .dynamic-content -->
                  </div>
                  <!-- end .dynamic-shell -->
               </div>
               <!-- end .header -->
            </div>
            <!-- end .inner-container -->
         </div>
         <!-- end .content.right -->
         <div class="clr"></div>
