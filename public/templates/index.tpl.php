<div data-role="page" data-theme="a">

    <div data-role="panel" id="left-panel" data-position="left" data-display="push" data-theme="a"
         class="ui-panel ui-panel-position-left ui-panel-display-push ui-body-a ui-panel-animate ui-panel-open">
        <div class="ui-panel-inner">
            <h3>Left Panel: Push</h3>

            <p>This panel is positioned on the left with the push display mode. The panel markup is <em>after</em> the
                header, content and footer in the source order.</p>

            <p>To close, click off the panel, swipe left or right, hit the Esc key, or use the button below:</p>
            <a href="#show-panel" data-rel="close" data-role="button" data-theme="a" data-icon="delete"
               data-inline="true" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span"
               class="ui-btn ui-shadow ui-btn-corner-all ui-btn-inline ui-btn-icon-left ui-btn-up-a">
                <span class="ui-btn-inner">
                    <span class="ui-btn-text">Close panel</span>
                    <span class="ui-icon ui-icon-delete ui-icon-shadow">&nbsp;</span>
                </span>
            </a>
        </div>
    </div>

    <div data-role="panel" id="right-panel" data-position="right" data-display="push" data-theme="b"
         class="ui-panel ui-panel-position-right ui-panel-display-push ui-body-b ui-panel-animate ui-panel-open">

        <div class="ui-panel-inner">
            <h3>Right Panel: Push</h3>
            <p>This panel is positioned on the right with the push display mode. The panel markup is <em>after</em> the
                header, content and footer in the source order.</p>
            <p>To close, click off the panel, swipe left or right, hit the Esc key, or use the button below:</p>
            <a href="#demo-links" data-rel="close" data-role="button" data-theme="a" data-icon="delete"
                data-inline="true" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span"
                class="ui-btn ui-shadow ui-btn-corner-all ui-btn-inline ui-btn-icon-left ui-btn-up-a">
                <span class="ui-btn-inner">
                    <span class="ui-btn-text">Close panel</span>
                    <span class="ui-icon ui-icon-delete ui-icon-shadow">&nbsp;</span>
                </span>
            </a>
        </div>
    </div>

    <div data-theme="a" data-role="header" data-position="fixed" data-fullscreen="true">
        <a href="#left-panel"><i class="icon-reorder"></i></a>
        <h3><?php require('../ui/images/logo.svg'); ?></h3>
        <a href="#right-panel"><i class="icon-user"></i></a>
    </div>

    <div data-role="content">

    </div>

    <div data-role="footer" data-position="fixed" data-fullscreen="true">
        <div data-role="navbar">
            <p id="now-playing">Afrojack - Live @ Your Mom's House</p>
            <audio src="http://www.worldofanarchy.com/_WOA/music/9.14.13/Afrojack%20%E2%80%93%20Jacked%20%E2%80%93%2014.09.2013%20%5Bwww.edmtunes.com%5D.mp3" type="audio/mp3" controls="controls"></audio>
        </div>
        <div data-role="navbar">
            <ul>
                <li><a href="a.html">Info</a></li>
                <li><a href="b.html">Friends</a></li>
                <li><a href="c.html">Albums</a></li>
                <li><a href="d.html">Emails</a></li>
            </ul>
        </div>
    </div>

</div>