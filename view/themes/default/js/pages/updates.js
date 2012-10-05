/*********************************************
 * WOA Updates Page Class
 *
 * Desc:  Javascript Updates Page Object
 *
 * Creator: Zachary Fisher - zfisher@worldofanarchy.com
 *
 * Copyright (c) Anarchy Productions International LLC, 2012
 *
 * Search Keys:
 * - Model
 * - View
 * - Controller
 *********************************************/
WOA.pages.Updates =
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
         var data = {
            test : 'halalala'
         };
         Handlebars.renderTemplate('template-updates-list', data, 'div.dynamic-content');
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

WOA.pages.Updates.controller.init();