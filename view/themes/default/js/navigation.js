/*********************************************
 * UpMo Navigation Class
 *
 * Desc:  Javascript Navigation Object
 *
 * Creator: Zachary Fisher - zach@upmo.com
 *
 * Copyright (c) Upwardly Mobile, Inc., 2012
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
UpMo.navigation =
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
         $('#main-content').before(UpMo.static.loading).addClass('hidden').load('view/themes/' + UpMo.static.theme + '/templates/pages/' + UpMo.static.page + '.php', UpMo.navigation.view.showPage);
      },

      /*************************************************************
       * Method - updateSession()
       *
       *    Update $_SESSION['page'] on AJAX page change
       *************************************************************/
      updateSession : function()
      {
         $.post('navigation/update_session_page', { page : UpMo.static.page });
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
            UpMo.navigation.view.hideSubNav();
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
         if (UpMo.static.page != $(e.target).attr('data-page'))
         {
            // Hide Sub Nav
            UpMo.navigation.view.hideSubNav();

            // Update Nav Links
            UpMo.static.page = $(e.target).attr('data-page');
            $('#navigation ul li a').removeClass('active');
            $('#navigation ul li a[data-page=' + UpMo.static.page + ']').addClass('active');
            location.hash = '!/' + UpMo.static.page;

            $('#main-content, #footer, #footer-bg').fadeOut('normal',
               function()
               {
                  // Resize Header for Page Transition
                  $('#header').addClass('transition');

                  // Load Page
                  UpMo.navigation.model.loadPage();

                  // Update #container attributes
                  $('#container').removeAttr('class').addClass(UpMo.static.page).attr('data-page', UpMo.static.page);

                  // Update Session
                  UpMo.navigation.model.updateSession();
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
         setTimeout("$('#loading').remove();$('#main-content, #footer, #footer-bg').fadeIn('normal').removeClass('hidden');$('#header').removeClass('transition');UpMo.navigation.view.adjustFooterPosition();", 700);
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
         UpMo.static.page = $('#container').attr('data-page');
         UpMo.static.theme = $('#container').attr('data-theme');
         UpMo.static.loading = '<img id="loading" src="view/themes/' + UpMo.static.theme + '/img/global/loading.gif" />';

         /** Handlers **/

         // Highlight Current Page Nav
         $(document).on('click', '#navigation ul li a:not(#show-login-modal), #logo img', UpMo.navigation.view.requestPage);

         // Show Sub Nav
         $(document).on('mouseover', '#navigation ul.main li a', UpMo.navigation.view.showSubNav);

         // Hide Sub Nav
         $(document).on('mouseleave', '#navigation', UpMo.navigation.view.hideSubNav);

         /** Behaviors **/

         // Redirect by #! (on load)
         UpMo.navigation.view.hashBangRedirect();

         // Adjust Footer BG Position
         UpMo.navigation.view.adjustFooterPosition();

         // Redirect by #! (back/forward buttons)
         $(window).bind('hashchange', UpMo.navigation.view.hashBangRedirect);
      }
   }
};

// Initialize Instance
UpMo.navigation.controller.init();