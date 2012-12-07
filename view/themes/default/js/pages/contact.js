/*********************************************
 * WOA Contact Page Class
 *
 * Desc:  Javascript Contact Page Object
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
WOA.pages.Contact = new function() {

   var me = this;

   me.model = {

      /*************************************************************
       * Method - sendEmail()
       *
       *    POST User Input
       *************************************************************/
      sendEmail : function(data) { $.post('contact/submit_form', data, me.view.postSuccess).error(me.postFail); }

   };

   me.view = {

      /*************************************************************
       * Method - loadPage()
       *
       *
       *************************************************************/
      loadPage : function() {},

      /*************************************************************
       * Method - postSuccess()
       *
       *    Email sent successfully
       *************************************************************/
      postSuccess : function() {
         $('div.submit-form p.error').text('Your email has been sent!').addClass('success').removeClass('error');
         $('div.form.contact').find('input, textarea').val('');
      },

      /*************************************************************
       * Method - postFail()
       *
       *    Email not sent
       *************************************************************/
      postFail : function() {
         $('div.submit-form p.error').text('Unable to process.').removeClass('success').addClass('error');
         $('div.form.contact').find('input, textarea').val('');
      },

      /*************************************************************
       * Method - submitForm()
       *
       *    Validate User Input
       *************************************************************/
      submitForm : function() {
         var form = $('div.form.contact');
         var msg = $('div.submit-form p.error');
         var data = {
            name : form.find('input[name=name]').val(),
            email : form.find('input[name=email]').val(),
            subject : form.find('input[name=subject]').val(),
            message : form.find('textarea[name=message]').val()
         };

         // Check for Empty Fields
         var emptyFields = false;
         for (var k in data) {
            if (data[k] == '') {
               emptyFields = true;
               break;
            }
         }

         // No Empty Fields
         if (!emptyFields) {

            // Validate Email
            if (data['email'].indexOf("@") != -1) me.model.sendEmail(data);

            // Invalid Email
            else msg.text('Please enter a valid email.').removeClass('success').addClass('error');

         }

         // Empty Fields
         else msg.text('All fields are required.').removeClass('success').addClass('error');

      }

   };

   /** Handlers **/
   $(document).on('click', 'div.submit-form div.send-email', me.view.submitForm);

};