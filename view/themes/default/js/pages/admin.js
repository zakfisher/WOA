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
 * - View
     >> loadPage
 * - Controller
 *********************************************/
WOA.pages.Admin =
{
   model : {},
   view : {
      /*************************************************************
       * Method - loadPage()
       *
       *    Build Post List
       *************************************************************/
      loadPage : function()
      {
         // Load admin data
         var data = {
            type : 'admin',
            items : [
               {
                  template : 'admin-list-items',
                  id      : 1,
                  task : 'Manage Users',
                  sub_info : 'Total Users: 34'
               },
               {
                  template : 'admin-list-items',
                  id      : 2,
                  task : 'Manage Contracts',
                  sub_info : 'Total Contracts: 34'
               },
               {
                  template : 'admin-list-items',
                  id      : 3,
                  task : 'Manage Projects',
                  sub_info : 'Total Projects: 34'
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

WOA.pages.Admin.controller.init();