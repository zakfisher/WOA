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

WOA.pages.Overview.controller.init();