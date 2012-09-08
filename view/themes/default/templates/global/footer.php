<?php unset($_SESSION); session_destroy(); ?>
      <div id="footer">
         <div class="inner-container">
            <!-- end .social-media -->
            <p class="copyright">Copyright &copy; <?= date("Y"); ?> Anarchy Productions International LLC. All Rights Reserved.</p>
            <div class="social-media">
               <a href="http://www.facebook.com/UpMoRocks" target="_blank" class="site fb"></a>
               <!-- end .fb -->
               <a href="http://twitter.com/UPMO" target="_blank" class="site m twitter"></a>
               <!-- end .twitter -->
               <a href="feed://feeds.feedburner.com/UpmoBlog" target="_blank" class="site m blog"></a>
               <!-- end .blog -->
            </div>
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