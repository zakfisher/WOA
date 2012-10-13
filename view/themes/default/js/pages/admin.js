/*********************************************
 * WOA Admin Page Class
 *
 * Desc:  Javascript Admin Page Object
 *
 * Creator: Zachary Fisher - zfisher@worldofanarchy.com
 *
 * Copyright (c) Anarchy Productions International LLC, 2012
 *
 * Search Keys:
 * - Model
     >> getAdminData
 * - View
     >> loadPage
     >> showPage
 * - Controller
 *********************************************/
WOA.pages.Admin =
{
   model : {
      /*************************************************************
       * Method - getAdminData()
       *
       *    Fetch Admin Data
       *************************************************************/
      getAdminData : function()
      {
         $.get(WOA.static.env + 'test/test/abc', function(data) { WOA.pages.Admin.view.showPage(data); });
      }
   },
   view : {
      /*************************************************************
       * Method - loadPage()
       *
       *    Init Page Logic
       *    - Fetch Admin Data
       *************************************************************/
      loadPage : function()
      {
         WOA.pages.Admin.model.getAdminData();
      },

      /*************************************************************
       * Method - showPage(data)
       *
       *    Display Page
       *************************************************************/
      showPage : function(data)
      {
         var data = {
            items : [
               {
                  task : 'Manage Users',
                  total : 34
               },
               {
                  task : 'Manage Contracts',
                  total : 23
               },
               {
                  task : 'Manage Projects',
                  total : 4,
                  last : true
               }
            ]
         };

         // Render List Template
         Handlebars.renderTemplate('template-admin-list-items', data, 'div.list-container.admin');
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

WOA.pages.Admin.controller.init();