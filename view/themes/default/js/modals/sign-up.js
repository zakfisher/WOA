/*********************************************
 * UpMo Signup Modal Class
 *
 * Desc:  Javascript Signup Modal Object
 *
 * Creator: Zachary Fisher - zach@upmo.com
 *
 * Copyright (c) Upwardly Mobile, Inc., 2012
 *
 * Search Keys:
 * - Model
     >> postSignup
 * - View
     >> toggleCheckbox
     >> createAccount
     >> inputEnterClick
 * - Controller
 *********************************************/
UpMo.modals.Signup =
{
   model : {
      /*************************************************************
       * Method - postSignup()
       *
       *    Issue POST Request w/ User Credentials for Signup
       *************************************************************/
      postSignup : function(postData)
      {
         $.post('signup/go', postData, function(data) {
            if (data == 'true')
            {
               $('#sign-up-form').addClass('hidden'); $('#sign-up-success').removeClass('hidden');
            }
            else
            {
               $('#sign-up-modal').find('p.msg').text(data);
            }
            $('#sign-up-modal div.create-account').removeClass('inactive');
         });
      }
   },
   view : {
      /*************************************************************
       * Method - toggleCheckbox()
       *
       *    Check/Uncheck Checkbox
       *************************************************************/
      toggleCheckbox : function()
      {
         var checkbox = $('#sign-up-form div.terms div.checkbox');
         if (checkbox.hasClass('checked'))
         {
            checkbox.removeClass('checked').find('input[type=checkbox]').removeAttr('checked');
         }
         else
         {
            checkbox.addClass('checked').find('input[type=checkbox]').attr('checked', 'checked');
         }
      },

      /*************************************************************
       * Method - createAccount()
       *
       *    Create User Account
       *************************************************************/
      createAccount : function()
      {
         var form = $('#sign-up-form');
         var msg = $('#sign-up-modal').find('p.msg');
         var btn = form.find('div.create-account');
         var firstName = form.find('input[name=first_name]').val();
         var lastName = form.find('input[name=last_name]').val();
         var email = form.find('input[name=email]').val();
         var title = form.find('input[name=title]').val();
         var password = form.find('input[name=password]').val();
         var passwordConfirm = form.find('input[name=confirm_password]').val();
         var checkbox = form.find('input[type=checkbox]');
         var emptyFields = (firstName == '' || lastName == '' || email == '' || password == '' || passwordConfirm == '') ? true : false;

         if (!btn.hasClass('inactive'))
         {
            btn.addClass('inactive');

            // No Empty Fields
            if (!emptyFields)
            {
               // Terms Checkbox Checked
               if (checkbox.attr('checked') == 'checked')
               {
                  // Valid Email
                  if (email.indexOf('@') != -1)
                  {
                     // Passwords Match
                     if (password == passwordConfirm)
                     {
                        // Create POST Object
                        var postData = {
                           first_name : firstName,
                           last_name : lastName,
                           email : email,
                           title : title,
                           password : password
                        };

                        // Issue POST Request
                        UpMo.modals.Signup.model.postSignup(postData);
                     }

                     // Passwords Don't Match
                     else
                     {
                        msg.text('Passwords do not match.');
                        btn.removeClass('inactive');
                     }
                  }

                  // Invalid Email
                  else
                  {
                     msg.text('Please enter a valid email.');
                     btn.removeClass('inactive');
                  }
               }

               // Terms Checkbox Unchecked
               else
               {
                  msg.text('You must agree to the terms and conditions.');
                  btn.removeClass('inactive');
               }
            }

            // Empty Fields
            else
            {
               msg.text('Please fill out all fields.');
               btn.removeClass('inactive');
            }
         }
      },

      /*************************************************************
       * Method - inputEnterClick()
       *
       *    Keydown Event for Input Fields
       *************************************************************/
      inputEnterClick : function(e)
      {
         if (e.keyCode == 13) { UpMo.modals.Signup.view.createAccount(); }
         else { $('p.msg').text(''); }
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

         // Toggle Checkbox
         $(document).on('click', '#sign-up-form div.terms div.checkbox', UpMo.modals.Signup.view.toggleCheckbox);

         // Create Account
         $(document).on('click', '#sign-up-form div.create-account', UpMo.modals.Signup.view.createAccount);

         // Clear Fields / Submit Form
         $(document).on('keydown', '#sign-up-form input', UpMo.modals.Signup.view.inputEnterClick);
      }
   }
};

// Initialize Instance
UpMo.modals.Signup.controller.init();
