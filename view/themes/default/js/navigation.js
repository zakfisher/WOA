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
 * - View
     >> requestPage
     >> requestSubPage
     >> showPage
     >> hashBangRedirects
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
         $('#main-content').before(WOA.static.loading).load('view/themes/' + WOA.static.theme + '/templates/pages/' + WOA.static.page + '.php', WOA.navigation.view.showPage);
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
         $.post('navigation/update_session_page', data);
      }
   },
   view :
   {
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
       * Method - requestPage(e)
       *
       *    Trigger new page load
       *************************************************************/
      requestPage : function(e)
      {
         // Hide Modal
         $('div.modal-parent').remove();

         // Highlight Active Page Link
         $('li.page-link').removeClass('active');
         $('li.page-link[data-page=' + $(e.target).attr('data-page') + ']').addClass('active');

         // Page triggered from user click
         if (WOA.static.page != $(e.target).attr('data-page'))
         {
            // Update Nav Links
            WOA.static.page = $(e.target).attr('data-page');

            location.hash = '!/' + WOA.static.page;

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

         WOA.navigation.view.initPage();
      },

      /*************************************************************
       * Method - showPage()
       *
       *    Show page after load
       *************************************************************/
      showPage : function()
      {
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
       * Method - requestSubPage(e)
       *
       *    Trigger sub page load
       *************************************************************/
      requestSubPage : function(e)
      {
         // Only do this for parent pages (dashboard, music, etc.)
         // Ignore sub pages (single project, etc.)
         if ($('span.sub-page-nav').hasClass('hidden')) {
            $('div.content.left ul.sub-nav li.active').removeClass('active');
            $(e.target).addClass('active');

            if (WOA.static.sub_page != $(e.target).attr('data-sub-page'))
            {
               // Update Nav Links
               WOA.static.sub_page = $(e.target).attr('data-sub-page');

               // Render Template
               Handlebars.renderTemplate('template-sub-page-wrapper', WOA.static[WOA.static.page][WOA.static.sub_page], 'div.content.right');

               // Update Session
               WOA.navigation.model.updateSession();
            }

            if ($('div.page-loading').length > 0) { WOA.navigation.view.initSubPage(); }
         }
      },

      /*************************************************************
       * Method - initPage()
       *
       *    Initialize Page
       *************************************************************/
      initPage : function()
      {
         var page = WOA.static.page.substr(0, 1).toUpperCase() + WOA.static.page.substr(1);
         var int = setInterval(function() {
            var showPage = function()
            {
               eval("WOA.pages." + page + ".view.loadPage();");
               clearInterval(int);
            };
            if (WOA.pages.hasOwnProperty(page)) {
               if ($('div.content-loading').length > 0) { showPage(); }
               else if ($('div.page-loading').length > 0) { showPage(); }
            }
         }, 300);
      },

      /*************************************************************
       * Method - initSubPage()
       *
       *    Initialize Sub Page
       *************************************************************/
      initSubPage : function()
      {
         var page = WOA.static.sub_page.substr(0, 1).toUpperCase() + WOA.static.sub_page.substr(1);
         if (WOA.pages.hasOwnProperty(page)) { eval("WOA.pages." + page + ".view.loadPage();"); }
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
         var idx = $.inArray('#!', url) ? (url.indexOf("#!") + 1) : (url.length - 1);
         var page = url[idx];
         page = (page == 'http:') ? 'home' : page;

         // Check for #! in URL AND if page link exists
         var redirect = ($.inArray('#!', url) && $('a[data-page=' + page + ']').length > 0) ? true : false;

         var target = (redirect) ? 'a[data-page=' + page + ']' : '#logo div.sprite';

         // Check for User Pages
         if (page == 'dashboard')
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

         /** Handlers **/

         // Request Page
         $(document).on('click', '#logo div.sprite, a[data-page]', WOA.navigation.view.requestPage);
         $(document).on('click', 'ul.sub-pages li.page-link', WOA.navigation.view.triggerPageRequest);

         // Request Sub-page
         $(document).on('click', 'div.content.left ul.sub-nav li', WOA.navigation.view.requestSubPage);

         /** Behaviors **/

         // Redirect by #! (on load)
         WOA.navigation.view.hashBangRedirect();

         // Redirect by #! (back/forward buttons)
         $(window).bind('hashchange', WOA.navigation.view.hashBangRedirect);
      }
   }
};

// Initialize Instance
WOA.navigation.controller.init();