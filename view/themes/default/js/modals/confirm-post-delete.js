/*********************************************
 * WOA Delete Post Modal Class
 *
 * Desc:  Javascript Delete Post Modal Object
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
WOA.modals.DeletePost =
{
   model : {
      /*************************************************************
       * Method - submitPostDelete(data)
       *
       *    Issue GET Request with Post ID
       *************************************************************/
      submitPostDelete : function()
      {
         $.get(WOA.static.env + 'updates/submit_delete_post/' + WOA.static.current_post.id + '/' + WOA.static.user.username, WOA.modals.DeletePost.view.deletePostSuccess).error(WOA.modals.DeletePost.view.deletePostFail);
      }
   },
   view : {
      /*************************************************************
       * Method - deletePost()
       *
       *    Prep for AJAX
       *************************************************************/
      deletePost : function()
      {
         var button = $('#confirm-post-delete');
         if (!button.hasClass('disabled'))
         {
            button.addClass('disabled');
            WOA.modals.DeletePost.model.submitPostDelete();
         }
      },

      /*************************************************************
       * Method - deletePostSuccess()
       *
       *    AJAX Success - Update Cache
       *************************************************************/
      deletePostSuccess : function()
      {
         WOA.modals.view.hideModal();

         // Clear Cache
         WOA.static.list_cache.items.splice(WOA.static.list_cache.item_index[WOA.static.current_post.id], 1);
         WOA.pages.Updates.view.showPage(WOA.static.list_cache.items);

         // Update Page Header
         var h1 = $('div.content.right div.header h1.title');
         h1.text(WOA.static.current_post_h1);
         h1.siblings('h2').html(WOA.static.current_post_h2);

         // Display List
         WOA.pages.Updates.view.backToListView();
      },

      /*************************************************************
       * Method - deletePostFail()
       *
       *    AJAX Fail
       *************************************************************/
      deletePostFail : function()
      {

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
         $(document).on('click', '#confirm-post-delete', WOA.modals.DeletePost.view.deletePost);
      }
   }
};

// Initialize Instance
WOA.modals.DeletePost.controller.init();