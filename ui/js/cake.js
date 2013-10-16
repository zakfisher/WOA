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
            getBrowseByArtistList : '/api/music/getBrowseByArtistList/'
        },
        user : {
            getUser: '/api/user/getUser/',
            login: '/api/user/login/'
        }
    };
    c.Login = function(id) {
        var module = this;
        var submitForm = function(e) {
            e.preventDefault();
            c.Modal.hideMessage();
            var POST = {
                username : $(module.username).val(),
                password : $(module.password).val()
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
            $.post(c.API.user.login, POST, function(data) {
                if (data.success) {
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
        module.init = function(opts) {
            if (typeof opts !== 'undefined') $.extend(config, opts);
            module.message   = $(id).find('div.message');
            module.form      = id + ' form';
            module.username  = module.form + ' input[name=username]';
            module.password  = module.form + ' input[name=password]';
            module.submitBtn = module.form + ' input[name=submit]';
            $(document).on('submit', module.form, submitForm);
            $(id).data('login', module);
            if (c.Browser.name == 'msie' && c.Browser.version == '9.0') {
                $(module.username).val('Apple ID');
                $(module.password).val('Password');
            }
        };
    };
    c.Search = new function() {
        var n = this;
        var page = '.page';
        var navbarBtn       = '.navbar-header button';
        var toggleSearchBtn = '.toggle-search-bar';
        n.toggleDisplay = function() {
            $(navbarBtn).click();
            var icon = $(toggleSearchBtn).find('i');
            if (icon.is('.icon-chevron-up')) {
                icon.removeClass('icon-chevron-up').addClass('icon-chevron-down');
                $(page).animate({paddingTop:'-=50px'}, 200);
            }
            else {
                icon.addClass('icon-chevron-up').removeClass('icon-chevron-down');
                $(page).animate({paddingTop:'+=50px'}, 200);
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
            $(document).on('click', togglePlayerBtn, n.toggleDisplay);
            var player = new MediaElementPlayer('audio', {
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
            if (c.isLoggedIn) {
                $('.mejs-duration-container').after('<i class="icon-heart"></i>');
            }
//            $('.mejs-playpause-button').after('<i class="icon-fast-backward"></i><i class="icon-fast-forward"></i>');
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
        a.BrowseByArtist = new function() {
            var app = this;
            var artistListContainer = '#browse-by-artist-list';
            var artistSelect = artistListContainer + ' select[name=artist]';
            var mixListContainer = '#browse-by-artist-mixes';
            app.renderMixList = function() {
                $(mixListContainer).html('').show();
                var artist = c.Helpers.htmlentities($(artistSelect).val());
                console.log(artist);
                $(c.MixesByArtist[artist]).each(function(i, mix) {
                    $(mixListContainer).append('<a href="javascript:void(0);" class="list-group-item">' + mix.title + '</a>');
                });
            };
            app.start = function() {
                $(artistListContainer).append('<select class="form-control" name="artist"><option disabled>Select Artist</option></select>').siblings('p.loading').remove();
                var i = 0;
                for (var artist in c.MixesByArtist) {
                    $(artistSelect).append('<option value="' + artist + '">' + artist + ' (' + c.MixesByArtist[artist].length + ')' + '</option>');
                    i++;
                }
            };
            app.init = function() {
                $(document).on('change', artistSelect, app.renderMixList);
            };
        };
        a.init = function() {
            for (var module in a) {
                for (var method in a[module]) {
                    if (method == 'init') {
                        a[module][method]();
                    }
                }
            }
        }
    };
    c.Modal = new function() {
        var m = this;
        var title = '#modal h4.modal-title';
        var content = '#modal div.modal-content';
        var message = '#modal div.alert';
        m.hideModal = function() {
            $('#modal').modal('hide');
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
            $('#modal').hide();
            $(content).html('');
            template = '/apps/' + template + '.tpl.php';
            if (typeof callback == 'undefined') $(content).load(template);
            else $(content).load(template, function() {
                callback();
                $('#modal').slideDown();
            });
        };
        m.renderModalContent = function(e) {
            var target = $(e.target).is('[data-toggle=modal]') ? $(e.target) : $(e.target).parents('[data-toggle=modal]');
            var modal = target.attr('data-modal');
            var isNavMenu = target.is('[data-nav-menu]');
            var isApp = target.is('[data-app]');
            console.log(modal);
            if (isNavMenu) {
                switch (modal) {
                    case 'logged-in-menu':
                        m.displayTemplate('user-menu', function() {
                            $(title).append('<span class="text-teal">' + c.User.first_name + ' ' + c.User.last_name + '</span>');
                            switch (c.User.access) {
                                case 'admin':
                                    $(content).find('div.list-group').prepend('<a href="/admin" class="list-group-item" target="_blank">Admin Panel</a>');
                                    break;
                            }
                        });
                        break;
                    case 'logged-out-menu':
                        m.displayTemplate('login', function() {
                            var login = new c.Login('#login');
                            login.init();
                        });
                        break;
                }
            }
            if (isApp) {
                switch (modal) {
                    case 'now-playing':
                        break;
                    case 'browse-by-artist':
                        if (typeof c.MixesByArtist == 'undefined') {
                            m.hideModal();
                            return false;
                        }
                        m.displayTemplate('browse-by-artist', c.App.BrowseByArtist.start);
                        break;
                    case 'my-playlist':
                        break;
                }
            }
        };
        m.init = function() {
            $(document).on('click', '[data-toggle=modal]', m.renderModalContent);
            $(document).on('click', message + ' .close', m.hideMessage);
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
    };
    c.init = function() {
        c.isLoggedIn = $('#is-logged-in').length > 0;
        if (c.isLoggedIn) {
            $('#is-logged-in').remove();
            $.get(c.API.user.getUser, function(user) {
                c.User = user;
            });
        }
        $.get(c.API.music.getBrowseByArtistList, function(mixesByArtist) {
            c.MixesByArtist = mixesByArtist;
        });
        c.Browser = {
            name: body.attr('data-browser'),
            platform: body.attr('data-platform'),
            version: body.attr('data-version')
        };
        c.Search.init();
        c.Player.init();
        c.Slideshow.init();
        c.Modal.init();
        c.App.init();
    }
};
$(cake.init);