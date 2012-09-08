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
         WOA.pages.Home.video = '<iframe src="http://player.vimeo.com/video/34294918?title=0&amp;byline=0&amp;portrait=0&amp;autoplay=1" width="584" height="329" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';

         /** Handlers **/
         $(document).on('click', '#banner div.inner-container div.video div.play', WOA.pages.Home.view.playVideo);
      }
   }
};

// Initialize Instance
WOA.pages.Home.controller.init();