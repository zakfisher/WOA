/* * * * * * * * * * * * * * * * * * * * * * * * *
 * WOA Admin Namespace
 *
 * Author: Zachary Fisher - zfisher@zfidesign.com
 * * * * * * * * * * * * * * * * * * * * * * * * */
cake = new function() {
    var c = this;

    c.Login = function(id) {
        var module = this;
        var config = {
            ajaxURL : '../api/user/login/'
        };
        var submitForm = function(e) {
            e.preventDefault();
            var POST = {
                username : $(module.username).val(),
                password : $(module.password).val()
            };
            var usernameExists = POST.username.length > 0;
            var passwordExists = POST.password.length > 0;
            if (!usernameExists && !passwordExists) {
                alert('You must provide a username and password to login.');
                return false;
            }
            if (POST.username.length == 0) {
                alert('You must provide a username to login.');
                return false;
            }
            if (POST.password.length == 0) {
                alert('You must provide a password to login.');
                return false;
            }
            $.post(config.ajaxURL, POST, function(data) {
                if (data.success) {
                    console.log(data.success);
                    location.href = '/admin';
                }
                if (data.error) {
                    console.log(data.error);
                }
            })
                .error(function() {
                    console.log('Unable to reach server.');
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
            if ($('body').attr('data-browser') == 'msie' && $('body').attr('data-version') == '9.0') {
                $(module.username).val('Apple ID');
                $(module.password).val('Password');
            }
        };
    };

    $(".collapse").collapse({toggle:true});

    var login = new c.Login('#login');
    login.init();

};