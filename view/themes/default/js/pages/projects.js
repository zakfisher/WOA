/*********************************************
 * WOA Projects Page Class
 *
 * Desc:  Javascript Projects Page Object
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
WOA.pages.Projects =
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
         // Load latest posts
         var data = {
            type : 'projects',
            items : [
               {
                  template : 'projects-list-items',
                  id      : 44,
                  project : 'Crazy Shit Project',
                  last_updated    : '1.1.12',
                  user_count : 5
               },
               {
                  template : 'projects-list-items',
                  id      : 4,
                  project : 'haslslsls Project',
                  last_updated    : '11.18.12',
                  user_count : 15
               },
               {
                  template : 'projects-list-items',
                  id      : 224,
                  project : 'ABCC Project',
                  last_updated    : '10.12.10',
                  user_count : 3
               },
               {
                  template : 'projects-list-items',
                  id      : 5,
                  project : '234t Project',
                  last_updated    : '9.12.12',
                  user_count : 2
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

WOA.pages.Projects.controller.init();