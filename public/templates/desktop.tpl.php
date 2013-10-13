<div id="desktop" class="page container">
<!--    --><?php //$i = 0; while($i < 7): ?>
    <div class="row">
        <div class="col-xs-4">
            <div class="desktop-icon" data-page="now-playing">
                <?php require('../ui/images/icons/now-playing.svg'); ?>
                <p class="text-yellow">Now Playing</p>
            </div>
        </div>
        <div class="col-xs-4">
            <div class="desktop-icon" data-page="browse-by-artist">
                <?php require('../ui/images/icons/browse-by-artist.svg'); ?>
                <p class="text-gold">Browse by Artist</p>
            </div>
        </div>
        <div class="col-xs-4">
            <div class="desktop-icon" data-page="my-playlist">
                <?php require('../ui/images/icons/my-playlist.svg'); ?>
                <p class="text-pink">My Playlist</p>
            </div>
        </div>
    </div>
<!--    --><?php //$i++; endwhile; ?>
</div>