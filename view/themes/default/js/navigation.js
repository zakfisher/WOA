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
     >> loadPage
     >> updateSession
     >> setEnv

 * - View
     >> requestPage
     >> requestSubPage
     >> showPage
     >> initSubPage
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
      /*************************************************************
       * Method - loadPage()
       *
       *    Refresh #container HTML with new view
       *************************************************************/
      loadPage : function()
      {
         // Load View
         $('#main-content').before(WOA.static.loading).load(WOA.static.env + 'view/themes/' + WOA.static.theme + '/templates/pages/' + WOA.static.page + '.php', WOA.navigation.view.showPage);
      },

      /*************************************************************
       * Method - updateSession()
       *
       *    Update $_SESSION['page'] on AJAX page change
       *************************************************************/
      updateSession : function()
      {
         var data = { page : WOA.static.page };
         if (typeof WOA.static.sub_page == 'undefined' && WOA.static.sub_page == null) { data.sub_page = WOA.static.sub_page; }
         $.post(WOA.static.env + 'navigation/update_session_page', data);
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
         WOA.static.env = system;
      }
   },
   view :
   {
      /*************************************************************
       * Method - requestPage(e)
       *
       *    Trigger new page load
       *************************************************************/
      requestPage : function(e)
      {
         // Highlight Active Page Link
         $('li.page-link').removeClass('active');
         $('li.page-link[data-page=' + $(e.target).attr('data-page') + ']').addClass('active');

         if (WOA.static.page != $(e.target).attr('data-page'))
         {
            // Update Nav Links
            WOA.static.page = $(e.target).attr('data-page');

            // Check for sub-page
            var subPage = (WOA.static.sub_page != null && $.inArray(WOA.static.sub_page, WOA.static.user_pages[WOA.static.page]) != -1) ? '+' + WOA.static.sub_page : '';
            location.hash = '!/' + WOA.static.page + subPage;

            // Scroll to top
            $('body,html').animate({ scrollTop: 0 }, 800);

            // Update DOM & Load Page
            var callback = function() {
               // Load Page
               WOA.navigation.model.loadPage();

               // Update #container attributes
               $('#container').attr('data-page', WOA.static.page);
            };
            setTimeout(callback, 300);

            // Trigger Animation
            $('#main-content, div.container').fadeTo(300, 0);
         }
      },

      /*************************************************************
       * Method - requestSubPage(e)
       *
       *    Trigger sub page load
       *************************************************************/
      requestSubPage : function(e)
      {
         $('div.content.left ul.sub-nav li.active').removeClass('active');
         $(e.target).addClass('active');

         if (WOA.static.sub_page != $(e.target).attr('data-sub-page'))
         {
            // Update Nav Links
            WOA.static.sub_page = $(e.target).attr('data-sub-page');

            // Add sub-page to URL
            var subPage = (WOA.static.sub_page != null && $.inArray(WOA.static.sub_page, WOA.static.user_pages[WOA.static.page]) != -1) ? '+' + WOA.static.sub_page : '';
            location.hash = '!/' + WOA.static.page + subPage;

            // Update User Cookie
            var data = $.parseJSON($.cookie('user'));
            data.sub_page = WOA.static.sub_page;
            $.cookie('user', JSON.stringify(data));

            $('div.content.right').load('view/themes/default/templates/pages/' + WOA.static.page + '/' + WOA.static.sub_page + '.php', WOA.navigation.view.initSubPage);

            window.scrollTo(0, 0);

            WOA.navigation.model.updateSession();
         }
      },

      /*************************************************************
       * Method - showPage()
       *
       *    Show page after load
       *************************************************************/
      showPage : function()
      {
         // If page contains sub-page, load it
         if (WOA.static.sub_page != null)
         {
            // Check for User Pages
            if ($.inArray(WOA.static.sub_page, WOA.static.user_pages[WOA.static.page]) != -1) {
               $.get('user/login_check', function(data) {
                  // Logged In
                  if (data == 'true') {
                     $('div.content.right').load('view/themes/default/templates/pages/' + WOA.static.page + '/' + WOA.static.sub_page + '.php', WOA.navigation.view.initSubPage);
                  }
                  // Not Logged In
                  else { $('#logo div.sprite').click(); }
               }).error(function() { $('#logo div.sprite').click(); });
            }
            // Non-user pages
            else if ($.inArray(WOA.static.sub_page, WOA.static.public_pages[WOA.static.page]) != -1)
            {
               $('div.content.right').load('view/themes/default/templates/pages/' + WOA.static.page + '/' + WOA.static.sub_page + '.php', WOA.navigation.view.initSubPage);
            }
         }

         // Show Page
         var revealPage = function()
         {
            $('#loading').remove();

            var content = '#main-content';
            content += (WOA.static.page != 'home') ? ', div.container' : '';
            $(content).fadeTo(300, 1);
         }

         setTimeout(revealPage, 700);

         if (WOA.static.page != 'dashboard') { $('li.page-link[data-page=' + WOA.static.page + ']').addClass('active'); }

         // Update Session
         WOA.navigation.model.updateSession();
      },

      /*************************************************************
       * Method - initSubPage()
       *
       *    Show sub page content
       *************************************************************/
      initSubPage : function()
      {
         if (WOA.static.page == 'dashboard')
         {
            var page = WOA.static.sub_page.substr(0, 1).toUpperCase() + WOA.static.sub_page.substr(1);
            if (WOA.pages.hasOwnProperty(page)) { eval("WOA.pages." + page + ".view.loadPage();"); }
         }
      },

      /*************************************************************
       * Method - triggerPageRequest()
       *
       *    Trigger page request from nav bar
       *************************************************************/
      triggerPageRequest : function(e)
      {
         $('li.page-link').removeClass('active');
         var target = ($(e.target).is('li.page-link')) ? $(e.target) : $(e.target).parents('li.page-link');
         var page = target.attr('data-page');
         $('a[data-page=' + page + ']').click();
      },

      /*************************************************************
       * Method - hashBangRedirect()
       *
       *    Redirect from #!
       *************************************************************/
      hashBangRedirect : function()
      {
         // Refresh Session & User Cache
         WOA.user.model.refreshUser();

         var url = window.location.href.split("/");
         var page = url[url.length - 1];

         // Check for sub-pages
         if (page.indexOf("+") != -1)
         {
            var params = page.split("+");
            page = params[0];
            WOA.static.sub_page = params[1];
         }

         // Check for #! in URL AND if page link exists
         var redirect = ($.inArray('#!', url) && $('a[data-page=' + page + ']').length > 0) ? true : false;

         var target = (redirect) ? 'a[data-page=' + page + ']' : '#logo div.sprite';

         // Check for User Pages
         if ($.inArray(page, WOA.static.user_pages) != -1)
         {
            // Check if logged in
            if ($.cookie('user') != null)
            {
               $.get('user/login_check', function(data) {
                  target = (data != 'true') ? '#logo div.sprite' : target;
                  $(target).click();
               }).error(function() { $('#logo div.sprite').click(); });
            }
         }
         // Not User Page
         else { $(target).click(); }
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
         WOA.static.public_pages = {};
         WOA.static.public_pages.music = [];
         WOA.static.public_pages.about = [];
         WOA.static.public_pages.contact = [];
         WOA.static.user_pages = {};
         WOA.static.user_pages.dashboard = ['updates', 'projects', 'contacts', 'site-emails', 'settings', 'admin'];
         WOA.static.user_pages.projects = ['overview', 'updates', 'biz-plan', 'contracts', 'partners'];

         /** Handlers **/

         // Request Page
         $(document).on('click', '#logo div.sprite, a[data-page]', WOA.navigation.view.requestPage);
         $(document).on('click', 'ul.sub-pages li.page-link', WOA.navigation.view.triggerPageRequest);

         // Request Sub-page
         $(document).on('click', 'div.content.left ul.sub-nav li', WOA.navigation.view.requestSubPage);

         /** Behaviors **/

         // Set Global Environment
         WOA.navigation.model.setEnv();

         // Redirect by #! (on load)
         WOA.navigation.view.hashBangRedirect();

         // Init Sub Page
         if (WOA.static.page != 'home') { setTimeout(WOA.navigation.view.initSubPage, 2000); }

         // Redirect by #! (back/forward buttons)
         $(window).bind('hashchange', WOA.navigation.view.hashBangRedirect);
      }
   }
};

// Initialize Instance
WOA.navigation.controller.init();