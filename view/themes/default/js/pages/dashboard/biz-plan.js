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
         $('div.content.left div.inner-container.menu').addClass('document');
         $('div.content.left ul.sub-nav.default').addClass('hidden');
         $('span.sub-page-nav').removeClass('hidden');
         Handlebars.renderTemplate('template-biz-plan-sub-nav', WOA.static.current_project.biz_plan, 'div.content.left ul.sub-nav.sub-page');
         $('div.btn.back-to-dashboard').removeClass('back-to-dashboard').addClass('back-to-project').html('<i class="icon-white icon-arrow-left"></i> Back to Project');
      },

       /*************************************************************
        * Method - selectSection(e)
        *
        *    Display Selected Section
        *************************************************************/
       selectSection : function(e)
       {
           var button = $(e.target).is('li.document-nav') ? $(e.target) : $(e.target).parents('li.document-nav');
           var articleNav = button.next('div.article-nav');
           if (!button.hasClass('active')) {
               $('li.document-nav').removeClass('active');
               button.addClass('active');
               $('div.article-nav.active').slideUp('fast').removeClass('active');
               articleNav.slideDown('fast').addClass('active');
           }
       },

       /*************************************************************
        * Method - sideNavScroll()
        *
        *    Fix Side Nav on Scroll
        *************************************************************/
       sideNavScroll : function()
       {
           var sideNav = $('div.content.left div.inner-container.menu.document');
           if (sideNav.length != 0) {
               if (sideNav.offset().top >= 387 && (window.scrollY >= sideNav.offset().top-65)) sideNav.addClass('scrolling');
               else if (window.scrollY < 387) sideNav.removeClass('scrolling');
           }
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

         $(document).on('scroll', document, WOA.pages.Biz_plan.view.sideNavScroll);
      }
   }
};

WOA.pages.Biz_plan.controller.init();