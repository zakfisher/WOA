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
     >> getSite_emails
 * - View
     >> loadPage
     >> showPage
 * - Controller
 *********************************************/
WOA.pages.Site_emails =
{
   model : {
      /*************************************************************
       * Method - getSite_emails()
       *
       *    Fetch Site_emails Data
       *************************************************************/
      getSite_emails : function()
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
         //WOA.pages.Contacts.model.getContacts();
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
            contacts : true,
            type : 'contacts',
            items : [
               {
                  template : 'contacts-list-items',
                  id      : 44,
                  first_name : 'Jimmy',
                  last_name : 'Smoothsocks',
                  type : 'Investor',
                  title : 'Venture Capitalist',
                  company : 'VC Funding, Inc.'
               },
               {
                  template : 'contacts-list-items',
                  id      : 3,
                  first_name : 'Mr',
                  last_name : 'Halal',
                  type : 'Vendor',
                  title : 'General Manager',
                  company : 'Habibs Restaurant'
               },
               {
                  template : 'contacts-list-items',
                  id      : 4,
                  first_name : 'Tooth',
                  last_name : 'Fairy',
                  type : 'Investor',
                  title : 'Banker',
                  company : 'Magic Co.'
               },
               {
                  template : 'contacts-list-items',
                  id      : 11,
                  first_name : 'Mantots',
                  last_name : 'Andgondi',
                  type : 'Accountant',
                  title : 'Business Banking Specialist',
                  company : 'Wells Fargo'
               },
               {
                  template : 'contacts-list-items',
                  id      : 454,
                  first_name : 'Toats',
                  last_name : 'McGoats',
                  type : 'Investor',
                  title : 'Venture Capitalist',
                  company : 'VC Funding, Inc.'
               },
               {
                  template : 'contacts-list-items',
                  id      : 444,
                  first_name : 'Shitty',
                  last_name : 'Smellman',
                  type : 'Investor',
                  title : 'Venture Capitalist',
                  company : 'VC Funding, Inc.'
               },
               {
                  template : 'contacts-list-items',
                  id      : 474,
                  first_name : 'Tim',
                  last_name : 'Hucklebury',
                  type : 'Investor',
                  title : 'Greeter',
                  company : 'Walmart'
               },
               {
                  template : 'contacts-list-items',
                  id      : 484,
                  first_name : 'Fat',
                  last_name : 'Sausage',
                  type : 'Artist',
                  title : 'Manager',
                  company : 'Bookings'
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