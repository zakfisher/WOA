/*********************************************
 * WOA Contracts Page Class
 *
 * Desc:  Javascript Contracts Page Object
 *
 * Creator: Zachary Fisher - zfisher@worldofanarchy.com
 *
 * Copyright (c) Anarchy Productions International LLC, 2012
 *
 * Search Keys:
 * - Model
 * - View
     >> loadPage
 * - Controller
 *********************************************/
WOA.pages.Contracts =
{
   model : {},
   view : {
      /*************************************************************
       * Method - loadPage()
       *
       *    Init Page Logic
       *    - Show Contracts List
       *************************************************************/
      loadPage : function()
      {
          WOA.pages.Contracts.view.showPage(WOA.static.current_project.contracts);
      },

      /*************************************************************
       * Method - showPage(contracts)
       *
       *    Display Page
       *************************************************************/
      showPage : function(contracts)
      {
         // Load projects
         var data = {
            contracts : true,
            filter : true,
            type : 'contracts',
            items : contracts
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

         //
      }
   }
};

WOA.pages.Contracts.controller.init();