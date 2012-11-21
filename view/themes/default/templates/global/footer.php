<?php unset($_SESSION); session_destroy(); ?>
      <div id="footer">
         <div class="top-shadow"></div>
         <div class="inner-container">
            <div class="social-media left">
               <a href="#" target="_blank" class="fb"></a>
               <!-- end .fb -->
               <a href="#" target="_blank" class="twitter"></a>
               <!-- end .twitter -->
               <a href="#" target="_blank" class="rss"></a>
               <!-- end .blog -->
            </div>
            <!-- end .social-media -->
            <div class="footer-nav left">
               <ul>
                  <li>
                     <a href="javascript:void(0);" data-page="music">Music</a>
                  </li>
                  <li class="border">
                     <a href="javascript:void(0);" data-page="about">About</a>
                  </li>
                  <li>
                     <a href="javascript:void(0);" data-page="contact">Contact</a>
                  </li>
               </ul>
            </div>
            <!-- end .footer-nav -->
            <p class="copyright right">Copyright &copy; <?= date("Y"); ?>, Anarchy Productions International LLC</p>
            <div class="clr"></div>
         </div>
         <!-- end .inner-container -->
         <div class="footer-border"></div>
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
    // Google Analytics
</script>
</html>