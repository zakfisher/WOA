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

         <!-- Overview -->
         <script id="template-projects-overview" type="text/x-handlebars-template">
            <div class="main-view">
               <div class="overview">
                  <p>{{description}}</p>
                  <p>Content: {{content}}</p>
               </div>
            </div>
         </script>

         <!-- Business Plan -->
         <script id="template-projects-biz-plan" type="text/x-handlebars-template">
            <div class="biz-plan content">
                {{#each this}}
                <div class="section">
                    <h1>{{section}}</h1>
                    {{#each articles}}
                    <div class="article">
                        <h3>{{article}}</h3>
                        <p>{{body}}</p>
                    </div>
                    {{/each}}
                </div>
                {{/each}}
            </div>
         </script>

         <!-- Contracts Items-->
         <script id="template-projects-contracts" type="text/x-handlebars-template">
            <div class="title">
               <h1>{{contract_name}}</h1>
            </div>
            <div class="sub-info">
               <div class="info left first">{{username}}</div>
               <div class="info left">{{email}}</div>
               <div class="info left last">{{#if signature}}signed{{else}}unsigned{{/if}}</div>
            </div>
         </script>
