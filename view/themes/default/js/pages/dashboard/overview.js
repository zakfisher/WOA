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
   model : {},
   view : {
      /*************************************************************
       * Method - loadPage()
       *
       *    Init Page Logic
       *    - Display Project Overview
       *************************************************************/
      loadPage : function()
      {
         // Render Template
         Handlebars.renderTemplate('template-projects-overview', WOA.static.current_project.overview, 'div.dynamic-content');
         //$('.sigPad').signaturePad();
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