/*********************************************
 * WOA Settings Page Class
 *
 * Desc:  Javascript Settings Page Object
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
WOA.pages.Settings =
{
   model : {
      /*************************************************************
       * Method - submitChanges(data)
       *
       *    POST user data
       *************************************************************/
      submitChanges : function(data)
      {
         $.post(WOA.static.env + 'user/update_user_info', data, WOA.pages.Settings.view.updateSuccess).error(WOA.pages.Settings.view.updateFail);
      }
   },
   view : {
      /*************************************************************
       * Method - loadPage()
       *
       *    Init Page Logic
       *************************************************************/
      loadPage : function() {},

      /*************************************************************
       * Method - validateForm(e)
       *
       *    Init Page Logic
       *************************************************************/
      validateForm : function(e) {
         var form = $('div.form');
         var msg = $('div.submit-form p');
         var button = $(e.target);

         if (!button.hasClass('disabled'))
         {
            var username = form.find('input[name=username]').val();
            var email = form.find('input[name=email]').val();
            var firstName = form.find('input[name=first_name]').val();
            var lastName = form.find('input[name=last_name]').val();
            var password = form.find('input[name=password]').val();
            var confirmPW = form.find('input[name=confirm_pw]').val();
            var changesMade = (username != WOA.static.user.username || email != WOA.static.user.email || firstName != WOA.static.user.first_name || lastName != WOA.static.user.last_name || password != '' || confirmPW != '');

            // Changes Made
            if (changesMade)
            {
               button.addClass('disabled');
               var data = {};

               // Check Username
               if (username != WOA.static.user.username) { data.username = username; }

               // Check Email
               if (email != WOA.static.user.email) {
                  if (email.indexOf("@") != -1) { data.email = email; }
                  else {
                     msg.text('Please enter a valid email.');
                     button.removeClass('disabled');
                     return false;
                  }
               }

               // Check First Name
               if (firstName != WOA.static.user.first_name) { data.first_name = firstName; }

               // Check Last Name
               if (lastName != WOA.static.user.last_name) { data.last_name = lastName; }

               // Check Password
               if (password != '' || confirmPW != '')
               {
                  if (password == confirmPW) { data.password = password; }
                  else {
                     msg.text('Passwords must match.');
                     button.removeClass('disabled');
                     return false;
                  }
               }

               // Post User Data
               WOA.pages.Settings.model.submitChanges(data);
            }

            // NO Changes Made
            else { msg.text('No changes made.'); }
         }
      },

      /*************************************************************
       * Method - updateSuccess(data)
       *
       *    Settings were updated
       *************************************************************/
      updateSuccess : function(data) {
         $('div.submit-form div.btn.change-settings').removeClass('disabled');

         // Error
         if (typeof data.error != 'undefined') { $('div.submit-form p').text(data.error); }

         // Success
         else {
            // Update User Cache
            WOA.user.model.setUserCache(data);

            console.log(data);

            // Display Success Message
            $('div.submit-form p').addClass('success').removeClass('error').text('Settings updated successfully.');

            // Update Input Values
            var form = $('div.form');
            form.find('input[type=password]').val('');
            for (var key in WOA.static.user)
            {
               if (key != 'logout')
               {
                  form.find('input[name=' + key + ']').val(WOA.static.user[key]);
                  if (key == 'username') { $('a.username').text(WOA.static.user[key]); }
               }
            }
         }
      },

      /*************************************************************
       * Method - updateFail()
       *
       *    Settings were NOT updated
       *************************************************************/
      updateFail : function() {
         $('div.submit-form div.btn.change-settings').removeClass('disabled');
         $('div.submit-form p').text('Unable to process.');
      },

      /*************************************************************
       * Method - resetErrorMsg()
       *
       *    Reset Error Message
       *************************************************************/
      resetErrorMsg : function() {
         $('div.submit-form p').removeClass('success').addClass('error').text('');
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
         $(document).on('click', 'div.submit-form div.btn.change-settings', WOA.pages.Settings.view.validateForm);

         // Clear Error
         $(document).on('focus', 'div.form input', WOA.pages.Settings.view.resetErrorMsg);
      }
   }
};

WOA.pages.Settings.controller.init();