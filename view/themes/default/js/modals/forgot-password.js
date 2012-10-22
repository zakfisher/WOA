/*********************************************
 * WOA Forgot Password Modal Class
 *
 * Desc:  Javascript Forgot Password Modal Object
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
WOA.modals.ForgotPassword =
{
   model : {
      /*************************************************************
       * Method - sendRequest(data)
       *
       *    Issue POST Request with User Email
       *************************************************************/
      sendRequest : function(data)
      {
         $.post(WOA.static.env + 'user/reset_user_password', data, WOA.modals.ForgotPassword.view.resetSuccess).error(WOA.modals.ForgotPassword.view.resetFail);
      }
   },
   view : {
      /*************************************************************
       * Method - submitResetForm(e)
       *
       *    Validate User Input and Prep Post Request
       *************************************************************/
      submitResetForm : function(e)
      {
         var button = ($(e.target).is('.btn')) ? $(e.target) : $(e.target).parents('.btn');
         if (!button.hasClass('disabled'))
         {
            button.addClass('disabled');
            var form = $('#reset-password-form');
            var msg = $('div.modal-footer p.error');
            var email = form.find('input[name=email]').val();
            var confirmEmail = form.find('input[name=confirm_email]').val();
            var emptyFields = (email == '' || confirmEmail == '');
            if (!emptyFields)
            {
               if (email == confirmEmail)
               {
                  if (email.indexOf("@") != -1)
                  {
                     WOA.modals.ForgotPassword.model.sendRequest({email : email});
                  }
                  else
                  {
                     msg.text('Please enter a valid email.');
                     button.removeClass('disabled');
                  }
               }
               else
               {
                  msg.text('Emails don\'t match.');
                  button.removeClass('disabled');
               }
            }
            else
            {
               msg.text('Please fill out both fields.');
               button.removeClass('disabled');
            }
         }
      },
      /*************************************************************
       * Method - clearErrorMsg()
       *
       *    Clear Error Message
       *************************************************************/
      clearErrorMsg : function()
      {
         $('div.modal-footer p.error').text('').removeClass('success');
      },
      /*************************************************************
       * Method - resetSuccess()
       *
       *    AJAX Success
       *************************************************************/
      resetSuccess : function(data)
      {
         console.log(data);
         var msg = $('div.modal-footer p.error');
         if (typeof data.error == 'undefined')
         {
            msg.addClass('success').text('Password reset! Please check your email.');
         }
         else { msg.text(data.error); }
         $('#reset-password').removeClass('disabled');
      },
      /*************************************************************
       * Method - resetFail(data)
       *
       *    AJAX Success
       *************************************************************/
      resetFail : function(data)
      {
         $('div.modal-footer p.error').text('Unable to process request.');
         $('#reset-password').removeClass('disabled');
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

         // Submit Form
         $(document).on('click', '#reset-password', WOA.modals.ForgotPassword.view.submitResetForm);

         // Clear Fields
         $(document).on('focus', '#reset-password-form .input', WOA.modals.ForgotPassword.view.clearErrorMsg)
      }
   }
};

// Initialize Instance
WOA.modals.ForgotPassword.controller.init();