<?php session_start(); ?>

         <!-- Updates List View -->
         <script id="template-updates-list" type="text/x-handlebars-template">
            <div class="sub-page-actions">
               <div class="inner">
                  {{renderSearchField}}
                  {{renderPaginationTemplate pagination.post_count pagination.posts_per_page}}
                  <div class="clr"></div>
               </div>
               <div class="shadow"></div>
            </div>
            <div class="list-container updates clr">
               {{renderInnerTemplate list_items_template this}}
            </div>
         </script>

         <!-- List Items -->
         <script id="template-updates-list-items" type="text/x-handlebars-template">
            {{#each posts}}
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
            <div class="clr"></div>
         </script>

         <!-- Single Post View -->
         <script id="template-single-post" type="text/x-handlebars-template">

         </script>

         <!-- Pagination View -->
         <script id="template-pagination" type="text/x-handlebars-template">
            <div class="pagination right">
               <div class="btn btn-inverse hidden prev left"><i class="icon-white icon-arrow-left"></i> Prev</div>
               <div class="tracker left">
                  <p><span class="current-page">1</span> / {{page_count}}</p>
               </div>
               <div class="btn btn-inverse next left">Next <i class="icon-white icon-arrow-right"></i></div>
            </div>
         </script>

         <!-- Search Field -->
         <script id="template-search-field" type="text/x-handlebars-template">
            <div class="search left">
               <input type="text" placeholder="search" name="search" />
               <i class="icon-search"></i>
            </div>
         </script>