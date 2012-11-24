<?php session_start(); ?>

         <!-- Sub Page Wrapper -->
         <script id="template-sub-page-wrapper" type="text/x-handlebars-template">
            <div class="inner-container">
               <div class="header">
                  <h1 class="title">{{title}}</h1>
                  <h2>{{sub_text}}</h2>
                  <div class="shadow{{#if shadow_down}} down{{/if}} first"></div>
                  <div class="dynamic-shell">
                     <div class="dynamic-content">
                        {{#if admin}}
                        <div class="main-view">
                           <div class="list-container admin clr">
                              <div class="page-loading"></div>
                           </div>
                        </div>
                        {{else}}
                        <div class="page-loading"></div>
                        {{/if}}
                     </div>
                     <!-- end .dynamic-content -->
                  </div>
                  <!-- end .dynamic-shell -->
               </div>
               <!-- end .header -->
            </div>
            <!-- end .inner-container -->
         </script>
