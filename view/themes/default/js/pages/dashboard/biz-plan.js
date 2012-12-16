/*********************************************
 * WOA Biz Plan Page Class
 *
 * Desc:  Javascript Biz Plan Page Object
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
WOA.pages.Biz_plan =
{
   model : {},
   view : {
      /*************************************************************
       * Method - loadPage()
       *
       *    Init Page Logic
       *    - Display Business Plan
       *************************************************************/
      loadPage : function()
      {
         // Render Biz Plan Template
         Handlebars.renderTemplate('template-projects-biz-plan', WOA.static.current_project.biz_plan, 'div.dynamic-content');

         // Render Biz Plan Side Nav
         $('div.content.left ul.sub-nav.default').addClass('hidden');
         $('span.sub-page-nav').removeClass('hidden');
         //$('div.btn.back-to-dashboard').attr('data-sub-page', 'projects');
         Handlebars.renderTemplate('template-biz-plan-sub-nav', WOA.static.current_project.biz_plan, 'div.content.left ul.sub-nav.sub-page');
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

WOA.pages.Biz_plan.controller.init();