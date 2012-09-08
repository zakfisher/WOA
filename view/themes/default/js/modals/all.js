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
         var id = $(e.target).attr('id').substr(5);
         $('#' + id).show();
      },

      /*************************************************************
       * Method - hideModal()
       *
       *    Hide Modal
       *************************************************************/
      hideModal : function()
      {
         $('div.modal').parent().hide();
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

         // Show Modal
         $(document).on('click', '.show-modal', WOA.modals.view.showModal);

         // Hide Modal
         $(document).on('click', 'div.modal .close, div.modal-backdrop', WOA.modals.view.hideModal);
         $(document).on('keydown', 'body', function(e) { if (e.keyCode == 27) { WOA.modals.view.hideModal(); } });

         // Terms & Conditions
         $(document).on('click', '#terms-modal div.go-back', function() { $('#show-sign-up-modal').click(); });
      }
   }
};

// Initialize Instance
WOA.modals.controller.init();

/** Import Modals **/
//$.getScript('view/themes/default/js/modals/login.js');
//$.getScript('view/themes/default/js/modals/sign-up.js');