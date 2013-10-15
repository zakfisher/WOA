    </div>
    <div id="footer">
        <div class="toggle-player-bar">
            <i class="icon-chevron-up"></i>
        </div>
        <div class="now-playing">
            <p id="now-playing">Afrojack - Live @ Your Mom's House</p>
        </div>
        <div class="player">
            <audio src="http://www.worldofanarchy.com/_WOA/music/9.14.13/Afrojack%20%E2%80%93%20Jacked%20%E2%80%93%2014.09.2013%20%5Bwww.edmtunes.com%5D.mp3" type="audio/mp3" controls="controls"></audio>
        </div>
    </div>
    <?php if ($this->isLoggedIn): ?><input id="is-logged-in" type="hidden" /><?php endif; ?>
</body>
<script type="text/javascript" src="http://code.jquery.com/jquery-latest.js"></script>
<script src="//netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js"></script>
<script type="text/javascript" src="/ui/js/media-element/build/mediaelement-and-player.min.js"></script>
<script type="text/javascript" src="/ui/js/cake.js"></script>
</html>