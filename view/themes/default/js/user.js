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
     >> deleteUserCache
     >> loginCheck

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
         $.post(WOA.static.env + 'user/submit_login_form', data, WOA.user.view.loginSuccess, 'json').error(WOA.user.view.loginFail);
      },

      logout : function()
      {
         // Hide logged in nav, show default nav
         var resetNav = function() {
            $('#navigation div.right div.link.sign-out').addClass('hidden');
            $('#navigation div.right div.link.sign-in').removeClass('hidden');
            $('a.username').fadeOut('normal');
         };

         setTimeout(resetNav, 3000);

         // Redirect to home page
         $('#logo div.sprite').click();

         // Hide Username
         $('a.username').text('Logging Out...').removeAttr('data-page').addClass('log-out');

         // Clear User Cookie
         WOA.user.model.deleteUserCache();

         // Update Session
         $.get(WOA.static.env + 'user/log_out');
      },

      /*************************************************************
       * Method - refreshUser()
       *
       *    Restores User Session (session is destroyed on page load)
       *************************************************************/
      refreshUser : function()
      {
         if ($.cookie('user') != null)
         {
            var data = $.parseJSON($.cookie('user'));

            // Fetch user data
            $.post(WOA.static.env + 'user/refresh_user_session', data, WOA.user.model.setUserCache, 'json');
         }
      },

      /*************************************************************
       * Method - setUserCache()
       *
       *    Create User Cookie (to expire in one hour)
       *************************************************************/
      setUserCache : function(data)
      {
         // Reset Cache
         WOA.user.model.deleteUserCache();

         var now = new Date();
         var oneHourFromNow = now.getTime() + 3600000;
         var expiration = new Date(oneHourFromNow);
         $.cookie('user', JSON.stringify(data.user), { expires : expiration });
         WOA.static.user = data.user;
         delete WOA.static.user.access;
      },

      /*************************************************************
       * Method - deleteUserCache()
       *
       *    Delete User Cookie
       *************************************************************/
      deleteUserCache : function()
      {
         $.cookie('user', null);
         delete WOA.static.user;
      },

      /*************************************************************
       * Method - loginCheck()
       *
       *    Check for login
       *************************************************************/
      loginCheck : function()
      {
         // Logged In
         if ($.cookie('user') != null)
         {
            /*
             NEED TO MAKE THIS MORE SECURE
             */
            return 'true';
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
         var button = $('#login-form div.btn.login');
         if (!button.hasClass('disabled'))
         {
            button.addClass('disabled');

            // validate input

            var data = {
               un : $('#login-form input[name=un]').val(),
               pw : $('#login-form input[name=pw]').val()
            };

            WOA.user.model.authenticateUser(data);
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
            $('#login-form div.btn.login').removeClass('disabled');
            $('#login-form input').blur();

            // Show Username
            $('a.username').attr('data-page', 'dashboard').removeClass('log-out').text(WOA.static.user.username).fadeIn();

            // Redirect to Dashboard
            $('a[data-page=dashboard]').click();

            // Hide default nav, show logged in nav
            $('#navigation div.right div.link.sign-in').addClass('hidden');
            $('#navigation div.right div.link.sign-out').removeClass('hidden');

            // Replace Form Values
            $('#login-form input[name=pw]').val('').hide();
            $('#login-form input[name=un]').val('username');
            $('#login-form input[name=pw-fake]').val('password').show();
         }

         // User NOT authenticated
         else
         {
            WOA.user.view.loginFail();
         }
      },

      /*************************************************************
       * Method - loginFail()
       *
       *    POST response unsuccessful
       *************************************************************/
      loginFail : function()
      {
         WOA.user.model.deleteUserCache();
         $('#login-form div.btn.login').removeClass('disabled');

         // Append Error Message
         $('#login-form p.error').text('Wrong un/pw');
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

         // Log Out
         $(document).on('click', '#navigation div.right div.link.sign-out, #navigation div.right div.link.sign-out p', WOA.user.model.logout);
      }
   }
};

// Initialize Instance
WOA.user.controller.init();