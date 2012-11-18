/*********************************************
 * WOA Overview Page Class
 *
 * Desc:  Javascript Overview Page Object
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
WOA.pages.Overview =
{
   model : {
      /*************************************************************
       * Method - getProjectNames(callback)
       *
       *    Fetch Project Names
       *************************************************************/
      getProjectNames : function(callback) { $.get(WOA.static.env + 'projects/get_project_names', callback); }
   },
   view : {
      /*************************************************************
       * Method - loadPage()
       *
       *    Init Page Logic
       *    - Fetch Projects Data
       *************************************************************/
      loadPage : function()
      {
         // Dashboard (list)
         WOA.pages.Projects.model.getProjects();
      },

      /*************************************************************
       * Method - showPage(data)
       *
       *    Display Page
       *************************************************************/
      showPage : function(data)
      {
         // Load projects
         var data = {
            projects : true,
            type : 'projects',
            items : projects
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

WOA.pages.Overview.controller.init();