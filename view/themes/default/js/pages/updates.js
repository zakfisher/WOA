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
     >> loadPage
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
         // Load latest posts
         var data = {
            list_items_template : 'updates-list-items',
            items : [
               {
                  id      : 1,
                  title   : 'Test Post',
                  author  : 'zfisher',
                  project : 'Crazy Shit Project',
                  time    : '11.12.12',
                  content : {}
               },
               {
                  id      : 2,
                  title   : 'Testadfad Post',
                  author  : 'zfisher',
                  project : 'Crazy Shit Project',
                  time    : '11.12.12',
                  content : {}
               },
               {
                  id      : 3,
                  title   : 'ABCCC Post',
                  author  : 'zfisher',
                  project : 'Crazy Shit Project',
                  time    : '11.12.12',
                  content : {}
               },
               {
                  id      : 1,
                  title   : '324234234 Post',
                  author  : 'zfisher',
                  project : 'Crazy Shit Project',
                  time    : '11.12.12',
                  content : {}
               },
               {
                  id      : 2,
                  title   : 'Test Post',
                  author  : 'zfisher',
                  project : 'Crazy Shit Project',
                  time    : '11.12.12',
                  content : {}
               },
               {
                  id      : 3,
                  title   : 'Tesadfadft Post',
                  author  : 'zfisher',
                  project : 'Crazy Shit Project',
                  time    : '11.12.12',
                  content : {}
               },
               {
                  id      : 1,
                  title   : 'TZZZZFAER@#$#%@ Post',
                  author  : 'zfisher',
                  project : 'Crazy Shit Project',
                  time    : '11.12.12',
                  content : {}
               },
               {
                  id      : 2,
                  title   : 'Tadfast',
                  author  : 'zfisher',
                  project : 'Crazy Shit Project',
                  time    : '11.12.12',
                  content : {}
               },
               {
                  id      : 3,
                  title   : 'Test Post',
                  author  : 'zfisher',
                  project : 'Crazy Shit Project',
                  time    : '11.12.12',
                  content : {}
               },
               {
                  id      : 1,
                  title   : 'Tasdf2Post',
                  author  : 'zfisher',
                  project : 'Crazy Shit Project',
                  time    : '11.12.12',
                  content : {}
               },
               {
                  id      : 2,
                  title   : 'Testaaaaa Post',
                  author  : 'zfisher',
                  project : 'Crazy Shit Project',
                  time    : '11.12.12',
                  content : {}
               },
               {
                  id      : 3,
                  title   : 'Test Post',
                  author  : 'zfisher',
                  project : 'Crazy Shit Project',
                  time    : '11.12.12',
                  content : {}
               },
               {
                  id      : 1,
                  title   : 'Test Post',
                  author  : 'zfisher',
                  project : 'Crazy Shit Project',
                  time    : '11.12.12',
                  content : {}
               },
               {
                  id      : 2,
                  title   : 'Test Post',
                  author  : 'zfisher',
                  project : 'Crazy Shit Project',
                  time    : '11.12.12',
                  content : {}
               },
               {
                  id      : 3,
                  title   : 'Test Post',
                  author  : 'zfisher',
                  project : 'Crazy Shit Project',
                  time    : '11.12.12',
                  content : {}
               },
               {
                  id      : 3,
                  title   : 'Test Post',
                  author  : 'zfisher',
                  project : 'Crazy Shit Project',
                  time    : '11.12.12',
                  content : {}
               }
            ]
         };
         data.pagination = {
            float : 'right',
            extra_class : 'list-end',
            template : 'pagination',
            item_count : data.items.length,
            items_per_page : 5
         }
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