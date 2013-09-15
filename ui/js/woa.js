/* * * * * * * * * * * * * * * * * * * * * * * * *
 * WOA Global Namespace
 *
 * Author: Zachary Fisher - zfisher@zfidesign.com
 * * * * * * * * * * * * * * * * * * * * * * * * */
WOA = new function() {
    var filter = function(value, list, count) {
        count = 0;
        $(list).each(function(i, mp3) {
            if ($(mp3).text().toLowerCase().indexOf(value) != -1) {
                $(mp3).show();
                count++;
            }
            else $(mp3).hide();
        });
        return count;
    };
    var getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    $('#tabs a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });
    $(document).on('keyup', '#search', function(e) {
        $('#all-count, #latest-count').html('');
        var searchVal = $('#search').val().toLowerCase();
        $('#all-count').text('Results Found: ' + filter(searchVal, '#all-results a'));
        $('#latest-count').text('Showing: ' + filter(searchVal, '#latest-results a'));
    });
    $(document).on('click', '#all-results tr, #latest-results tr', function(e) {
        $('#playing').remove();
        $('#now-playing').find('p').text('testing...').after('<span id="playing"><audio class="clr left" src="' + 'http://www.worldofanarchy.com/_WOA/music/9.14.13/Afrojack%20%E2%80%93%20Jacked%20%E2%80%93%2014.09.2013%20%5Bwww.edmtunes.com%5D.mp3' + '" type="audio/mp3" controls="controls"></span>');
        var player = new MediaElementPlayer('audio',{
            audioWidth: 280,
            success: function(mediaElement, domObject) {
//                mediaElement.addEventListener('ended', function(e) {
//                    var max = $('#all-count').text();
//                    max = max.split('Results Found: ');
//                    max = Number(max[1]);
//                    $('#all-results a')[getRandomInt(0, max)].click();
//                }, false);
            }
        });
        player.play();
    });
};