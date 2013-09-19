    </div>
    <div id="footer" class="navbar-inverse">
        <div class="container">
<!--            <p class="text-muted credit">Example courtesy <a href="http://martinbean.co.uk">Martin Bean</a> and <a href="http://ryanfait.com/sticky-footer/">Ryan Fait</a>.</p>-->
        </div>
    </div>
    <?php if (!empty($this->music)): ?><textarea id="music-cache" style="display:none;"><?=JSON::print_json($this->music)?></textarea><?php endif; ?>
</body>
<script type="text/javascript" src="http://code.jquery.com/jquery-latest.js"></script>
<script src="//netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js"></script>
<script type="text/javascript" src="ui/js/media-element/build/mediaelement-and-player.min.js"></script>
<script type="text/javascript" src="ui/js/woa.js"></script>
</html>