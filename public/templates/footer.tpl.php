</body>
<script type="text/javascript" src="http://code.jquery.com/jquery-latest.js"></script>
<!--[if IE]><script type="text/javascript" src="../../soundmanager/demo/360-player/script/excanvas.js"></script><![endif]-->
<script type="text/javascript" src="../../soundmanager/demo/360-player/script/berniecode-animator.js"></script>
<script type="text/javascript" src="../../soundmanager/script/soundmanager2.js"></script>
<script type="text/javascript" src="../../soundmanager/demo/360-player/script/360player.js"></script>
<script type="text/javascript">
    soundManager.setup({
        // path to directory containing SM2 SWF
        url: '../../soundmanager/swf/'
    });
    threeSixtyPlayer.config.scaleFont = (navigator.userAgent.match(/msie/i)?false:true);
    threeSixtyPlayer.config.showHMSTime = true;
    // enable some spectrum stuffs
    threeSixtyPlayer.config.useWaveformData = true;
    threeSixtyPlayer.config.useEQData = true;
    // enable this in SM2 as well, as needed
    if (threeSixtyPlayer.config.useWaveformData) {
        soundManager.flash9Options.useWaveformData = true;
    }
    if (threeSixtyPlayer.config.useEQData) {
        soundManager.flash9Options.useEQData = true;
    }
    if (threeSixtyPlayer.config.usePeakData) {
        soundManager.flash9Options.usePeakData = true;
    }
    if (threeSixtyPlayer.config.useWaveformData || threeSixtyPlayer.flash9Options.useEQData || threeSixtyPlayer.flash9Options.usePeakData) {
        // even if HTML5 supports MP3, prefer flash so the visualization features can be used.
        soundManager.preferFlash = true;
    }
    // favicon is expensive CPU-wise, but can be used.
    if (window.location.href.match(/hifi/i)) {
        threeSixtyPlayer.config.useFavIcon = false;
    }
    if (window.location.href.match(/html5/i)) {
        // for testing IE 9, etc.
        soundManager.useHTML5Audio = true;
    }
</script>
<script type="text/javascript" src="http://yui.yahooapis.com/2.7.0/build/yahoo-dom-event/yahoo-dom-event.js"></script>
<script type="text/javascript" src="http://yui.yahooapis.com/2.7.0/build/animation/animation-min.js"></script>
<script type="text/javascript" src="http://yui.yahooapis.com/2.7.0/build/dragdrop/dragdrop-min.js"></script>
<script type="text/javascript" src="http://yui.yahooapis.com/2.7.0/build/slider/slider-min.js"></script>
<script type="text/javascript" src="http://yui.yahooapis.com/2.7.0/build/element/element-min.js"></script>
<script type="text/javascript" src="http://yui.yahooapis.com/2.7.0/build/colorpicker/colorpicker-min.js"></script>
<script type="text/javascript" src="ui/js/woa.js"></script>
</html>