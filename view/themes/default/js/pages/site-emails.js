/*********************************************
 * WOA Site_emails Page Class
 *
 * Desc:  Javascript Site_emails Page Object
 *
 * Creator: Zachary Fisher - zfisher@worldofanarchy.com
 *
 * Copyright (c) Anarchy Productions International LLC, 2012
 *
 * Search Keys:
 * - Model
     >> getSiteEmails
 * - View
     >> loadPage
     >> showPage
 * - Controller
 *********************************************/
WOA.pages.Site_emails =
{
   model : {
      /*************************************************************
       * Method - getSiteEmails()
       *
       *    Fetch Site_emails Data
       *************************************************************/
      getSiteEmails : function()
      {
         $.get(WOA.static.env + 'test/test/abc', WOA.pages.Site_emails.view.showPage);
      }
   },
   view : {
      /*************************************************************
       * Method - loadPage()
       *
       *    Init Page Logic
       *    - Fetch Emails
       *************************************************************/
      loadPage : function()
      {
         WOA.pages.Site_emails.model.getSiteEmails();
      },

      /*************************************************************
       * Method - showPage(data)
       *
       *    Display Page
       *************************************************************/
      showPage : function(data)
      {
         // Load contacts
         var data = {
            site_emails : true,
            type : 'site-emails',
            items : [
               {
                  template : 'site-emails-list-items',
                  id : 44,
                  subject : 'A Question for WOA..',
                  sender : 'email_address@fake_domain.com',
                  message : '[11/4/12 1:08 PM] Failed to collect files: Connection closed without indication.',
                  time : '10.2.12'
               },
               {
                  template : 'site-emails-list-items',
                  id : 43,
                  subject : 'Another Question for WOA..',
                  sender : '12345@fake_domain.com',
                  message : '[11/4/12 1:08 PM] Failed to collect files: Connection closed without indication.',
                  time : '8.22.12'
               },
               {
                  template : 'site-emails-list-items',
                  id : 424,
                  subject : 'WTF is Rickorish?',
                  sender : 'email_address2323@fake_domain.com',
                  message : '[11/4/12 1:08 PM] Failed to collect files: Connection closed without indication.',
                  time : '6.12.12'
               }
            ]
         };
         data.pagination = {
            float : 'right',
            extra_class : 'list-end',
            template : 'pagination',
            item_count : data.items.length,
            items_per_page : 5
         }

         // Cache Indexes for Single Post Reference
         data.item_index = {};
         $(data.items).each(function(i, v) {
            data.item_index[v.id] = i;
         });

         // Cache Result Set
         WOA.static.list_cache = data;

         // Render List Template
         Handlebars.renderTemplate('template-list', data, 'div.dynamic-content');
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

      }
   }
};

WOA.pages.Site_emails.controller.init();