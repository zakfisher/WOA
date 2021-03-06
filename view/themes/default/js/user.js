/*********************************************
 * WOA User Class
 *
 * Desc:  Javascript User Object
 *
 * Creator: Zachary Fisher - zfisher@worldofanarchy.com
 *
 * Copyright (c) Anarchy Productions International LLC, 2012
 *
 * Search Keys:

 * - Model
     >> authenticateUser
     >> logout
     >> refreshUser
     >> setUserCache

 * - View
     >> PWInputFocus
     >> PWInputBlur
     >> UNInputFocus
     >> UNInputBlur
     >> submitUserInput
     >> loginSuccess
     >> loginFail

 * - Controller
     >> Handlers

 *********************************************/
WOA.user =
{
   model :
   {
      /*************************************************************
       * Method - authenticateUser(data)
       *
       *    Refresh #container HTML with new view
       *************************************************************/
      authenticateUser : function(data)
      {
         $.post('user/submit_login_form', data, WOA.user.view.loginSuccess, 'json').error(WOA.user.view.loginFail);
      },

      logout : function()
      {
         // Hide logged in nav, show default nav
         var resetNav = function() {
            var nav = $('#navigation');
            nav.find('div.right div.link.sign-out').addClass('hidden');
            nav.find('div.right div.link.sign-in').removeClass('hidden');
            $('a.username').fadeOut('normal');
         };

         setTimeout(resetNav, 2000);

         // Redirect to home page
         $('#logo div.sprite').click();

         // Hide Username
         $('a.username').text('Logging Out...').removeAttr('data-page').addClass('log-out');

         // Clear User Cache
         $.cookie('user_key', null);
         delete WOA.static.user;
         delete WOA.static.sub_page;
         delete WOA.static.list_cache;
         delete WOA.static.current_post;
         delete WOA.static.current_post_h1;
         delete WOA.static.current_post_h2;
         delete WOA.static.current_project;

         // Update Session & Delete Cache
         $.get('user/log_out');
      },

      /*************************************************************
       * Method - refreshUser()
       *
       *    Restores User Session (session is destroyed on page load)
       *************************************************************/
      refreshUser : function()
      {
         if ($.cookie('user_key') != null)
         {
            // Fetch user data
            $.post('user/refresh_user_session', { data_key : $.cookie('user_key')}, WOA.user.model.setUserCache, 'json');
         }
      },

      /*************************************************************
       * Method - setUserCache()
       *
       *    Create User Cookie (to expire in one hour)
       *************************************************************/
      setUserCache : function(data)
      {
         // Set JS User Cache
         if (typeof WOA.static.user != 'object') { WOA.static.user = {}; }
         if (data.user.username !== null) {
            WOA.static.user.username   = data.user.username;
            WOA.static.user.first_name = data.user.first_name;
            WOA.static.user.last_name  = data.user.last_name;
            WOA.static.user.email      = data.user.email;
         }
         else { WOA.user.model.logout(); }

         // Reset Cache
         if (typeof data.data_key !== 'undefined') {
             $.cookie('user_key', null);
             $.cookie('user_key', data.data_key);
         }
      }
   },
   view :
   {
      /*************************************************************
       * Method - PWInputFocus(e)
       *
       *    Show real pw input on focus
       *************************************************************/
      PWInputFocus : function(e)
      {
         $('#login-form input[name=pw]').show().focus();
         $(e.target).hide();
      },

      /*************************************************************
       * Method - PWInputBlur(e)
       *
       *    Replace fake pw input on blur (if real pw is empty)
       *************************************************************/
      PWInputBlur : function(e)
      {
         if ($(e.target).val() == '')
         {
            $('#login-form input[name=pw-fake]').show().val('password');
            $(e.target).hide();
         }
      },

      /*************************************************************
       * Method - UNInputFocus(e)
       *
       *    Clear un input val on focus
       *************************************************************/
      UNInputFocus : function(e)
      {
         if ($(e.target).val() == 'username')
         {
            $(e.target).val('');
         }
      },

      /*************************************************************
       * Method - UNInputBlur(e)
       *
       *    Replace un input val on blur (if blank)
       *************************************************************/
      UNInputBlur : function(e)
      {
         if ($(e.target).val() == '')
         {
            $(e.target).val('username');
         }
      },

      /*************************************************************
       * Method - submitUserInput()
       *
       *    Prep user input for login submission
       *************************************************************/
      submitUserInput : function()
      {
         WOA.modals.view.hideModal();
         var form = $('#login-form');
         var button = form.find('div.btn.login');
         if (!button.hasClass('disabled'))
         {
            button.addClass('disabled');

            var username = form.find('input[name=un]').val();
            var password = form.find('input[name=pw]').val();
            var emptyFields = (username == '' || username == 'username' || password == '');

            if (!emptyFields)
            {
               var data = {
                  un : username,
                  pw : password
               };

               WOA.user.model.authenticateUser(data);
            }

            else {
                form.find('p.error').text('Fill out all fields.');
               button.removeClass('disabled');
            }
         }
      },

      /*************************************************************
       * Method - loginSuccess()
       *
       *    POST response successful
       *************************************************************/
      loginSuccess : function(data)
      {
         // User authenticated
         if (data.response == 'true' && typeof data.user == 'object')
         {


            WOA.user.model.setUserCache(data);

            var form = $('#login-form');
            form.find('div.btn.login').removeClass('disabled');
            form.find('input').blur();

            // Show Username
            $('a.username').attr('data-page', 'dashboard').removeClass('log-out').text(WOA.static.user.username).fadeIn();

            // Redirect to Dashboard
            $('a[data-page=dashboard]').click();

            // Hide default nav, show logged in nav
            var nav = $('#navigation');
            nav.find('div.right div.link.sign-in').addClass('hidden');
            nav.find('div.right div.link.sign-out').removeClass('hidden');

            // Replace Form Values
            form.find('input[name=pw]').val('').hide();
            form.find('input[name=un]').val('username');
            form.find('input[name=pw-fake]').val('password').show();
         }

         // User NOT authenticated
         else { WOA.user.view.loginFail(); }
      },

      /*************************************************************
       * Method - loginFail()
       *
       *    POST response unsuccessful
       *************************************************************/
      loginFail : function()
      {
         // Delete User Key Cookie
         $.cookie('user_key', null);

         var form = $('#login-form');
         form.find('div.btn.login').removeClass('disabled');

         // Append Error Message
         form.find('p.error').text('Wrong username or password.');
      },

      /*************************************************************
       * Method - setAutoLogout()
       *
       *    Log User out after 1 hour (when cookie expires)
       *************************************************************/
      setAutoLogout: function()
      {
         if (typeof WOA.static.user != 'undefined') {
            if (typeof WOA.static.user.logout != 'undefined') { clearTimeout(WOA.static.user.logout); }
            WOA.static.user.logout = setTimeout(WOA.user.model.logout, 3600000);
         }
      }
   },
   controller :
   {
      /*************************************************************
       * Init Method
       *************************************************************/
      init : function()
      {
         /** Handlers **/
         // Focus on PW (login input)
         $(document).on('focus', '#login-form input[name=pw-fake]', WOA.user.view.PWInputFocus);

         // Blur on PW (login input)
         $(document).on('blur', '#login-form input[name=pw]', WOA.user.view.PWInputBlur);

         // Focus on UN (login input)
         $(document).on('focus', '#login-form input[name=un]', WOA.user.view.UNInputFocus);

         // Clear login error msg
         $(document).on('focus', '#login-form input', function() { $('#login-form p.error').text(''); });

         // Blur on UN (login input)
         $(document).on('blur', '#login-form input[name=un]', WOA.user.view.UNInputBlur);

         // Submit Login Credentials
         $(document).on('click', '#login-form div.btn.login', WOA.user.view.submitUserInput);
         $(document).on('keydown', '#login-form input:focus', function(e) { $('#login-form p.error').text(''); if (e.keyCode == 13) { WOA.user.view.submitUserInput(); } });

         // Set Automatic Logout
         //$(document).on('mousemove', 'body', WOA.user.view.setAutoLogout);

         // Log Out
         $(document).on('click', '#navigation div.right div.link.sign-out, #navigation div.right div.link.sign-out p', WOA.user.model.logout);
      }
   }
};

// Initialize Instance
WOA.user.controller.init();