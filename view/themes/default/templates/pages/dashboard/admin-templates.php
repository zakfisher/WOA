<?php session_start(); ?>

         <!-- Admin Items -->
         <script id="template-admin-list-items" type="text/x-handlebars-template">
            {{#each items}}
            <div class="item{{#if last}} last{{/if}}">
               <div class="inner">
                  <div class="item-content left">
                     <div class="title">
                        <h1>{{task}}</h1>
                     </div>
                     <div class="sub-info">
                        <div class="info left only">Total: {{total}}</div>
                     </div>
                  </div>
                  <div class="arrow right"></div>
                  <div class="clr"></div>
               </div>
            </div>
            {{/each}}
            <div class="shadow down"></div>
         </script>
