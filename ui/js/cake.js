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
                c.Modal.displayMessage('danger', 'Unable to reach server.');
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
            app.init = function() {
                var listContainer = '#browse-by-artist-list';
                var makeSection = function(idx, artist, list) {
                    var section = '';
                    section += '<div class="panel panel-default">';
                    section += '<a class="accordion-toggle" data-toggle="collapse" href="#section-' + idx + '">';
                        section += '<div class="panel-heading">';
                            section += '<h4 class="panel-title">' + artist + ' (' + list.length + ')' + '</h4>';
                        section += '</div>';
                    section += '</a>';
                    section += '<div id="section-' + idx + '" class="panel-collapse collapse">';
                    section += '<div class="list-group">';
                    for (var track in list) {
                        section += '<a href="javascript:void(0);" class="list-group-item">' + list[track].title + '</a>';
                    }
                    section += '</div>';
                    section += '</div>';
                    section += '</div>';
                    return section;
                };
                $.get(c.API.music.getBrowseByArtistList, function(data) {
                    $(listContainer).siblings('p.loading').remove();
                    var i = 0;
                    for (var artist in data) {
                        var section = makeSection(i, artist, data[artist]);
                        $(listContainer).append(section);
                        i++;
                    }
                });
            };
        };
    };
    c.Modal = new function() {
        var m = this;
        var title = '#modal h4.modal-title';
        var content = '#modal div.modal-content';
        var message = '#modal div.alert';
        m.hideMessage = function() {
            $(message).hide().removeClass('alert-success alert-danger').find('p').html('');
        };
        m.displayMessage = function(type, msg) {
            m.hideMessage();
            $(message).show().addClass('alert-' + type).find('p').html(msg);
        };
        m.displayTemplate = function(template, callback) {
            template = '/public/templates/modals/' + template + '.tpl.php';
            if (typeof callback == 'undefined') $(content).load(template);
            else $(content).load(template, callback);
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
                        m.displayTemplate('browse-by-artist', c.App.BrowseByArtist.init);
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
        c.Search.init();
        c.Player.init();
        c.Slideshow.init();
        c.Modal.init();
    }
};
$(cake.init);