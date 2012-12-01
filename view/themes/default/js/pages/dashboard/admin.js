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
         $.get('admin/get_stats', WOA.pages.Admin.view.showPage);
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
         var context = {
            items : [
               {
                  task : 'Manage Users',
                  total : data.user_count
               },
               {
                  task : 'Manage Contracts',
                  total : data.contract_count
               },
               {
                  task : 'Manage Projects',
                  total : data.project_count,
                  last : true
               }
            ]
         };

         // Render List Template
         Handlebars.renderTemplate('template-admin-list-items', context, 'div.list-container.admin');
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