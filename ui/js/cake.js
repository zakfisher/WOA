/* * * * * * * * * * * * * * * * * * * * * * * * *
 * EDM Cake Global Namespace
 *
 * Author: Zachary Fisher - zfisher@zfidesign.com
 * * * * * * * * * * * * * * * * * * * * * * * * */
cake = new function() {
    var c = this;
    c.Navigation = new function() {
        var n = this;
        var navbarBtn       = '.navbar-header button';
        var toggleSearchBtn = '.toggle-search-bar';
        n.toggleSearchBar = function() {
            $(navbarBtn).click();
            var icon = $(toggleSearchBtn).find('i');
            if (icon.is('.icon-chevron-up')) icon.removeClass('icon-chevron-up').addClass('icon-chevron-down');
            else icon.addClass('icon-chevron-up').removeClass('icon-chevron-down');
        };
        n.init = function() {
            $(document).on('click', toggleSearchBtn, n.toggleSearchBar);
        };
    };
    c.init = function() {
        c.Navigation.init();
    }
};

$(cake.init);