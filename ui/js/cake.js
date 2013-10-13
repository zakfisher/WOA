/* * * * * * * * * * * * * * * * * * * * * * * * *
 * EDM Cake Global Namespace
 *
 * Author: Zachary Fisher - zfisher@zfidesign.com
 * * * * * * * * * * * * * * * * * * * * * * * * */
cake = new function() {
    var c = this;
    c.Search = new function() {
        var n = this;
        var navbarBtn       = '.navbar-header button';
        var toggleSearchBtn = '.toggle-search-bar';
        n.toggleDisplay = function() {
            $(navbarBtn).click();
            var icon = $(toggleSearchBtn).find('i');
            if (icon.is('.icon-chevron-up')) {
                icon.removeClass('icon-chevron-up').addClass('icon-chevron-down');
            }
            else {
                icon.addClass('icon-chevron-up').removeClass('icon-chevron-down');
            }
        };
        n.init = function() {
            $(document).on('click', toggleSearchBtn, n.toggleDisplay);
        };
    };
    c.Player = new function() {
        var n = this;
        var togglePlayerBtn = '.toggle-player-bar';
        n.toggleDisplay = function() {
            var icon = $(togglePlayerBtn).find('i');
            if (icon.is('.icon-chevron-up')) {
                icon.removeClass('icon-chevron-up').addClass('icon-chevron-down');
                $('#footer').animate({
                    bottom: '0'
                }, 300);
            }
            else {
                icon.addClass('icon-chevron-up').removeClass('icon-chevron-down');
                $('#footer').animate({
                    bottom: '-60px'
                }, 300);
            }
        };
        n.init = function() {
//            n.toggleDisplay();
            $(document).on('click', togglePlayerBtn, n.toggleDisplay);
            var player = new MediaElementPlayer('audio',{
//            audioWidth: 280,
//            success: function(mediaElement, domObject) {
//                mediaElement.addEventListener('ended', function(e) {
//                    var max = $('#all-count').text();
//                    max = max.split('Results Found: ');
//                    max = Number(max[1]);
//                    $('#all-results a')[getRandomInt(0, max)].click();
//                }, false);
//            }
            });
            $('.mejs-playpause-button').after('<i class="icon-fast-backward"></i><i class="icon-fast-forward"></i>');
            //player.play();
        };
    };
    c.Slideshow = new function() {
        var s = this;
        var id = '#bg-image';
        var currentImage = 4;
        var totalImages = 4;
        s.adjustBGposition = function() {
            var imageWidth = $(id).width();
            var docWidth = $(document).width();
            var offset = imageWidth - docWidth;
            if (offset > 0) {
                $(id).css({marginLeft:'-'+offset/2+'px'});
            }
            else {
                $(id).css({marginLeft:'0px'});
            }
        };
        s.updateImage = function() {
            currentImage++;
            if (currentImage > totalImages) currentImage = 1;
            $(id).fadeOut(300, function() {
                $(id).attr('src', '/images/bg/' + currentImage + '.jpg');
                setTimeout(function() { $(id).fadeIn(); }, 300);
            });
        };
        s.init = function() {
            s.adjustBGposition();
            $(window).resize(s.adjustBGposition);
            setInterval(s.updateImage, 10000);
        };
    };
    c.init = function() {
        c.Search.init();
        c.Player.init();
        c.Slideshow.init();
    }
};

$(cake.init);