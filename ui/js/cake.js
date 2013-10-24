/* * * * * * * * * * * * * * * * * * * * * * * * *
 * EDM Cake Global Namespace
 *
 * Author: Zachary Fisher - zfisher@zfidesign.com
 * * * * * * * * * * * * * * * * * * * * * * * * */

cake = new function() {
    var c = this;
    var body = $('body');
    c.API = {
        music : {
            getAllMixes : '/api/music/getAllMixes/',
            getBrowseByArtistList : '/api/music/getBrowseByArtistList/',
            getBrowseByDateList : '/api/music/getBrowseByDateList/'
        },
        user : {
            getUser: '/api/user/getUser/',
            login: '/api/user/login/'
        }
    };
    c.Search = new function() {
        var s = this;
        s.init = function() {};
    };
    c.Player = new function() {
        var p = this;
        var player = $('#player');
        var togglePlayerBtn = '.toggle-player-bar';
        var addToPlaylistBtn = 'i.add-to-playlist';
        p.playPause = function() {
            $('button[title="Play/Pause"]').click();
        };
        p.isPlaying = function() {
            return $('button[title="Play/Pause"]').parents('.mejs-button').is('.mejs-pause');
        };
        p.toggleDisplay = function() {
            var icon = $(togglePlayerBtn).find('i');
            if (icon.is('.icon-chevron-up')) {
                icon.removeClass('icon-chevron-up').addClass('icon-chevron-down');
                player.animate({
                    bottom: '0'
                }, 300);
                $('#app div.content').animate({
                    paddingBottom: '90px'
                }, 300);
            }
            else {
                icon.addClass('icon-chevron-up').removeClass('icon-chevron-down');
                player.animate({
                    bottom: '-60px'
                }, 300);
                $('#app div.content').animate({
                    paddingBottom: '30px'
                }, 300);
            }
        };
        p.setCurrentMix = function(musicId, play) {
            var setMixFromRefresh = ($.cookie('current-mix-id') !== null && $.cookie('current-mix-time') !== null && $.cookie('current-mix-playing') !== null);
            if (setMixFromRefresh) musicId = $.cookie('current-mix-id');
            var mix = c.MixesById[musicId];
            var url = 'http://www.worldofanarchy.com/_WOA/music/' + mix.url;
            var audio = $('audio');
            audio.attr('src', url);
            player.find('div.now-playing p').html('<b><span class="text-teal default-font">' + mix.artist + '</span></b> ' + mix.title);
            p.currentMix = new MediaElementPlayer(audio, {
                alwaysShowHours: true,
                success: function(mediaElement, domObject) {
                    mediaElement.addEventListener('canplay', function(e) {
                        if (setMixFromRefresh) {
                            if (!c.Browser.isMobile) {
                                p.currentMix.setCurrentTime(Number($.cookie('current-mix-time')));
                                if ($.cookie('current-mix-playing') == 'true') p.currentMix.play();
                            }
                        }
                        $.cookie('current-mix-id', null);
                        $.cookie('current-mix-time', null);
                        $.cookie('current-mix-playing', null);
                    }, false);
                }
            });
            p.currentMix.cache = mix;
            if (play) p.currentMix.play();
            if (c.isLoggedIn && $(addToPlaylistBtn).length == 0) {
                $('.mejs-controls').prepend('<i class="icon-heart add-to-playlist"></i>');
                $('.mejs-currenttime-container').addClass('showing-heart');
            }
        };
        p.getCurrentMixId = function() {
            return p.currentMix.cache.music_id;
        };
        p.toggleFavoriteMix = function() {
            if ($(addToPlaylistBtn).is('.favorite')) $(addToPlaylistBtn).removeClass('favorite');
            else $(addToPlaylistBtn).addClass('favorite');
        };
        p.init = function() {
            $.get(c.API.music.getAllMixes, function(mixesById) {
                c.MixesById = mixesById;
                c.MixArray = [];
                var i = 0;
                for (var id in mixesById) {
                    c.MixArray.push(mixesById[id]);
                    i++;
                }
                p.setCurrentMix(mixesById[i].music_id);
                player.fadeIn();
                $('[data-app=random-mix] div.desktop-icon').removeClass('disabled');
            });
            $(document).on('click', togglePlayerBtn, p.toggleDisplay);
            $(document).on('click', addToPlaylistBtn, p.toggleFavoriteMix);
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
                setTimeout(function() {
                    s.adjustBGposition();
                    $(id).fadeIn();
                }, 300);
            });
        };
        s.init = function() {
            s.adjustBGposition();
            $(window).resize(s.adjustBGposition);
            setInterval(s.updateImage, 30000);
        };
    };
    c.App = new function() {
        var a = this;
        var id = '#app';
        var bg = id + ' div.bg';
        var header = id + ' div.header';
        var content = id + ' div.content';
        var innerContent = content + ' div.inner';
        a.hideApp = function() {
            $('#app').fadeOut();
            $(header).hide();
            $(content).hide();
            $(innerContent).html('');
        };
        a.showApp = function() {
            $('#app').fadeIn('fast');
            $('#loading').show();
        };
        a.displayTemplate = function(template, callback) {
            a.showApp();
            template = '/apps/' + template + '.tpl.php';
            if (typeof callback == 'undefined') $(content).load(template);
            else $(innerContent).load(template, function() {
                callback();
                $(header).fadeIn('fast');
                $(content).fadeIn('fast');
                $('#loading').hide();
            });
        };
        a.render = function(e) {
            var target = $(e.target).is('[data-app]') ? $(e.target) : $(e.target).parents('[data-app]');
            var app = target.attr('data-app');
            //c.Helpers.setURL(modal);
            switch (app) {
                case 'now-playing':
                    a.displayTemplate('now-playing', a.NowPlaying.start);
                    break;
                case 'browse-by-artist':
                    a.displayTemplate('browse-by-artist', a.BrowseByArtist.start);
                    break;
                case 'search-results':
                    a.displayTemplate('search-results', a.SearchResults.start);
                    break;
                case 'my-playlist':
                    a.displayTemplate('my-playlist', a.MyPlaylist.start);
                    break;
                case 'latest-mixes':
                    a.displayTemplate('latest-mixes', a.LatestMixes.start);
                    break;
                case 'random-mix':
                    c.App.RandomMix.selectRandomMix();
                    break;
            }
        };
        a.init = function() {
            $(document).on('click', '[data-app]', a.render);
            $(document).on('click', header + ' i.icon-remove', a.hideApp);
            for (var module in a) {
                for (var method in a[module]) {
                    if (method == 'init') {
                        a[module][method]();
                    }
                }
            }
        }
        a.NowPlaying = new function() {
            var app = this;
            app.start = function() {
                console.log('yeeee');
            };
            app.init = function() {};
        };
        a.BrowseByArtist = new function() {
            var app = this;
            var artistListContainer = '#browse-by-artist-list';
            var artistSelect = artistListContainer + ' select[name=artist]';
            var mixListContainer = '#browse-by-artist-mixes';
            var mix = mixListContainer + ' a.mix';
            app.renderMixList = function() {
                $(mixListContainer).html('').show();
                $(artistListContainer).find('h4').text($(artistSelect).val());
                var artist = c.Helpers.htmlentities($(artistSelect).val());
                $(c.MixesByArtist[artist]).each(function(i, mix) {
                    var isCurrentMix = (mix.music_id == c.Player.getCurrentMixId());
                    $(mixListContainer).append('<a href="javascript:void(0);" class="list-group-item mix default-font' + (isCurrentMix ? ' current-mix' : '') + '" data-music-id="' + mix.music_id + '"><i class="icon-' + (isCurrentMix && c.Player.isPlaying() ? 'pause' : 'play') + '"></i>&nbsp;&nbsp;&nbsp;' + mix.title + '</a>');
                });
            };
            app.selectMix = function(e) {
                var musicId = $(e.target).attr('data-music-id');
                var isCurrentMix = musicId == c.Player.getCurrentMixId();
                if (isCurrentMix) {
                    if (c.Player.isPlaying()) {
                        $(mix + '.current-mix').find('i').addClass('icon-play').removeClass('icon-pause');
                    }
                    else {
                        $(mix + '.current-mix').find('i').addClass('icon-pause').removeClass('icon-play');
                    }
                    c.Player.playPause();
                }
                else { // Play New Mix
                    $(mix).removeClass('current-mix').find('i').addClass('icon-play').removeClass('icon-pause');
                    $(e.target).addClass('current-mix').find('i').removeClass('icon-play').addClass('icon-pause');
                    c.Player.setCurrentMix(musicId, true);
                }
            };
            app.start = function() {
                $(artistListContainer).append('<select class="form-control" name="artist"><option disabled>Select Artist</option></select>').siblings('p.loading').remove();
                var i = 0;
                for (var artist in c.MixesByArtist) {
                    $(artistSelect).append('<option value="' + artist + '">' + artist + ' (' + c.MixesByArtist[artist].length + ')' + '</option>');
                    i++;
                }
                $(artistSelect).find('option[value="' + c.MixesById[c.Player.getCurrentMixId()].artist + '"]').prop('selected', true);
                app.renderMixList();
            };
            app.init = function() {
                $.get(c.API.music.getBrowseByArtistList, function(mixesByArtist) {
                    c.MixesByArtist = mixesByArtist;
                    $('[data-app=browse-by-artist] div.desktop-icon').removeClass('disabled');
                });
                $(document).on('change', artistSelect, app.renderMixList);
                $(document).on('click', mix, app.selectMix);
            };
        };
        a.SearchResults = new function() {
            var app = this;
            var id = '#search-results';
            app.start = function() {
                //c.Modal.getTitleNode().append('<span class="text-teal default-font">' + c.User.first_name + ' ' + c.User.last_name + '</span>');
            };
            app.init = function() {

            };
        };
        a.MyPlaylist = new function() {
            var app = this;
            var id = '#my-playlist';
            app.start = function() {
                //c.Modal.getTitleNode().append('<span class="text-teal default-font">' + c.User.first_name + ' ' + c.User.last_name + '</span>');
            };
            app.init = function() {

            };
        };
        a.LatestMixes = new function() {
            var app = this;
            var id = '#latest-mixes';
            var mixListContainer = '#latest-mixes-list';
            var mix = mixListContainer + ' a.mix';
            app.selectMix = function(e) {
                var musicId = $(e.target).attr('data-music-id');
                var isCurrentMix = musicId == c.Player.getCurrentMixId();
                if (isCurrentMix) {
                    if (c.Player.isPlaying()) {
                        $(mix + '.current-mix').find('i').addClass('icon-play').removeClass('icon-pause');
                    }
                    else {
                        $(mix + '.current-mix').find('i').addClass('icon-pause').removeClass('icon-play');
                    }
                    c.Player.playPause();
                }
                else { // Play New Mix
                    $(mix).removeClass('current-mix').find('i').addClass('icon-play').removeClass('icon-pause');
                    $(e.target).addClass('current-mix').find('i').removeClass('icon-play').addClass('icon-pause');
                    c.Player.setCurrentMix(musicId, true);
                }
            };
            app.start = function() {
                c.Modal.getTitleNode().find('span').after(' - <span class="default-font">' + c.MixesByDate.latest_date + '</span>');
                $(c.MixesByDate.results[c.MixesByDate.latest_date]).each(function(i, mix) {
                    var isCurrentMix = (mix.music_id == c.Player.getCurrentMixId());
                    $(mixListContainer).append('<a href="javascript:void(0);" class="list-group-item mix default-font' + (isCurrentMix ? ' current-mix' : '') + '" data-music-id="' + mix.music_id + '"><i class="icon-' + (isCurrentMix && c.Player.isPlaying() ? 'pause' : 'play') + '"></i>&nbsp;&nbsp;&nbsp;<b><span class="text-pink default-font">' + mix.artist + '</span></b> ' + mix.title + '</a>');
                });
                $(mixListContainer).show();
            };
            app.init = function() {
                $.get(c.API.music.getBrowseByDateList, function(mixesByDate) {
                    c.MixesByDate = mixesByDate;
                    $('[data-app=latest-mixes] div.desktop-icon').removeClass('disabled');
                });
                $(document).on('click', mix, app.selectMix);
            };
        };
        a.RandomMix = new function() {
            var app = this;
            var id = '';
            app.selectRandomMix = function() {
                var randomIndex = c.Helpers.getRandomInt(0, c.MixArray.length-1);
                console.log(randomIndex);
                c.Player.setCurrentMix(c.MixArray[randomIndex].music_id, true);
            };
            app.start = function() {};
            app.init = function() {};
        };
    };
    c.Modal = new function() {
        var m = this;
        var title = '#modal h4.modal-title';
        var content = '#modal div.modal-content';
        var message = '#modal div.alert';
        m.getTitleNode = function() {
            return $(title);
        };
        m.getContentNode = function() {
            return $(content);
        };
        m.hideModal = function() {
            $('#modal').modal('hide');
            $('#loading').hide();
            $(content).html('');
        };
        m.showModal = function() {
            $('#modal').modal('show');
        };
        m.hideMessage = function() {
            $(message).hide().removeClass('alert-success alert-danger').find('p').html('');
        };
        m.displayMessage = function(type, msg) {
            m.hideMessage();
            $(message).show().addClass('alert-' + type).find('p').html(msg);
        };
        m.displayTemplate = function(template, callback) {
            template = '/modals/' + template + '.tpl.php';
            if (typeof callback == 'undefined') $(content).load(template);
            else $(content).load(template, function() {
                callback();
                $('div.modal-content').fadeIn();
                $('#loading').hide();
            });
        };
        m.render = function(e) {
            var target = $(e.target).is('[data-modal]') ? $(e.target) : $(e.target).parents('[data-modal]');
            var modal = target.attr('data-modal');
            //c.Helpers.setURL(modal);
            switch (modal) {
                case 'logged-in-menu':
                    m.displayTemplate('user-menu', m.UserMenu.start);
                    break;
                case 'logged-out-menu':
                    m.displayTemplate('login', m.Login.start);
                    break;
            }
        };
        m.init = function() {
            var modal = $('#modal');
            $(document).on('click', message + ' .close', m.hideMessage);
            $(document).on('click', '[data-modal]', m.render);
            modal.on('show.bs.modal', function () {
                $('#loading').show();
            });
            modal.on('hide.bs.modal', function () {
                $('#loading').hide();
            });
            modal.on('hidden.bs.modal', function() {
                $('div.modal-content').hide();
            });
            modal.on('shown.bs.modal', function () {
                $('div.modal-content').removeClass('hidden');
            });
            for (var module in m) {
                for (var method in m[module]) {
                    if (method == 'init') {
                        m[module][method]();
                    }
                }
            }
        };
        m.Login = new function() {
            var modal = this;
            var id = '#login';
            var message   = $(id).find('div.message');
            var form      = id + ' form';
            var username  = form + ' input[name=username]';
            var password  = form + ' input[name=password]';
            modal.submitForm = function(e) {
                e.preventDefault();
                c.Modal.hideMessage();
                var POST = {
                    username : $(username).val(),
                    password : $(password).val()
                };
                var usernameExists = POST.username.length > 0;
                var passwordExists = POST.password.length > 0;
                if (!usernameExists && !passwordExists) {
                    c.Modal.displayMessage('danger', 'You must provide a username and password to login.');
                    return false;
                }
                if (POST.username.length == 0) {
                    c.Modal.displayMessage('danger', 'You must provide a username to login.');
                    return false;
                }
                if (POST.password.length == 0) {
                    c.Modal.displayMessage('danger', 'You must provide a password to login.');
                    return false;
                }
                var rememberMe = $(id).find('input[value=remember-me]').is(':checked');
                if (!rememberMe) {
                    $.cookie('username', null);
                    $.cookie('password', null);
                }
                $.post(c.API.user.login, POST, function(data) {
                    if (data.success) {
                        if (rememberMe) {
                            $.cookie('username', POST.username);
                            $.cookie('password', POST.password);
                        }
                        location.href = '/';
                    }
                    if (data.error) {
                        c.Modal.displayMessage('danger', data.error);
                    }
                })
                    .error(function() {
                        //c.Modal.displayMessage('danger', 'Unable to reach server.');
                    });
            };
            modal.start = function() {
                if ($.cookie('username') !== null && $.cookie('password') !== null) {
                    $(id).find('input[value=remember-me]').prop('checked', true);
                    $(id).find('input[name=username]').val($.cookie('username'));
                    $(id).find('input[name=password]').val($.cookie('password'));
                }
                if (c.Browser.name == 'msie' && c.Browser.version == '9.0') {
                    $(username).val('Username');
                    $(password).val('Password');
                }
            };
            modal.init = function() {
                $(document).on('submit', form, modal.submitForm);
            };
        };
        m.UserMenu = new function() {
            var modal = this;
            var id = '#user-menu';
            var logoutBtn = id + ' a.logout';
            modal.logOut = function() {
                location.href = $(logoutBtn).attr('data-href');
            };
            modal.start = function() {
                c.Modal.getTitleNode().append('<span class="text-teal default-font">' + c.User.first_name + ' ' + c.User.last_name + '</span>');
                switch (c.User.access) {
                    case 'admin':
                        c.Modal.getContentNode().find('div.modal-body').prepend('<a href="/admin" target="_blank"><button class="btn btn-primary pull-left">Admin Panel</button></a>');
                        break;
                }
            };
            modal.init = function() {
                $(document).on('click', logoutBtn, modal.logOut);
            };
        };
    };
    c.Helpers = new function() {
        var h = this;
        h.get_html_translation_table = function(table, quote_style) {
            // http://kevin.vanzonneveld.net
            // +   original by: Philip Peterson
            // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   bugfixed by: noname
            // +   bugfixed by: Alex
            // +   bugfixed by: Marco
            // +   bugfixed by: madipta
            // +   improved by: KELAN
            // +   improved by: Brett Zamir (http://brett-zamir.me)
            // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
            // +      input by: Frank Forte
            // +   bugfixed by: T.Wild
            // +      input by: Ratheous
            // %          note: It has been decided that we're not going to add global
            // %          note: dependencies to php.js, meaning the constants are not
            // %          note: real constants, but strings instead. Integers are also supported if someone
            // %          note: chooses to create the constants themselves.
            // *     example 1: get_html_translation_table('HTML_SPECIALCHARS');
            // *     returns 1: {'"': '&quot;', '&': '&amp;', '<': '&lt;', '>': '&gt;'}
            var entities = {},
                hash_map = {},
                decimal;
            var constMappingTable = {},
                constMappingQuoteStyle = {};
            var useTable = {},
                useQuoteStyle = {};

            // Translate arguments
            constMappingTable[0] = 'HTML_SPECIALCHARS';
            constMappingTable[1] = 'HTML_ENTITIES';
            constMappingQuoteStyle[0] = 'ENT_NOQUOTES';
            constMappingQuoteStyle[2] = 'ENT_COMPAT';
            constMappingQuoteStyle[3] = 'ENT_QUOTES';

            useTable = !isNaN(table) ? constMappingTable[table] : table ? table.toUpperCase() : 'HTML_SPECIALCHARS';
            useQuoteStyle = !isNaN(quote_style) ? constMappingQuoteStyle[quote_style] : quote_style ? quote_style.toUpperCase() : 'ENT_COMPAT';

            if (useTable !== 'HTML_SPECIALCHARS' && useTable !== 'HTML_ENTITIES') {
                throw new Error("Table: " + useTable + ' not supported');
                // return false;
            }

            entities['38'] = '&amp;';
            if (useTable === 'HTML_ENTITIES') {
                entities['160'] = '&nbsp;';
                entities['161'] = '&iexcl;';
                entities['162'] = '&cent;';
                entities['163'] = '&pound;';
                entities['164'] = '&curren;';
                entities['165'] = '&yen;';
                entities['166'] = '&brvbar;';
                entities['167'] = '&sect;';
                entities['168'] = '&uml;';
                entities['169'] = '&copy;';
                entities['170'] = '&ordf;';
                entities['171'] = '&laquo;';
                entities['172'] = '&not;';
                entities['173'] = '&shy;';
                entities['174'] = '&reg;';
                entities['175'] = '&macr;';
                entities['176'] = '&deg;';
                entities['177'] = '&plusmn;';
                entities['178'] = '&sup2;';
                entities['179'] = '&sup3;';
                entities['180'] = '&acute;';
                entities['181'] = '&micro;';
                entities['182'] = '&para;';
                entities['183'] = '&middot;';
                entities['184'] = '&cedil;';
                entities['185'] = '&sup1;';
                entities['186'] = '&ordm;';
                entities['187'] = '&raquo;';
                entities['188'] = '&frac14;';
                entities['189'] = '&frac12;';
                entities['190'] = '&frac34;';
                entities['191'] = '&iquest;';
                entities['192'] = '&Agrave;';
                entities['193'] = '&Aacute;';
                entities['194'] = '&Acirc;';
                entities['195'] = '&Atilde;';
                entities['196'] = '&Auml;';
                entities['197'] = '&Aring;';
                entities['198'] = '&AElig;';
                entities['199'] = '&Ccedil;';
                entities['200'] = '&Egrave;';
                entities['201'] = '&Eacute;';
                entities['202'] = '&Ecirc;';
                entities['203'] = '&Euml;';
                entities['204'] = '&Igrave;';
                entities['205'] = '&Iacute;';
                entities['206'] = '&Icirc;';
                entities['207'] = '&Iuml;';
                entities['208'] = '&ETH;';
                entities['209'] = '&Ntilde;';
                entities['210'] = '&Ograve;';
                entities['211'] = '&Oacute;';
                entities['212'] = '&Ocirc;';
                entities['213'] = '&Otilde;';
                entities['214'] = '&Ouml;';
                entities['215'] = '&times;';
                entities['216'] = '&Oslash;';
                entities['217'] = '&Ugrave;';
                entities['218'] = '&Uacute;';
                entities['219'] = '&Ucirc;';
                entities['220'] = '&Uuml;';
                entities['221'] = '&Yacute;';
                entities['222'] = '&THORN;';
                entities['223'] = '&szlig;';
                entities['224'] = '&agrave;';
                entities['225'] = '&aacute;';
                entities['226'] = '&acirc;';
                entities['227'] = '&atilde;';
                entities['228'] = '&auml;';
                entities['229'] = '&aring;';
                entities['230'] = '&aelig;';
                entities['231'] = '&ccedil;';
                entities['232'] = '&egrave;';
                entities['233'] = '&eacute;';
                entities['234'] = '&ecirc;';
                entities['235'] = '&euml;';
                entities['236'] = '&igrave;';
                entities['237'] = '&iacute;';
                entities['238'] = '&icirc;';
                entities['239'] = '&iuml;';
                entities['240'] = '&eth;';
                entities['241'] = '&ntilde;';
                entities['242'] = '&ograve;';
                entities['243'] = '&oacute;';
                entities['244'] = '&ocirc;';
                entities['245'] = '&otilde;';
                entities['246'] = '&ouml;';
                entities['247'] = '&divide;';
                entities['248'] = '&oslash;';
                entities['249'] = '&ugrave;';
                entities['250'] = '&uacute;';
                entities['251'] = '&ucirc;';
                entities['252'] = '&uuml;';
                entities['253'] = '&yacute;';
                entities['254'] = '&thorn;';
                entities['255'] = '&yuml;';
            }

            if (useQuoteStyle !== 'ENT_NOQUOTES') {
                entities['34'] = '&quot;';
            }
            if (useQuoteStyle === 'ENT_QUOTES') {
                entities['39'] = '&#39;';
            }
            entities['60'] = '&lt;';
            entities['62'] = '&gt;';


            // ascii decimals to real symbols
            for (decimal in entities) {
                if (entities.hasOwnProperty(decimal)) {
                    hash_map[String.fromCharCode(decimal)] = entities[decimal];
                }
            }

            return hash_map;
        };
        h.htmlentities = function(string, quote_style, charset, double_encode) {
            // http://kevin.vanzonneveld.net
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   improved by: nobbler
            // +    tweaked by: Jack
            // +   bugfixed by: Onno Marsman
            // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +    bugfixed by: Brett Zamir (http://brett-zamir.me)
            // +      input by: Ratheous
            // +   improved by: Rafał Kukawski (http://blog.kukawski.pl)
            // +   improved by: Dj (http://phpjs.org/functions/htmlentities:425#comment_134018)
            // -    depends on: get_html_translation_table
            // *     example 1: htmlentities('Kevin & van Zonneveld');
            // *     returns 1: 'Kevin &amp; van Zonneveld'
            // *     example 2: htmlentities("foo'bar","ENT_QUOTES");
            // *     returns 2: 'foo&#039;bar'
            var hash_map = h.get_html_translation_table('HTML_ENTITIES', quote_style),
                symbol = '';
            string = string == null ? '' : string + '';

            if (!hash_map) {
                return false;
            }

            if (quote_style && quote_style === 'ENT_QUOTES') {
                hash_map["'"] = '&#039;';
            }

            if (!!double_encode || double_encode == null) {
                for (symbol in hash_map) {
                    if (hash_map.hasOwnProperty(symbol)) {
                        string = string.split(symbol).join(hash_map[symbol]);
                    }
                }
            } else {
                string = string.replace(/([\s\S]*?)(&(?:#\d+|#x[\da-f]+|[a-zA-Z][\da-z]*);|$)/g, function (ignore, text, entity) {
                    for (symbol in hash_map) {
                        if (hash_map.hasOwnProperty(symbol)) {
                            text = text.split(symbol).join(hash_map[symbol]);
                        }
                    }

                    return text + entity;
                });
            }

            return string;
        };
        h.setURL = function(path) {
            window.history.pushState({}, '', path);
        };
        h.getRandomInt = function(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
    };
    c.Page = new function() {
        var p = this;
        p.keydown = function(e) {
            switch (e.keyCode) {
                case 27: // Escape
                    c.App.hideApp();
                    break;
            }
        };
        p.refresh = function() {
            $.cookie('current-mix-id', c.Player.getCurrentMixId());
            $.cookie('current-mix-time', c.Player.currentMix.getCurrentTime());
            $.cookie('current-mix-playing', c.Player.isPlaying());
        };
        p.init = function() {
            $(window).bind('beforeunload', p.refresh);
            $(document).on('keydown', document, p.keydown);
        };
    };
    c.Facebook = new function() {
        var f = this;
        var APIready = false;
        f.loginStatusCallback = function(e) {
            if (e.status == 'connected') {
                APIready = true;
            }
            console.log(e);
            f.fetchData();
        };
        f.fetchData = function() {
            if (!APIready) return false;
            FB.api(
                '/search?q=conference&type=event',
                'get',
                function(response) {
                    console.log(response);
                }
            );
        };
        f.init = function() {
            $.ajaxSetup({ cache: true });
            $.getScript('//connect.facebook.net/en_UK/all.js', function(){
                FB.init({appId:241415132595566});
                FB.getLoginStatus(f.loginStatusCallback);
            });
        };
    };
    c.init = function() {
        c.isLoggedIn = $('#is-logged-in').length > 0;
        if (c.isLoggedIn) {
            $('#is-logged-in').remove();
            $.get(c.API.user.getUser, function(user) {
                c.User = user;
            });
        }
        c.Browser = {
            name: body.attr('data-browser'),
            platform: body.attr('data-platform'),
            version: body.attr('data-version')
        };
        c.Browser.isMobile = ($.inArray(c.Browser.platform, ['android', 'ipad', 'iphone']) != -1);
        c.Facebook.init();
        c.Search.init();
        c.Player.init();
        c.Slideshow.init();
        c.Modal.init();
        c.App.init();
        c.Page.init();
    };
};
$(cake.init);