<?php session_start(); ?>

         <!-- Single Project Sub Nav -->
         <script id="template-project-sub-nav" type="text/x-handlebars-template">
            {{#each this}}
            <li data-sub-page="{{sub_page}}">{{title}}</li>
            {{/each}}
         </script>

         <!-- Single Project Wrapper -->
         <script id="template-project-wrapper" type="text/x-handlebars-template">
            <h1>{{title}}</h1>
            <h2><b>{{project}}</b></h2>
            <div class="shadow{{#if shadow_down}} down{{/if}}"></div>
            <div class="dynamic-shell">
               <div class="dynamic-content">
                  <div class="page-loading"></div>
               </div>
               <!-- end .dynamic-content -->
            </div>
            <!-- end .dynamic-shell -->
         </script>

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
