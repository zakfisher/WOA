<?php session_start(); ?>

         <!-- Projects Items -->
         <script id="template-projects-list-items" type="text/x-handlebars-template">
            <div class="title">
               <h1>{{project}}</h1>
            </div>
            <div class="sub-info">
               <div class="info left first">Updated: {{last_updated}}</div>
               <div class="info left last">Users: {{user_count}}</div>
            </div>
         </script>
