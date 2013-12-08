    </div>
    <div id="player" class="open">
        <div class="toggle-player-bar">
            <i class="icon-chevron-down"></i>
        </div>
        <div class="now-playing">
            <p></p>
        </div>
        <div class="element">
            <audio src="" type="audio/mp3" controls="controls"></audio>
        </div>
    </div>
    <img id="loading" src="/images/loading.gif" />
    <div id="overlay"></div>
    <?php if ($this->isLoggedIn): ?><input id="is-logged-in" type="hidden" /><?php endif; ?>
    <?php if (ENV === 'production'): ?>
        <script>
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

            ga('create', 'UA-46301513-1', 'edmcake.com');
            ga('send', 'pageview');

        </script>
    <?php endif; ?>
</body>
<script type="text/javascript" src="http://code.jquery.com/jquery-latest.js"></script>
<script src="//netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js"></script>
<script type="text/javascript" src="/ui/js/media-element/build/mediaelement-and-player.min.js"></script>
<script type="text/javascript" src="/ui/js/jstween-1.1/jstween-1.1.min.js"></script>
<script type="text/javascript" src="/ui/js/cookie.js"></script>
<script type="text/javascript" src="/ui/js/handlebars.js"></script>
<script type="text/javascript" src="/ui/js/helpers.js"></script>
<script type="text/javascript" src="/ui/js/cake.js"></script>
</html>