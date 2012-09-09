/*********************************************
 * WOA Navigation Class
 *
 * Desc:  Javascript Navigation Object
 *
 * Creator: Zachary Fisher - zfisher@worldofanarchy.com
 *
 * Copyright (c) Anarchy Productions International LLC, 2012
 *
 * Search Keys:
 * - Model
     >> login
         >> authenticateUser
     >> loadPage
     >> updateSession
     >> resetUserData
     >> setUserCache
     >> deleteUserCache
     >> checkUserCredentials
     >> setEnv
 * - View
     >> login
         >> PWInputFocus
         >> PWInputBlur
         >> UNInputFocus
         >> UNInputBlur
         >> submitUserInput
         >> postSuccess
         >> postFail
     >> requestPage
     >> showPage
     >> hashBangRedirect
 * - Controller
     >> Init Global Variables
     >> Handlers
     >> Behaviors
 *********************************************/
WOA.navigation =
{
   model :
   {
      login : {
         /*************************************************************
          * Method - authenticateUser(data)
          *
          *    Refresh #container HTML with new view
          *************************************************************/
         authenticateUser : function(data)
         {
            $.post(WOA.static.env + 'user/submit_login_form', data, WOA.navigation.view.login.postSuccess, 'json').error(WOA.navigation.view.login.postFail);
         }
      },

      /*************************************************************
       * Method - loadPage()
       *
       *    Refresh #container HTML with new view
       *************************************************************/
      loadPage : function()
      {
         // Load View
         $('#main-content').before(WOA.static.loading).addClass('hidden').load(WOA.static.env + 'view/themes/' + WOA.static.theme + '/templates/pages/' + WOA.static.page + '.php', WOA.navigation.view.showPage);
      },

      /*************************************************************
       * Method - updateSession()
       *
       *    Update $_SESSION['page'] on AJAX page change
       *************************************************************/
      updateSession : function()
      {
         $.post(WOA.static.env + 'navigation/update_session_page', { page : WOA.static.page });
      },

      /*************************************************************
       * Method - resetUserData()
       *
       *    Resets User Cookie with accurate data (security precaution)
       *    - Also caches user data
       *************************************************************/
      resetUserData : function()
      {
         if ($.cookie('user') != null)
         {
            var data = $.parseJSON($.cookie('user'));

            // Fetch user data
            $.post(WOA.static.env + 'user/restore_user_data', data,
               function(data) {
                  WOA.navigation.model.setUserCache(data);
               }, 'json'
            ).error(function() { alert('user not updated'); });
         }
      },

      /*************************************************************
       * Method - setUserCache()
       *
       *    Create User Cookie (to expire in one hour)
       *************************************************************/
      setUserCache : function(data)
      {
         var now = new Date();
         var oneHourFromNow = now + 6000;
         $.cookie('user', JSON.stringify(data.user), { expires : oneHourFromNow });
         WOA.static.user = $.parseJSON($.cookie('user'));
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
      },

      /*************************************************************
       * Method - checkUserCredentials()
       *
       *    Check for login & access level
       *************************************************************/
      checkUserCredentials : function()
      {
         // Logged In
         if ($.cookie('user') != null)
         {
            var data = $.parseJSON($.cookie('user'));
            return {
               loggedIn : true,
               access : data.access
            };
         }

         // Not Logged In
         else
         {
            return { loggedIn : false };
         }
      },

      /*************************************************************
       * Method - setEnv()
       *
       *    Store site environment
       *************************************************************/
      setEnv : function()
      {
         var env = window.location.pathname.split("/");
         var system = (env[1] == 'dev') ? '/dev/' : '/';
         WOA.static.env = window.location.origin + system;
      }
   },
   view :
   {
      login : {
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
          * Method - submitUserInput(e)
          *
          *    Prep user input for login submission
          *************************************************************/
         submitUserInput : function(e)
         {
            if (!$(e.target).hasClass('disabled'))
            {
               $(e.target).addClass('disabled');

               // validate input

               var data = {
                  un : $('#login-form input[name=un]').val(),
                  pw : $('#login-form input[name=pw]').val()
               };

               WOA.navigation.model.login.authenticateUser(data);
            }
         },

         /*************************************************************
          * Method - postSuccess()
          *
          *    POST response successful
          *************************************************************/
         postSuccess : function(data)
         {
            // User authenticated
            if (data.response == 'true' && typeof data.user == 'object')
            {
               WOA.navigation.model.setUserCache(data);
               $('#login-form div.btn.login').removeClass('disabled');
               $('#login-form').parent().hide();
               $('a[data-page=dashboard]').click();
            }

            // User NOT authenticated
            else
            {
               WOA.navigation.view.login.postFail();
            }
         },

         /*************************************************************
          * Method - postFail()
          *
          *    POST response unsuccessful
          *************************************************************/
         postFail : function()
         {
            WOA.navigation.model.deleteUserCache();
            $('#login-form div.btn.login').removeClass('disabled');
         }
      },

      /*************************************************************
       * Method - requestPage(e)
       *
       *    Trigger new page load
       *************************************************************/
      requestPage : function(e)
      {
         if (WOA.static.page != $(e.target).attr('data-page'))
         {
            // Update Nav Links
            WOA.static.page = $(e.target).attr('data-page');
            location.hash = '!/' + WOA.static.page;

            $('#main-content, #footer').fadeOut('normal',
               function()
               {
                  // Load Page
                  WOA.navigation.model.loadPage();

                  // Update #container attributes
                  $('#container').attr('data-page', WOA.static.page);
               }
            );
         }
      },

      /*************************************************************
       * Method - showPage()
       *
       *    Show page after load
       *************************************************************/
      showPage : function()
      {
         // Show Page
         setTimeout("$('#loading').remove();$('#main-content, #footer').fadeIn('normal').removeClass('hidden');", 700);

         // Update Session
         WOA.navigation.model.updateSession();
      },

      /*************************************************************
       * Method - hashBangRedirect()
       *
       *    Redirect from #!
       *************************************************************/
      hashBangRedirect : function()
      {
         var url = window.location.href.split("/");
         var redirect = false;
         var page = url[url.length - 1];
         $(url).each(function(i, v) {
            if (v == '#!' && $('a[data-page=' + page + ']').length > 0)
            {
               redirect = true;
               return false;
            }
         });

         // Check for secure pages
         WOA.navigation.model.resetUserData();
         var target = (redirect) ? 'a[data-page=' + page + ']' : '#logo img';
         switch (page)
         {
            case 'dashboard':
               // Check if logged in
               var data = WOA.navigation.model.checkUserCredentials();
               target = (data.loggedIn == false) ? '#logo img' : target;
               //console.log(data);
               break;
            default:
               $(target).click();
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
         /** Init Global Variables **/
         WOA.static.page = $('#container').attr('data-page');
         WOA.static.theme = $('#container').attr('data-theme');
         WOA.static.loading = '<img id="loading" src="view/themes/' + WOA.static.theme + '/img/global/loading.gif" />';

         /** Handlers **/

         // Highlight Current Page Nav
         $(document).on('click', '#logo div.sprite, a[data-page]', WOA.navigation.view.requestPage);

         // Focus on PW (login input)
         $(document).on('focus', '#login-form input[name=pw-fake]', WOA.navigation.view.login.PWInputFocus);

         // Blur on PW (login input)
         $(document).on('blur', '#login-form input[name=pw]', WOA.navigation.view.login.PWInputBlur);

         // Focus on UN (login input)
         $(document).on('focus', '#login-form input[name=un]', WOA.navigation.view.login.UNInputFocus);

         // Blur on UN (login input)
         $(document).on('blur', '#login-form input[name=un]', WOA.navigation.view.login.UNInputBlur);

         // Submit Login Credentials
         $(document).on('click', '#login-form div.btn.login', WOA.navigation.view.login.submitUserInput);

         /** Behaviors **/

         // Set Global Environment
         WOA.navigation.model.setEnv();

         // Refresh User Data (for security)
         WOA.navigation.model.resetUserData();

         // Redirect by #! (on load)
         WOA.navigation.view.hashBangRedirect();

         // Redirect by #! (back/forward buttons)
         $(window).bind('hashchange', WOA.navigation.view.hashBangRedirect);
      }
   }
};

// Initialize Instance
WOA.navigation.controller.init();