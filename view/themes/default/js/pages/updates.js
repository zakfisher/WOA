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
     >> getAllUpdates
 * - View
     >> loadPage
     >> showPage
 * - Controller
 *********************************************/
WOA.pages.Updates =
{
   model : {
      /*************************************************************
       * Method - getAllUpdates()
       *
       *    Fetch All Updates Data
       *************************************************************/
      getAllUpdates : function()
      {
         alert('all');
         $.get(WOA.static.env + 'test/test/abc', function(data) { WOA.pages.Updates.view.showPage(data); });
      },

      /*************************************************************
       * Method - getProjectUpdates()
       *
       *    Fetch Project Updates Data
       *************************************************************/
      getProjectUpdates : function()
      {
         alert('project');
         $.get(WOA.static.env + 'test/test/abc', function(data) { WOA.pages.Updates.view.showPage(data); });
      }
   },
   view : {
      /*************************************************************
       * Method - loadPage()
       *
       *    Init Page Logic
       *    - Fetch Updates Data
       *************************************************************/
      loadPage : function()
      {
         // All Updates
         if ($('span.sub-page-nav').hasClass('hidden')) { WOA.pages.Updates.model.getAllUpdates(); }

         // Project Updates
         else { WOA.pages.Updates.model.getProjectUpdates(); }
      },

      /*************************************************************
       * Method - showPage(data)
       *
       *    Display Page
       *************************************************************/
      showPage : function(data)
      {
         // Load latest posts
         var data = {
            posts : true,
            type : 'updates',
            items : [
               {
                  template : 'updates-list-items',
                  id      : 44,
                  title   : 'Test Post',
                  author  : 'zfisher',
                  project : 'Crazy Shit Project',
                  time    : '11.12.12',
                  content : {
                     message : 'That\'s right! We got that little fucker to agree to the small fee of $1.5M just to come and make some little girls wet themselves. I know, none of us want to book the lil guy, BUT he does draw a crowd and money is money .... Anyway, here\’s some more text just to fill up some space and pretend that we\'re actually saying something slightly important.. but we’re really not .. like, at all.',
                     links : [
                        {
                           title : 'Business Plan',
                           url : 'http://www.worldofanarchy.com'
                        },
                        {
                           title : 'Other Page',
                           url : 'http://www.worldofanarchy.com'
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
                           message : 'That\'s right! We got that little fucker to agree to the small fee of $1.5M just to come and make some little girls wet themselves. I know, none of us want to book the lil guy, BUT he does draw a crowd and money is money .... Anyway, here\’s some more text just to fill up some space and pretend that we\'re actually saying something slightly important.. but we’re really not .. like, at all.'
                        }
                     ]
                  }
               },
               {
                  template : 'updates-list-items',
                  id      : 2,
                  title   : 'Testadfad Post',
                  author  : 'zfisher',
                  project : 'Crazy Shit Project',
                  time    : '11.12.12',
                  content : {}
               },
               {
                  template : 'updates-list-items',
                  id      : 3,
                  title   : 'ABCCC Post',
                  author  : 'zfisher',
                  project : 'Crazy Shit Project',
                  time    : '11.12.12',
                  content : {}
               },
               {
                  template : 'updates-list-items',
                  id      : 4,
                  title   : '324234234 Post',
                  author  : 'zfisher',
                  project : 'Crazy Shit Project',
                  time    : '11.12.12',
                  content : {}
               },
               {
                  template : 'updates-list-items',
                  id      : 5,
                  title   : 'Test Post',
                  author  : 'sdevanagondi',
                  project : 'Crazy Shit Project',
                  time    : '11.12.12',
                  content : {}
               },
               {
                  template : 'updates-list-items',
                  id      : 6,
                  title   : 'Tesadfadft Post',
                  author  : 'santosh',
                  project : 'Crazy Shit Project',
                  time    : '11.12.12',
                  content : {}
               },
               {
                  template : 'updates-list-items',
                  id      : 7,
                  title   : 'TZZZZFAER@#$#%@ Post',
                  author  : 'zfisher',
                  project : 'Crazy Shit Project',
                  time    : '11.12.12',
                  content : {}
               },
               {
                  template : 'updates-list-items',
                  id      : 8,
                  title   : 'Tadfast',
                  author  : 'santosh',
                  project : 'Crazy Shit Project',
                  time    : '11.12.12',
                  content : {}
               },
               {
                  template : 'updates-list-items',
                  id      : 9,
                  title   : 'Test Post',
                  author  : 'zfisher',
                  project : 'Crazy Shit Project',
                  time    : '11.12.12',
                  content : {}
               },
               {
                  template : 'updates-list-items',
                  id      : 10,
                  title   : 'Tasdf2Post',
                  author  : 'santosh',
                  project : 'Crazy Shit Project',
                  time    : '11.12.12',
                  content : {}
               },
               {
                  template : 'updates-list-items',
                  id      : 11,
                  title   : 'Testaaaaa Post',
                  author  : 'santosh',
                  project : 'Crazy Shit Project',
                  time    : '11.12.12',
                  content : {}
               },
               {
                  template : 'updates-list-items',
                  id      : 12,
                  title   : 'Test Post',
                  author  : 'zfisher',
                  project : 'Crazy Shit Project',
                  time    : '11.12.12',
                  content : {}
               },
               {
                  template : 'updates-list-items',
                  id      : 13,
                  title   : 'Test Post',
                  author  : 'zfisher',
                  project : 'Crazy Shit Project',
                  time    : '11.12.12',
                  content : {}
               },
               {
                  template : 'updates-list-items',
                  id      : 14,
                  title   : 'Test Post',
                  author  : 'santosh',
                  project : 'Crazy Shit Project',
                  time    : '11.12.12',
                  content : {}
               },
               {
                  template : 'updates-list-items',
                  id      : 15,
                  title   : 'Test Post',
                  author  : 'zfisher',
                  project : 'Crazy Shit Project',
                  time    : '11.12.12',
                  content : {}
               },
               {
                  template : 'updates-list-items',
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

         //console.log(post);

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
      },

      /*************************************************************
       * Method - toggleCommentsCollapse(e)
       *
       *    Expand/Collapse Comments
       *************************************************************/
      toggleCommentsCollapse : function(e)
      {
         var icon = $(e.target);
         var div = icon.parents('div.comments').find('span.collapseable');

         // Collapse
         if (icon.hasClass('icon-minus'))
         {
            icon.removeClass('icon-minus');
            icon.addClass('icon-plus');
            div.slideUp();
         }

         // Expand
         else
         {
            icon.removeClass('icon-plus');
            icon.addClass('icon-minus');
            div.slideDown();
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
         $(document).on('click', 'div.dynamic-content div.list-container.updates div.item', WOA.pages.Updates.view.displayPost);
         $(document).on('click', 'div.dynamic-content div.secondary-view div.go-back', WOA.pages.Updates.view.backToListView);
         $(document).on('click', 'div.dynamic-content div.secondary-view div.post-content div.comments i', WOA.pages.Updates.view.toggleCommentsCollapse);
      }
   }
};

WOA.pages.Updates.controller.init();