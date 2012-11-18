<?php session_start(); ?>

         <!-- Biz Plan Sub Nav -->
         <script id="template-biz-plan-sub-nav" type="text/x-handlebars-template">
            {{#each this}}
            <li data-sub-page="{{sub_page}}">{{title}}</li>
            {{/each}}
         </script>
