/*********************************************
 * WOA Modal Class
 *
 * Desc:  Javascript Modal Object
 *
 * Creator: Zachary Fisher - zfisher@worldofanarchy.com
 *
 * Copyright (c) Anarchy Productions International LLC, 2012
 *
 * Search Keys:
 * - Model
 * - View
     >> showModal
     >> hideModal
 * - Controller
 * - Import Modals
 *********************************************/
WOA.modals =
{
   model : {},
   view : {
      /*************************************************************
       * Method - showModal(e)
       *
       *    Show Modal
       *************************************************************/
      showModal : function(e)
      {
         WOA.modals.view.hideModal();
         Handlebars.renderTemplate('template-modal-wrapper', WOA.static.modals[$(e.target).attr('data-modal')], 'body', 'append');
         $('#' + WOA.static.modals[$(e.target).attr('data-modal')].template).show();
      },

      /*************************************************************
       * Method - hideModal()
       *
       *    Hide Modal
       *************************************************************/
      hideModal : function()
      {
         $('div.modal-parent').remove();
      }
   },
   controller :
   {
      /*************************************************************
       * Init Method
       *************************************************************/
      init : function()
      {
         WOA.static.modals = {
            forgot_password : { template : 'forgot-password-modal' },
            confirm_post_delete : { template : 'confirm-post-delete-modal' }
         };

         /** Handlers **/

         // Show Modal
         $(document).on('click', '.show-modal', WOA.modals.view.showModal);

         // Hide Modal
         $(document).on('click', 'div.modal .close, div.modal-backdrop, div.modal .x', WOA.modals.view.hideModal);
         $(document).on('keydown', 'body', function(e) { if (e.keyCode == 27) { WOA.modals.view.hideModal(); } });
      }
   }
};

// Initialize Instance
WOA.modals.controller.init();

/** Import Modals **/
$.getScript('view/themes/default/js/modals/forgot-password.js');
$.getScript('view/themes/default/js/modals/confirm-post-delete.js');