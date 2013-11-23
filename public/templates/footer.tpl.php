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
</body>
<script type="text/javascript" src="http://code.jquery.com/jquery-latest.js"></script>
<script src="//netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js"></script>
<script type="text/javascript" src="/ui/js/media-element/build/mediaelement-and-player.min.js"></script>
<script type="text/javascript" src="/ui/js/cookie.js"></script>
<script type="text/javascript" src="/ui/js/handlebars.js"></script>
<script type="text/javascript" src="/ui/js/helpers.js"></script>
<script type="text/javascript" src="/ui/js/cake.js"></script>
</html>