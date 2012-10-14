/*********************************************
 * WOA Dashboard Page Class
 *
 * Desc:  Javascript Dashboard Page Object
 *
 * Creator: Zachary Fisher - zfisher@worldofanarchy.com
 *
 * Copyright (c) Anarchy Productions International LLC, 2012
 *
 * Search Keys:
 * - Model
 * - View
     >> loadPage
     >> showPage
 * - Controller
 *********************************************/
WOA.pages.Dashboard =
{
   model : {},
   view : {
      /*************************************************************
       * Method - loadPage()
       *
       *    Init Page Logic
       *************************************************************/
      loadPage : function()
      {
         // Set Sub Page
         if (typeof WOA.static.sub_page == 'undefined' || !WOA.static.dashboard.hasOwnProperty(WOA.static.sub_page)) { WOA.static.sub_page = 'updates' }

         // Login Check
         $.get('user/login_check', function(data) {
            // Logged In
            if (data == 'true') {

               // Render Container Template
               Handlebars.renderTemplate('template-sub-page-wrapper', WOA.static.dashboard[WOA.static.sub_page], 'div.content.right');

               // Request Sub Page
               $('div.content.left ul.sub-nav li[data-sub-page=' + WOA.static.sub_page + ']').click();

            }
            // Not Logged In
            else { $('#logo div.sprite').click(); }
         }).error(function() { $('#logo div.sprite').click(); });
      }
   },
   controller :
   {
      /*************************************************************
       * Init Method
       *************************************************************/
      init : function()
      {
         WOA.static.dashboard = {
            updates : {
               shadow_down : true,
               title : 'Updates',
               sub_text : 'The latest updates for all your projects.'
            },
            projects : {
               shadow_down : true,
               title : 'Projects',
               sub_text : 'Find and manage your projects.'
            },
            settings : {
               shadow_down : true,
               title : 'Settings',
               sub_text : 'Update your account information.'
            },
            contacts : {
               shadow_down : true,
               title : 'Contacts',
               sub_text : 'Find and manage company contacts.'
            },
            site_emails : {
               title : 'Site Emails',
               sub_text : 'Review emails sent to WOA from website visitors.'
            },
            admin : {
               admin : true,
               title : 'Admin Dashboard',
               sub_text : 'Manage user accounts and more.'
            }
         };
         /** Handlers **/

      }
   }
};

WOA.pages.Dashboard.controller.init();