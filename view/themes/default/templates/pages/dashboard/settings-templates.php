<?php session_start(); ?>

         <!-- Settings Fields -->
         <script id="template-settings-fields" type="text/x-handlebars-template">
            <div class="main-view">
               <div class="form settings">
                  {{#each fields}}
                  <div class="input {{#if right}}right{{else}}left{{/if}}">
                     <p>{{title}}</p>
                     <input type="{{#if password}}password{{else}}text{{/if}}" name="{{name}}" value="{{value}}" {{#if maxlength}} maxlength="{{maxlength}}" {{/if}}/>
                  </div>
                  {{#if right}}
                  <div class="clr"></div>
                  {{/if}}
                  {{/each}}
               </div>
               <!-- end .form -->
               <div class="submit-form">
                  <p class="error left"></p>
                  <div class="btn btn-inverse change-settings right">Save Changes</div>
               </div>
               <!-- end .submit-form -->
            </div>
         </script>
