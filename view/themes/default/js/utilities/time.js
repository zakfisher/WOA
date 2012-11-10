/*********************************************
 * WOA Time Utility Class
 *
 * Desc:  Javascript Time Utility Object
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
WOA.utilities.Time =
{
   model : {
      renderCurrentDate : function()
      {
         var today = new Date();
         var month = today.getMonth();
         month++;
         var day = today.getDate();
         var year = today.getFullYear();
         year += '';
         year = year.substr(2);
         var date = month + '.' + day + '.' + year;
         return date;
      }
   },
   view : {},
   controller : {
      /*************************************************************
       * Init Method
       *************************************************************/
      init : function()
      {
         /** Handlers **/

      }
   }
};

//WOA.utilities.Time.controller.init();