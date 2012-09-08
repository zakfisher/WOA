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
     >> showSubNav
     >> hideSubNav
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
      /*************************************************************
       * Method - loadPage(theme, page)
       *
       *    Refresh #container HTML with new view
       *************************************************************/
      loadPage : function(theme, page)
      {
         // Load View
         $('#main-content').before(WOA.static.loading).addClass('hidden').load('view/themes/' + WOA.static.theme + '/templates/pages/' + WOA.static.page + '.php', WOA.navigation.view.showPage);
      },

      /*************************************************************
       * Method - updateSession()
       *
       *    Update $_SESSION['page'] on AJAX page change
       *************************************************************/
      updateSession : function()
      {
         $.post('navigation/update_session_page', { page : WOA.static.page });
      }
   },
   view :
   {
      /*************************************************************
       * Method - showSubNav(e)
       *
       *    Display Sub Navigation
       *************************************************************/
      showSubNav : function(e)
      {
         if ($(e.target).attr('id') == 'show-login-modal')
         {
            WOA.navigation.view.hideSubNav();
         }
         else
         {
            if (!$('#sub-nav').hasClass('active'))
            {
               $('#sub-nav').addClass('active').animate({ height : '32px' }, 150);
               $('#sub-nav ul[data-page=' + $(e.target).attr('data-page') + ']').removeClass('hidden');
            }
            else
            {
               $('#sub-nav ul').addClass('hidden');
               $('#sub-nav ul[data-page=' + $(e.target).attr('data-page') + ']').removeClass('hidden');
            }
         }
      },

      /*************************************************************
       * Method - hideSubNav()
       *
       *    Hide Sub Navigation
       *************************************************************/
      hideSubNav : function()
      {
         $('#sub-nav').animate({ height : '0px' }, 200, function() {
            $('#sub-nav').removeClass('active');
            $('#sub-nav ul').addClass('hidden');
         });
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
            // Hide Sub Nav
            WOA.navigation.view.hideSubNav();

            // Update Nav Links
            WOA.static.page = $(e.target).attr('data-page');
            $('#navigation ul li a').removeClass('active');
            $('#navigation ul li a[data-page=' + WOA.static.page + ']').addClass('active');
            location.hash = '!/' + WOA.static.page;

            $('#main-content, #footer, #footer-bg').fadeOut('normal',
               function()
               {
                  // Resize Header for Page Transition
                  $('#header').addClass('transition');

                  // Load Page
                  WOA.navigation.model.loadPage();

                  // Update #container attributes
                  $('#container').removeAttr('class').addClass(WOA.static.page).attr('data-page', WOA.static.page);

                  // Update Session
                  WOA.navigation.model.updateSession();
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
         setTimeout("$('#loading').remove();$('#main-content, #footer, #footer-bg').fadeIn('normal').removeClass('hidden');$('#header').removeClass('transition');WOA.navigation.view.adjustFooterPosition();", 700);
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
            if (v == '#!' && $('#navigation li a[data-page=' + page + ']').length > 0)
            {
               redirect = true;
               return false;
            }
         });

         var target = (redirect) ? '#navigation li a[data-page=' + page + ']' : '#logo img';
         $(target).click();
      },

      /*************************************************************
       * Method - adjustFooterPosition()
       *
       *    Position #footer-bg (for zooming out)
       *************************************************************/
      adjustFooterPosition : function()
      {
         $('#footer-bg').css('top', ($('#container').height() - $('#footer').height() ) + 'px');
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
         $(document).on('click', '#navigation ul li a:not(#show-login-modal), #logo img', WOA.navigation.view.requestPage);

         // Show Sub Nav
         $(document).on('mouseover', '#navigation ul.main li a', WOA.navigation.view.showSubNav);

         // Hide Sub Nav
         $(document).on('mouseleave', '#navigation', WOA.navigation.view.hideSubNav);

         /** Behaviors **/

         // Redirect by #! (on load)
         WOA.navigation.view.hashBangRedirect();

         // Adjust Footer BG Position
         WOA.navigation.view.adjustFooterPosition();

         // Redirect by #! (back/forward buttons)
         $(window).bind('hashchange', WOA.navigation.view.hashBangRedirect);
      }
   }
};

// Initialize Instance
WOA.navigation.controller.init();