<?php session_start(); ?>

         <!-- List View -->
         <script id="template-list" type="text/x-handlebars-template">
            <div class="main-view">
               <div class="sub-page-actions">
                  <div class="inner">
                     {{#if posts}}
                     <div class="btn btn-inverse left mr10 add-post">New Post <i class="icon-white icon-plus"></i></div>
                     {{/if}}
<?php if ($_SESSION['user']['access'] == 'admin'): ?>
                     {{#if projects}}
                     <div class="btn btn-inverse left add-project mr10">New Project <i class="icon-white icon-plus"></i></div>
                     {{/if}}
<?php endif; ?>
                     {{#if contacts}}
                     <div class="btn btn-inverse left add-contact mr10">New Contact <i class="icon-white icon-plus"></i></div>
                     {{/if}}
                     {{renderSearchField}}
                     {{#if contacts}}
                     <div class="filter-by right">
                        <div class="btn toggle-options">
                           <p class="left">Filter By</p>
                           <div class="caret"></div>
                        </div>
                        <div class="dropdown-menu">
                           <div class="list">
                              <div class="li" data-filter="all">
                                 <p>All</p>
                              </div>
                              {{renderContactTypes items}}
                              <div class="clr"></div>
                           </div>
                        </div>
                     </div>
                     {{else}}
                     <span class="page-nav">
                     {{renderPaginationTemplate pagination.item_count pagination.items_per_page pagination.float}}
                     </span>
                     {{/if}}
                     <div class="clr"></div>
                  </div>
                  <div class="shadow"></div>
               </div>
               <div class="list-container {{type}} clr">
                  {{renderListItems items pagination.items_per_page}}
                  <div class="shadow down"></div>
                  {{renderPaginationTemplate pagination.item_count pagination.items_per_page pagination.extra_class}}
               </div>
            </div>
         </script>

         <!-- Pagination View -->
         <script id="template-pagination" type="text/x-handlebars-template">
            <div class="pagination{{#if extra_class}} {{extra_class}}{{/if}}">
               <div class="btn btn-inverse next right{{#if one_page}} disabled{{/if}}">Next <i class="icon-white icon-arrow-right"></i></div>
               <div class="tracker right">
                  <p><span class="current-page">1</span> / <span class="total-pages">{{page_count}}</span></p>
               </div>
               <div class="btn btn-inverse disabled prev right"><i class="icon-white icon-arrow-left"></i> Prev</div>
            </div>
         </script>

         <!-- Search Field -->
         <script id="template-search-field" type="text/x-handlebars-template">
            <div class="search left">
               <input type="text" placeholder="search" name="search" {{#if value}}value="{{value}}" {{/if}}/>
               <i class="icon-search"></i>
            </div>
         </script>

         <!-- Result Set List -->
         <script id="template-results-list" type="text/x-handlebars-template">
            {{renderListItems items pagination.items_per_page}}
            <div class="shadow down"></div>
            {{renderPaginationTemplate pagination.item_count pagination.items_per_page pagination.extra_class}}
         </script>

         <!-- Results Pagination -->
         <script id="template-results-pagination" type="text/x-handlebars-template">
            {{renderPaginationTemplate item_count items_per_page float}}
         </script>

         <!-- List Items View -->
         <script id="template-list-items" type="text/x-handlebars-template">
            {{#each pages}}
            <span data-list-page="{{page_number}}" class="page-set{{#if hidden}} hidden{{/if}}">
               {{#each items}}
               <div class="item" data-id="{{id}}">
                  <div class="inner">
                     <div class="item-content left">
                        {{renderInnerTemplate template this}}
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
