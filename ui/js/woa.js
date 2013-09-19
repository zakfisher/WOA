/* * * * * * * * * * * * * * * * * * * * * * * * *
 * WOA Global Namespace
 *
 * Author: Zachary Fisher - zfisher@zfidesign.com
 * * * * * * * * * * * * * * * * * * * * * * * * */
WOA = new function() {
    var music = $.parseJSON($('#music-cache').val());
    $('#music-cache').remove();
    var search = '#search';
    var resultCount = '#result-count';
    var trackList = '#track-list';
    var filter = function(value) {
        var count = 0;
        $(trackList).find('tbody tr').each(function(i, tr) {
            var artist = $(tr).find('td.artist').text().toLowerCase();
            var title = $(tr).find('td.title').text().toLowerCase();
            if (artist.indexOf(value) != -1 || title.indexOf(value) != -1) {
                $(tr).show();
                count++;
            }
            else $(tr).hide();
        });
        return count;
    };
    var getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    $(document).on('keyup', '#search', function(e) {
        $(resultCount).html('');
        var searchVal = $(search).val().toLowerCase();
        $(resultCount).text(filter(searchVal));
    });
//    $(document).on('click', '#all-results tr, #latest-results tr', function(e) {
//        $('#playing').remove();
//        $('#now-playing').find('p').text('testing...').after('<span id="playing"><audio class="clr left" src="' + 'http://www.worldofanarchy.com/_WOA/music/9.14.13/Afrojack%20%E2%80%93%20Jacked%20%E2%80%93%2014.09.2013%20%5Bwww.edmtunes.com%5D.mp3' + '" type="audio/mp3" controls="controls"></span>');
//        var player = new MediaElementPlayer('audio',{
//            audioWidth: 280,
//            success: function(mediaElement, domObject) {
////                mediaElement.addEventListener('ended', function(e) {
////                    var max = $('#all-count').text();
////                    max = max.split('Results Found: ');
////                    max = Number(max[1]);
////                    $('#all-results a')[getRandomInt(0, max)].click();
////                }, false);
//            }
//        });
//        player.play();
//    });
};