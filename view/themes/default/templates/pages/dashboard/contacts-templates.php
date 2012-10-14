<?php session_start(); ?>

         <!-- Contacts Items -->
         <script id="template-contacts-list-items" type="text/x-handlebars-template">
            <div class="title">
               <h1>{{first_name}} {{last_name}}</h1>
            </div>
            <div class="sub-info">
               <div class="info left first">{{type}}</div>
               {{#if title}}<div class="info left">{{title}}</div>{{/if}}
               {{#if company}}<div class="info left last">{{company}}</div>{{/if}}
            </div>
         </script>
