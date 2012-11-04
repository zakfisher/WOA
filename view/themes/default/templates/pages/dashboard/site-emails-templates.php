<?php session_start(); ?>

         <!-- Updates Items -->
         <script id="template-site-emails-list-items" type="text/x-handlebars-template">
            <div class="title">
               <h1>{{subject}}</h1>
            </div>
            <div class="sub-info">
               <div class="info left first">{{time}}</div>
               <div class="info left last">{{sender}}</div>
            </div>
         </script>
