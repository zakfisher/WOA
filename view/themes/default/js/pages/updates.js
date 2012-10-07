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
                  id      : 44,
                  title   : 'Test Post',
                  author  : 'zfisher',
                  project : 'Crazy Shit Project',
                  time    : '11.12.12',
                  content : {
                     message : 'Justin Bieber and shit......',
                     links : [
                        {
                           title : 'Business Plan',
                           url : 'www.worldofanarchy.com'
                        }
                     ],
                     comments : [
                        {
                           author : 'santosh',
                           time : '12.3.11',
                           message : 'this is hella sick or whatever'
                        },
                        {
                           author : 'lferrieri',
                           time : '12.3.11',
                           message : 'douchebags anonymous'
                        }
                     ]
                  }
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
                  id      : 4,
                  title   : '324234234 Post',
                  author  : 'zfisher',
                  project : 'Crazy Shit Project',
                  time    : '11.12.12',
                  content : {}
               },
               {
                  id      : 5,
                  title   : 'Test Post',
                  author  : 'santosh',
                  project : 'Crazy Shit Project',
                  time    : '11.12.12',
                  content : {}
               },
               {
                  id      : 6,
                  title   : 'Tesadfadft Post',
                  author  : 'santosh',
                  project : 'Crazy Shit Project',
                  time    : '11.12.12',
                  content : {}
               },
               {
                  id      : 7,
                  title   : 'TZZZZFAER@#$#%@ Post',
                  author  : 'zfisher',
                  project : 'Crazy Shit Project',
                  time    : '11.12.12',
                  content : {}
               },
               {
                  id      : 8,
                  title   : 'Tadfast',
                  author  : 'santosh',
                  project : 'Crazy Shit Project',
                  time    : '11.12.12',
                  content : {}
               },
               {
                  id      : 9,
                  title   : 'Test Post',
                  author  : 'zfisher',
                  project : 'Crazy Shit Project',
                  time    : '11.12.12',
                  content : {}
               },
               {
                  id      : 10,
                  title   : 'Tasdf2Post',
                  author  : 'santosh',
                  project : 'Crazy Shit Project',
                  time    : '11.12.12',
                  content : {}
               },
               {
                  id      : 11,
                  title   : 'Testaaaaa Post',
                  author  : 'santosh',
                  project : 'Crazy Shit Project',
                  time    : '11.12.12',
                  content : {}
               },
               {
                  id      : 12,
                  title   : 'Test Post',
                  author  : 'zfisher',
                  project : 'Crazy Shit Project',
                  time    : '11.12.12',
                  content : {}
               },
               {
                  id      : 13,
                  title   : 'Test Post',
                  author  : 'zfisher',
                  project : 'Crazy Shit Project',
                  time    : '11.12.12',
                  content : {}
               },
               {
                  id      : 14,
                  title   : 'Test Post',
                  author  : 'santosh',
                  project : 'Crazy Shit Project',
                  time    : '11.12.12',
                  content : {}
               },
               {
                  id      : 15,
                  title   : 'Test Post',
                  author  : 'zfisher',
                  project : 'Crazy Shit Project',
                  time    : '11.12.12',
                  content : {}
               },
               {
                  id      : 16,
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

         // Cache Indexes for Single Post Reference
         data.item_index = {};
         $(data.items).each(function(i, v) {
            data.item_index[v.id] = i;
            if (v.author == WOA.static.user.username) { v.owner = true; }
         });

         // Cache Result Set
         WOA.static.list_cache = data;

         // Render List Template
         Handlebars.renderTemplate('template-list', data, 'div.dynamic-content');
      },

      /*************************************************************
       * Method - displayPost(e)
       *
       *    Show Single Post View
       *************************************************************/
      displayPost : function(e)
      {
         var item = ($(e.target).is('div.item')) ? $(e.target) : $(e.target).parents('div.item');
         var postId = item.attr('data-id');
         var post = WOA.static.list_cache.items[WOA.static.list_cache.item_index[postId]];

         console.log(post);

         Handlebars.renderTemplate('template-single-post', post, 'div.dynamic-content', 'append');
         $('div.dynamic-content').animate({ left : '-612px' }, 300);
      },

      /*************************************************************
       * Method - backToListView(e)
       *
       *    Show List View
       *************************************************************/
      backToListView : function(e)
      {
         $('div.dynamic-content').animate({ left : '0px' }, 300, function() { $('div.dynamic-content div.secondary-view').remove(); });
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
         $(document).on('click', 'div.dynamic-content div.list-container.updates div.item', WOA.pages.Updates.view.displayPost);
         $(document).on('click', 'div.dynamic-content div.secondary-view div.go-back', WOA.pages.Updates.view.backToListView);
      }
   }
};

WOA.pages.Updates.controller.init();