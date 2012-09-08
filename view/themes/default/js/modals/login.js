/*********************************************
 * UpMo Login Modal Class
 *
 * Desc:  Javascript Login Modal Object
 *
 * Creator: Zachary Fisher - zach@upmo.com
 *
 * Copyright (c) Upwardly Mobile, Inc., 2012
 *
 * Search Keys:
 * - Model
     >> postLogin
 * - View
     >> submitLogin
     >> inputEnterClick
 * - Controller
 *********************************************/
UpMo.modals.Login =
{
   model : {
      /*************************************************************
       * Method - postLogin()
       *
       *    Issue POST Request w/ User Credentials for Login
       *************************************************************/
      postLogin : function(postData)
      {
         $.post('login/go', postData, function(data) {
            if (data == 'false')
            {
               $('#login-modal').find('p.msg').text('Invalid email or password.');
               $('#login-form div.login').removeClass('inactive');
            }
            else
            {
               $('#login-modal').find('p.msg').text('Redirecting to your instance...');
               location.href = data;
            }
         });
      }
   },
   view : {
      /*************************************************************
       * Method - submitLogin()
       *
       *    Redirect User to Appropriate Instance
       *************************************************************/
      submitLogin : function()
      {
         var form = $('#login-form');
         var msg = $('#login-modal').find('p.msg');
         var btn = form.find('div.login');
         var email = form.find('input[name=email]').val();
         var password = form.find('input[name=password]').val();
         var emptyFields = (email == '' || password == '') ? true : false;

         if (!btn.hasClass('inactive'))
         {
            btn.addClass('inactive');

            // No Empty Fields
            if (!emptyFields)
            {
               // Valid Email
               if (email.indexOf('@') != -1)
               {
                  // Create POST Object
                  var postData = {
                     email : email,
                     password : password
                  };

                  // Issue POST Request
                  UpMo.modals.Login.model.postLogin(postData);
               }

               // Invalid Email
               else
               {
                  msg.text('Please enter a valid email.');
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
         if (e.keyCode == 13) { UpMo.modals.Login.view.submitLogin(); }
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

         // Log In
         $(document).on('click', '#login-form div.submit div.login', UpMo.modals.Login.view.submitLogin);

         // Clear Fields / Submit Form
         $(document).on('keydown', '#login-form input', UpMo.modals.Login.view.inputEnterClick);
      }
   }
};

// Initialize Instance
UpMo.modals.Login.controller.init();
