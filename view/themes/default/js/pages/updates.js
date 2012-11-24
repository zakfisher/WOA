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
     >> submitPostUpdate
     >> submitPostAdd
     >> submitComment
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
      getAllUpdates : function() { $.get(WOA.static.env + 'updates/get_updates', WOA.pages.Updates.view.showPage); },

      /*************************************************************
       * Method - submitPostUpdate()
       *
       *    Update Current Post
       *************************************************************/
      submitPostUpdate : function() { $.post(WOA.static.env + 'updates/submit_post_update/', WOA.static.current_post, WOA.pages.Updates.view.updatePostSuccess).error(WOA.pages.Updates.view.updatePostError); },

      /*************************************************************
       * Method - submitPostAdd()
       *
       *    Add New Post
       *************************************************************/
      submitPostAdd : function() { $.post(WOA.static.env + 'updates/submit_new_post/', WOA.static.current_post, WOA.pages.Updates.view.addPostSuccess).error(WOA.pages.Updates.view.addPostError); },

      /*************************************************************
       * Method - submitComment()
       *
       *    Add New Comment
       *************************************************************/
      submitComment : function(data) { $.post(WOA.static.env + 'updates/submit_new_comment/', data, WOA.pages.Updates.view.addCommentSuccess).error(WOA.pages.Updates.view.addCommentFail); }
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
         WOA.pages.Updates.model.getAllUpdates();
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
            filter : true,
            type : 'updates',
            items : updates
         };

         data.pagination = {
            float : 'right',
            extra_class : 'list-end',
            template : 'pagination',
            item_count : data.items.length,
            items_per_page : 5
         };

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
         WOA.static.current_post = post;

         Handlebars.renderTemplate('template-single-post', post, 'div.dynamic-content', 'append');
         $('div.dynamic-content').animate({ left : '-612px' }, 300);
      },

      /*************************************************************
       * Method - editPost()
       *
       *    Display Edit Post Form
       *************************************************************/
      editPost : function()
      {
         // Update Page Header
         var h1 = $('div.content.right div.header h1.title');
         WOA.static.current_post_h1 = h1.text();
         WOA.static.current_post_h2 = h1.siblings('h2').text();
         WOA.static.current_post.editMode = true;

         var page = $('div.content.right');
         h1.text('Edit Post');
         h1.siblings('h2').html("<b>" + WOA.static.current_post.title + "</b>");
         Handlebars.renderTemplate('template-add-edit-post', WOA.static.current_post, 'div.secondary-view');
      },

      /*************************************************************
       * Method - addPostForm()
       *
       *    Display Add Post Form
       *************************************************************/
      addPostForm : function()
      {
         // Update Page Header
         var h1 = $('div.content.right div.header h1.title');
         WOA.static.current_post_h1 = h1.text();
         WOA.static.current_post_h2 = h1.siblings('h2').text();

         // Display Form
         var displayForm = function(projects)
         {
            var data = {
               addMode : true,
               projects : projects
            };
            var page = $('div.content.right');
            h1.text('Add Post');
            h1.siblings('h2').html("Enter post data below.");
            Handlebars.renderTemplate('template-add-edit-post', data, 'div.main-view');
         }
         WOA.pages.Projects.model.getProjectNames(displayForm);
      },

      /*************************************************************
       * Method - backToPost()
       *
       *    Display Single Post View
       *************************************************************/
      backToPost : function()
      {
         // Update Page Header
         var h1 = $('div.content.right div.header h1.title');
         h1.text(WOA.static.current_post_h1);
         h1.siblings('h2').html(WOA.static.current_post_h2);

         var post = WOA.static.current_post;
         delete WOA.static.current_post.editMode;
         delete WOA.static.current_post.addMode;

         Handlebars.renderTemplate('template-single-post', post, 'div.secondary-view');
      },

      /*************************************************************
       * Method - backToPostFromNew()
       *
       *    Display Post List View
       *************************************************************/
      backToPostFromNew : function()
      {
         // Update Page Header
         var h1 = $('div.content.right div.header h1.title');
         h1.text(WOA.static.current_post_h1);
         h1.siblings('h2').html(WOA.static.current_post_h2);

         // Render List View
         Handlebars.renderTemplate('template-list', WOA.static.list_cache, 'div.dynamic-content');
      },

      /*************************************************************
       * Method - backToListView(e)
       *
       *    Show List View
       *************************************************************/
      backToListView : function(e)
      {
         $('div.dynamic-content').animate({ left : '0px' }, 300, function() { $('div.dynamic-content div.secondary-view').remove(); });
         delete WOA.static.current_post;
         delete WOA.static.current_post_h1;
         delete WOA.static.current_post_h2;
      },

      /*************************************************************
       * Method - updatePost()
       *
       *    Update Post Cache and Issue AJAX Request
       *************************************************************/
      updatePost : function()
      {
         var postId = WOA.static.current_post.id;
         var form = $('div.post-content');
         var title = form.find('div.header div.title input').val();
         var message = form.find('div.message textarea').val();
         var links = form.find('div.links ul li');
         var update = form.find('div.submit-cancel div.update');

         if (!update.hasClass('disabled')) {

            // Update Cached Post
            WOA.static.current_post.title = title;
            WOA.static.current_post.content.message = message;

            // Add/Update Links
            if (links.length > 0) {
               WOA.static.current_post.content.links = [];
               $(links).each(function(i,v) {
                  var link = {
                     post_id : postId,
                     title : $(v).find('a').text(),
                     url : $(v).find('a').attr('href')
                  };
                  WOA.static.current_post.content.links.push(link);
               });
            }

            // Remove Links
            else { delete WOA.static.current_post.content.links; }

            // Updated Cached List & List Title
            WOA.static.list_cache.items[WOA.static.list_cache.item_index[postId]] = WOA.static.current_post;
            $('div.list-container div.item[data-id=' + postId + '] div.title h1').text(title);

            // Issue AJAX
            update.addClass('disabled');
            WOA.pages.Updates.model.submitPostUpdate();
         }
      },

      /*************************************************************
       * Method - addPost()
       *
       *    Add to Post Cache and Issue AJAX Request
       *************************************************************/
      addPost : function()
      {
         var form = $('div.post-content');
         var title = form.find('div.header div.title input').val();
         var message = form.find('div.message textarea').val();
         var links = form.find('div.links ul li');
         var add = form.find('div.submit-cancel div.add-new');
         var project = form.find('div.header option:selected');
         var p_id = project.val();
         var p_name = project.attr('data-project');

         if (!add.hasClass('disabled') && p_name != 'undefined' && title != 'Add Post Title' && message != 'Add your message...') {

            // Cache Post
            WOA.static.current_post = {
               author     : WOA.static.user.username,
               project    : p_name,
               project_id : p_id,
               template   : 'updates-list-items',
               time       : WOA.utilities.Time.model.renderCurrentDate(),
               title      : title,
               content    : { message : message }
            };

            // Add Links
            if (links.length > 0) {
               WOA.static.current_post.content.links = [];
               $(links).each(function(i,v) {
                  var link = {
                     title : $(v).find('a').text(),
                     url : $(v).find('a').attr('href')
                  };
                  WOA.static.current_post.content.links.push(link);
               });
            }

            // Issue AJAX
            add.addClass('disabled');
            WOA.pages.Updates.model.submitPostAdd();
         }
      },

      /*************************************************************
       * Method - addPostError()
       *
       *   Add AJAX Error
       *************************************************************/
      addPostError : function()
      {
         $('div.submit-cancel div.add-new').removeClass('disabled');
         $('div.post-content p.error').text('Unable to add post.');
      },

      /*************************************************************
       * Method - addPostSuccess()
       *
       *    Display AJAX Success
       *************************************************************/
      addPostSuccess : function(data)
      {
         WOA.static.current_post = data;

         // Update List Cache
         var items = [data];
         $(WOA.static.list_cache.items).each(function(i,v) { items.push(v); });
         WOA.static.list_cache.items = items;

         // Update Page Header
         var h1 = $('div.content.right div.header h1.title');
         h1.text(WOA.static.current_post_h1);
         h1.siblings('h2').html(WOA.static.current_post_h2);

         // Display List
         WOA.pages.Updates.view.showPage(items);
      },

      /*************************************************************
       * Method - updatePostError()
       *
       *    Display AJAX Error
       *************************************************************/
      updatePostError : function()
      {
         $('div.submit-cancel div.update').removeClass('disabled');
         $('div.post-content p.error').text('Unable to update post.');
      },

      /*************************************************************
       * Method - updatePostSuccess()
       *
       *    Display AJAX Success
       *************************************************************/
      updatePostSuccess : function()
      {
         // Update Page Header
         var h1 = $('div.content.right div.header h1.title');
         h1.text(WOA.static.current_post_h1);
         h1.siblings('h2').html(WOA.static.current_post_h2);

         WOA.pages.Updates.view.backToPost();
      },

      /*************************************************************
       * Method - addLink()
       *
       *    Add Link to Add/Edit Post Form
       *************************************************************/
      addLink : function()
      {
         var links = $('div.links');
         var ul = links.find('ul');
         var titleInput = links.find('div.add-link input[name=title]');
         var title = titleInput.val();
         var urlInput = links.find('div.add-link input[name=url]');
         var url = urlInput.val();

         // Add UL if it doesn't exist
         if (ul.length == 0) {
            links.find('div.add-link').before("<ul></ul>");
            ul = links.find('ul');
         }

         // Validate Input & Render Link List Item
         if (title.trim() != '' && url.trim() != '' && title != 'Title' && url != 'URL') {
            var li = {
               title : title,
               url : url
            };
            Handlebars.renderTemplate('template-add-link', li, ul, 'append');
            titleInput.val('Title');
            urlInput.val('URL');
         }
      },

      /*************************************************************
       * Method - addLink()
       *
       *    Trigger Add Link to Add/Edit Post Form
       *************************************************************/
      addLinkTrigger : function(e) {
         if (e.keyCode == 13) {
            WOA.pages.Updates.view.addLink();
            $('div.dynamic-content div.add-link input:first-child').focus();
         }
      },

      /*************************************************************
       * Method - deleteLink(e)
       *
       *    Delete Link from Add/Edit Post Form
       *************************************************************/
      deleteLink : function(e)
      {
         var li = $(e.target).parents ('li');
         li.remove();
      },

      /*************************************************************
       * Method - addLinkFocus(e)
       *
       *    Clear Input Values on Focus
       *************************************************************/
      addLinkFocus : function(e)
      {
         var input = $(e.target);
         if (input.val().toLowerCase() == input.attr('name').toLowerCase()) { input.val(''); }
      },

      /*************************************************************
       * Method - addLinkBlur(e)
       *
       *    Replace Input Values on Focus
       *************************************************************/
      addLinkBlur : function(e)
      {
         var input = $(e.target);
         var name = input.attr('name');
         if (input.val() == '') {
            if (name == 'title') { input.val('Title'); }
            else if (name == 'url') { input.val('URL'); }
         }
      },

      /*************************************************************
       * Method - postTitleFocus(e)
       *
       *    Clear Input Values on Focus
       *************************************************************/
      postTitleFocus : function(e)
      {
         var input = $(e.target);
         if (input.val() == 'Add Post Title') { input.val(''); }
      },

      /*************************************************************
       * Method - addLinkBlur(e)
       *
       *    Replace Input Values on Focus
       *************************************************************/
      postTitleBlur : function(e)
      {
         var input = $(e.target);
         if (input.val().trim() == '') { input.val('Add Post Title'); }
      },

      /*************************************************************
       * Method - postTitleFocus(e)
       *
       *    Clear Textarea Values on Focus
       *************************************************************/
      postMessageFocus : function(e)
      {
         var input = $(e.target);
         if (input.val() == 'Add your message...') { input.val(''); }
      },

      /*************************************************************
       * Method - addMessageBlur(e)
       *
       *    Replace Textarea Values on Focus
       *************************************************************/
      postMessageBlur : function(e)
      {
         var input = $(e.target);
         if (input.val().trim() == '') { input.val('Add your message...'); }
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
      },

      /*************************************************************
       * Method - commentBlur(e)
       *
       *    Replace Textarea Value on Focus
       *************************************************************/
      commentBlur : function(e)
      {
         var input = $(e.target);
         if (input.val().trim() == '') { input.val('Add your comment...'); }
      },

      /*************************************************************
       * Method - commentFocus(e)
       *
       *    Clear Textarea Values on Focus
       *************************************************************/
      commentFocus : function(e)
      {
         var input = $(e.target);
         if (input.val() == 'Add your comment...') { input.val(''); }
      },

      /*************************************************************
       * Method - addComment(e)
       *
       *    Validate User Input and Create POST Object
       *************************************************************/
      addComment : function(e)
      {
         var button = $('div.submit-comment');
         if (!button.hasClass('disabled'))
         {
            var div = $('div.add-comment');
            var comment = div.find('textarea[name=comment]').val();

            // Validated
            if (comment != '' && comment != 'Add your comment...')
            {
               var data = {
                  post_id : WOA.static.current_post.id,
                  message : comment
               };

               button.addClass('disabled');
               WOA.pages.Updates.model.submitComment(data);
            }

            // Empty Field
            else {}
         }
      },

      /*************************************************************
       * Method - addCommentSuccess(data)
       *
       *    Comment Added, Update Cache
       *************************************************************/
      addCommentSuccess : function(data)
      {
         // Clear Field and Enable Button
         var div = $('div.add-comment');
         div.find('textarea[name=comment]').val('Add your comment...');
         $('div.submit-comment').removeClass('disabled');

         // Prep Comment
         var comment = {
            author : WOA.static.user.username,
            time : WOA.utilities.Time.model.renderCurrentDate(),
            message : data
         };

         // 1st Comment
         if (typeof WOA.static.current_post.content.comments === 'undefined')
         {
            WOA.static.current_post.content.comments = [comment];
         }

         // Not 1st Comment
         else
         {
            WOA.static.current_post.content.comments.push(comment);
         }

         // Append New Comment
         Handlebars.renderTemplate('template-single-comment', comment, 'div.comments span.collapseable', 'append');
      },

      /*************************************************************
       * Method - addCommentFail(data)
       *
       *    Comment NOT Added
       *************************************************************/
      addCommentFail : function(data)
      {
         var div = $('div.add-comment');
         div.find('textarea[name=comment]').val('');
         $('div.submit-comment').removeClass('disabled');
      },

      /*************************************************************
       * Method - fadeContent()
       *
       *    Fade Content for Delete Post Modal
       *************************************************************/
      fadeContent : function()
      {
         $('div.dynamic-shell').addClass('faded');
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
         $(document).on('click', 'div.dynamic-content div.sub-page-actions div.add-post', WOA.pages.Updates.view.addPostForm);
         $(document).on('click', 'div.dynamic-content div.sub-page-actions div.edit', WOA.pages.Updates.view.editPost);
         $(document).on('click', 'div.dynamic-content div.submit-cancel div.cancel', WOA.pages.Updates.view.backToPost);
         $(document).on('click', 'div.dynamic-content div.submit-cancel div.cancel-new', WOA.pages.Updates.view.backToPostFromNew);
         $(document).on('click', 'div.dynamic-content div.submit-cancel div.update', WOA.pages.Updates.view.updatePost);
         $(document).on('click', 'div.dynamic-content div.submit-cancel div.add-new', WOA.pages.Updates.view.addPost);
         $(document).on('click', 'div.dynamic-content div.submit-cancel div.delete-post', WOA.pages.Updates.view.fadeContent);
         $(document).on('click', 'div.dynamic-content div.add-link div.add', WOA.pages.Updates.view.addLink);
         $(document).on('keydown', 'div.dynamic-content div.add-link input', WOA.pages.Updates.view.addLinkTrigger);
         $(document).on('focus', 'div.dynamic-content div.add-link input', WOA.pages.Updates.view.addLinkFocus);
         $(document).on('blur',  'div.dynamic-content div.add-link input', WOA.pages.Updates.view.addLinkBlur);
         $(document).on('click', 'div.dynamic-content div.links ul li div.delete-link', WOA.pages.Updates.view.deleteLink);
         $(document).on('focus', 'div.dynamic-content div.post-content div.header div.title input', WOA.pages.Updates.view.postTitleFocus);
         $(document).on('blur',  'div.dynamic-content div.post-content div.header div.title input', WOA.pages.Updates.view.postTitleBlur);
         $(document).on('focus', 'div.dynamic-content div.post-content div.message textarea', WOA.pages.Updates.view.postMessageFocus);
         $(document).on('blur',  'div.dynamic-content div.post-content div.message textarea', WOA.pages.Updates.view.postMessageBlur);
         $(document).on('click', 'div.dynamic-content div.secondary-view div.post-content div.comments i', WOA.pages.Updates.view.toggleCommentsCollapse);
         $(document).on('focus', 'div.dynamic-content div.add-comment textarea[name=comment]', WOA.pages.Updates.view.commentFocus);
         $(document).on('blur',  'div.dynamic-content div.add-comment textarea[name=comment]', WOA.pages.Updates.view.commentBlur);
         $(document).on('click', 'div.dynamic-content div.submit-comment', WOA.pages.Updates.view.addComment);
      }
   }
};

WOA.pages.Updates.controller.init();