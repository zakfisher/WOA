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
            posts : [
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
               }
            ]
         };
         data.pagination = {
            template : 'pagination',
            post_count : data.posts.length,
            posts_per_page : 10
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