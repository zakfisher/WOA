<?php session_start(); ?>

         <!-- Updates List View -->
         <script id="template-updates-list" type="text/x-handlebars-template">
            <div class="sub-page-actions">
               <div class="inner">
                  {{renderSearchField}}
                  {{renderPaginationTemplate pagination.item_count pagination.items_per_page pagination.float}}
                  <div class="clr"></div>
               </div>
               <div class="shadow"></div>
            </div>
            <div class="list-container updates clr">
               {{renderListItems list_items_template items pagination.items_per_page}}
               <div class="shadow down"></div>
               {{renderPaginationTemplate pagination.item_count pagination.items_per_page pagination.extra_class}}
            </div>
         </script>

         <!-- List Items -->
         <script id="template-updates-list-items" type="text/x-handlebars-template">
            {{#each pages}}
            <span data-list-page="{{page_number}}" class="page-set{{#if hidden}} hidden{{/if}}">
               {{#each items}}
               <div class="item" data-id="{{id}}">
                  <div class="inner">
                     <div class="item-content left">
                        <div class="title">
                           <h1>{{title}}</h1>
                        </div>
                        <div class="sub-info">
                           <div class="info left first">{{time}}</div>
                           <div class="info left">{{author}}</div>
                           <div class="info left last">{{project}}</div>
                        </div>
                     </div>
                     <div class="arrow right"></div>
                     <div class="clr"></div>
                  </div>
               </div>
               {{/each}}
            </span>
            {{/each}}
            <div class="clr"></div>
         </script>

         <!-- Single Post View -->
         <script id="template-single-post" type="text/x-handlebars-template">

         </script>

         <!-- Pagination View -->
         <script id="template-pagination" type="text/x-handlebars-template">
            <div class="pagination{{#if extra_class}} {{extra_class}}{{/if}}">
               <div class="btn btn-inverse next right">Next <i class="icon-white icon-arrow-right"></i></div>
               <div class="tracker right">
                  <p><span class="current-page">1</span> / <span class="total-pages">{{page_count}}</span></p>
               </div>
               <div class="btn btn-inverse disabled prev right"><i class="icon-white icon-arrow-left"></i> Prev</div>
            </div>
         </script>

         <!-- Search Field -->
         <script id="template-search-field" type="text/x-handlebars-template">
            <div class="search left">
               <input type="text" placeholder="search" name="search" />
               <i class="icon-search"></i>
            </div>
         </script>