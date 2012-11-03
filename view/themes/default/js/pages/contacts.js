/*********************************************
 * WOA Contacts Page Class
 *
 * Desc:  Javascript Contacts Page Object
 *
 * Creator: Zachary Fisher - zfisher@worldofanarchy.com
 *
 * Copyright (c) Anarchy Productions International LLC, 2012
 *
 * Search Keys:
 * - Model
     >> getContacts
 * - View
     >> loadPage
     >> showPage
 * - Controller
 *********************************************/
WOA.pages.Contacts =
{
   model : {
      /*************************************************************
       * Method - getContacts()
       *
       *    Fetch Contacts Data
       *************************************************************/
      getContacts : function()
      {
         $.get(WOA.static.env + 'contacts/get_contacts', WOA.pages.Contacts.view.showPage);
      }
   },
   view : {
      /*************************************************************
       * Method - loadPage()
       *
       *    Init Page Logic
       *    - Fetch Contacts Data
       *************************************************************/
      loadPage : function()
      {
         WOA.pages.Contacts.model.getContacts();
      },

      /*************************************************************
       * Method - showPage(data)
       *
       *    Display Page
       *************************************************************/
      showPage : function(contacts)
      {
         // Load contacts
         var data = {
            contacts : true,
            type : 'contacts',
            items : contacts
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

WOA.pages.Contacts.controller.init();