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
     >> getProjectUpdates
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
         $.get(WOA.static.env + 'updates/get_updates', WOA.pages.Updates.view.showPage);
      },

      /*************************************************************
       * Method - getProjectUpdates()
       *
       *    Fetch Project Updates Data
       *************************************************************/
      getProjectUpdates : function()
      {
         $.get(WOA.static.env + 'updates/get_updates/' + WOA.static.current_project.id, WOA.pages.Updates.view.showPage);
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
      showPage : function(updates)
      {
         // Load latest posts
         var data = {
            posts : true,
            type : 'updates',
            items : updates
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