/*********************************************
 * WOA About Page Class
 *
 * Desc:  Javascript About Page Object
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
WOA.pages.About =
{
   model : {},
   view : {
      /*************************************************************
       * Method - loadPage()
       *
       *    Build Post List
       *************************************************************/
      loadPage : function() {},

      /*************************************************************
       * Method - showSection(e)
       *
       *    Display About Sub Section
       *************************************************************/
      showSection : function(e) {
         $('div.dynamic-content div.content').addClass('hidden');
         $('div.dynamic-content div.content[data-sub-page=' + $(e.target).attr('data-sub-page') + ']').removeClass('hidden');
         $('#container[data-page=about] ul.sub-nav li').removeClass('active');
         $(e.target).addClass('active');
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
         $(document).on('click', '#container[data-page=about] ul.sub-nav li', WOA.pages.About.view.showSection);
      }
   }
};

WOA.pages.About.controller.init();