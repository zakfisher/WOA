    <?php if (!empty($this->music)): ?><textarea id="music-cache" style="display:none;"><?=JSON::print_json($this->music)?></textarea><?php endif; ?>
</body>
<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
<script src="http://code.jquery.com/mobile/1.3.2/jquery.mobile-1.3.2.min.js"></script>
<!--<script src="//netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js"></script>-->
<script type="text/javascript" src="ui/js/media-element/build/mediaelement-and-player.min.js"></script>
<script type="text/javascript" src="ui/js/woa.js"></script>
</html>