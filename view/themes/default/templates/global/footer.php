<?php unset($_SESSION); session_destroy(); ?>
      <div id="footer" style="height: 97px;">
         <div class="inner-container">
            <div class="pr hidden">
               <a href="http://blogs.hbr.org/cs/2012/02/how_employers_can_help_solve_t.html" target="_blank" class="company hbr"></a>
               <a href="http://mashable.com/2009/03/09/upmo/" target="_blank" class="company mashable"></a>
               <a href="http://www.forbes.com/2009/02/18/jobs-networking-linkedin-leadership-careers_basics.html" target="_blank" class="company forbes"></a>
               <a href="http://www.fastcompany.com/1790560/how-upmo-helps-you-hang-on-to-your-best-workers" target="_blank" class="company fast-company"></a>
               <a href="http://www.cnbc.com/id/29640399/Finding_a_Job_Now_What_It_Takes_In_This_Economy" target="_blank" class="company cnbc"></a>
            </div>
            <!-- end .pr -->
            <div class="sitemap hidden">
               <ul class="all">
                  <li>
                     <ul class="sub">
                        <li>
                           <a href="javascript:void(0);" class="main" data-page="employees">Employees</a>
                        </li>
                        <li>
                           <a href="javascript:void(0);" data-page="">Analytics</a>
                        </li>
                        <li>
                           <a href="javascript:void(0);" data-page="">Opportunities</a>
                        </li>
                        <li>
                           <a href="javascript:void(0);" data-page="">Mobility</a>
                        </li>
                        <li>
                           <a href="javascript:void(0);" data-page="">Skills</a>
                        </li>
                        <li>
                           <a href="javascript:void(0);" data-page="">Connections</a>
                        </li>
                     </ul>
                  </li>
                  <li>
                     <ul class="sub border">
                        <li>
                           <a href="javascript:void(0);" class="main" data-page="managers">Managers</a>
                        </li>
                        <li>
                           <a href="javascript:void(0);" data-page="">Projects</a>
                        </li>
                        <li>
                           <a href="javascript:void(0);" data-page="">Talent Marketplace</a>
                        </li>
                        <li>
                           <a href="javascript:void(0);" data-page="">HR &amp; Analytics</a>
                        </li>
                        <li>
                           <a href="javascript:void(0);" data-page="">Social Feedback</a>
                        </li>
                        <li>
                           <a href="javascript:void(0);" data-page="">Security</a>
                        </li>
                     </ul>
                  </li>
                  <li>
                     <ul class="sub">
                        <li>
                           <a href="javascript:void(0);" class="main" data-page="prices">Prices &amp; Planning</a>
                        </li>
                        <li>
                           <a href="javascript:void(0);" data-page="">Overview</a>
                        </li>
                     </ul>
                  </li>
                  <li>
                     <ul class="sub border">
                        <li>
                           <a href="javascript:void(0);" class="main" data-page="about">About UpMo</a>
                        </li>
                        <li>
                           <a href="javascript:void(0);" data-page="">Partners</a>
                        </li>
                        <li>
                           <a href="javascript:void(0);" data-page="">Press Releases</a>
                        </li>
                        <li>
                           <a href="javascript:void(0);" data-page="">News &amp; Events</a>
                        </li>
                        <li>
                           <a href="javascript:void(0);" data-page="">Blog</a>
                        </li>
                        <li>
                           <a href="javascript:void(0);" data-page="">Contact</a>
                        </li>
                        <li>
                           <a href="javascript:void(0);" data-page="">Careers</a>
                        </li>
                     </ul>
                  </li>
                  <li>
                     <ul class="sub">
                        <li>
                           <a href="javascript:void(0);" class="main" data-page="legal">Legal</a>
                        </li>
                        <li>
                           <a href="javascript:void(0);" data-page="">Privacy Policy</a>
                        </li>
                        <li>
                           <a href="javascript:void(0);" data-page="">Terms of Use</a>
                        </li>
                        <li>
                           <a href="javascript:void(0);" data-page="">Security Information</a>
                        </li>
                     </ul>
                  </li>
               </ul>
            </div>
            <!-- end .sitemap -->
            <div class="social-media" style="margin-top: 0px;">
               <a href="http://www.facebook.com/UpMoRocks" target="_blank" class="site fb"></a>
               <!-- end .fb -->
               <a href="http://twitter.com/UPMO" target="_blank" class="site m twitter"></a>
               <!-- end .twitter -->
               <a href="http://www.youtube.com/watch?v=1YE6pB_RdMQ" target="_blank" class="site m youtube"></a>
               <!-- end .youtube -->
               <a href="http://vimeo.com/user8947524" target="_blank" class="site m vimeo"></a>
               <!-- end .vimeo -->
               <a href="feed://feeds.feedburner.com/UpmoBlog" target="_blank" class="site m blog"></a>
               <!-- end .blog -->
            </div>
            <!-- end .social-media -->
            <p class="copyright">Copyright &copy; <?= date("Y"); ?>, Upwardly Mobile, Inc. All Rights Reserved.</p>
         </div>
         <!-- end .inner-container -->
         <div id="footer-bg"></div>
      </div>
      <!-- end #footer -->
   </div>
   <!-- end #container -->
</body>
<script type='text/javascript' src='https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js'></script>
<?php foreach ($js as $path): ?>
<script type='text/javascript' src='<?= $js_path . $path . '.js'; ?>'></script>
<?php endforeach; ?>
<script type="text/javascript">
   var _gaq = _gaq || [];
   _gaq.push(['_setAccount', 'UA-5861957-1']);
   _gaq.push(['_trackPageview']);

   (function() {
      var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
      ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
   })();
</script>
</html>