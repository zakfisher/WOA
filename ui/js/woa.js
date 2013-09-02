/* * * * * * * * * * * * * * * * * * * * * * * * *
 * WOA Global Namespace
 *
 * Author: Zachary Fisher - zfisher@zfidesign.com
 * * * * * * * * * * * * * * * * * * * * * * * * */
WOA = new function() {
    if (window.location.toString().match(/#customize/i)) {
        document.getElementById('config-link').style.display = 'none';
        document.getElementById('config-ui').style.display = 'block';
    }
    var filter = function(value, list, count) {
        $(list).each(function(i, div) {
            var mp3 = $(div).find('p');
            if (mp3.text().toLowerCase().indexOf(value) != -1) {
                $(div).show();
                count++;
            }
            else $(div).hide();
        });
    };
    $(document).on('keyup', '#search', function(e) {
        $('#all-count, #latest-count').html('');
        var searchVal = $('#search').val().toLowerCase();
        var allCount = 0;
        var latestCount = 0;
        filter(searchVal, '#latest-results div.ui360', latestCount);
        filter(searchVal, '#all-results div.ui360', allCount);
        $('#all-count').text('Results Found: ' + allCount);
        $('#latest-count').text('Showing: ' + latestCount);
    });

};