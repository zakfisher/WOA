/*********************************************
 * WOA Home Page Class
 *
 * Desc:  Javascript Home Page Object
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
WOA.pages.Home =
{
   model : {},
   view :
   {
      /*************************************************************
       * Method - playVideo()
       *
       *    Embed + Autoplay Video
       *************************************************************/
      playVideo : function()
      {
         $('#banner div.inner-container div.video div.iframe').html(WOA.pages.Home.video).removeClass('hidden');
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

// Initialize Instance
WOA.pages.Home.controller.init();