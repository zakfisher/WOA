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
         WOA.pages.Biz_plan.view.showPage();
      },

      /*************************************************************
       * Method - showPage()
       *
       *    Display Page
       *************************************************************/
      showPage : function()
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
        * Method - selectSection(e)
        *
        *    Display Selected Section
        *************************************************************/
       selectSection : function(e)
       {

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

         // Select & Display Nav Items
         $(document).on('click', 'ul.sub-nav.sub-page li.document-nav', WOA.pages.Biz_plan.view.selectSection);
      }
   }
};

WOA.pages.Biz_plan.controller.init();