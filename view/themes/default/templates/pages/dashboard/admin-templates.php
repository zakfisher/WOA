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

         <!-- Contacts Items -->
         <script id="template-contacts-list-items" type="text/x-handlebars-template">
            <div class="title">
               <h1>{{first_name}} {{last_name}}</h1>
            </div>
            <div class="sub-info">
               <div class="info left first">{{type}}</div>
               {{#if title}}<div class="info left">{{title}}</div>{{/if}}
               {{#if company}}<div class="info left last">{{company}}</div>{{/if}}
            </div>
         </script>

         <!-- Contacts List View -->
         <script id="template-contacts-list" type="text/x-handlebars-template">
            <div class="main-view">
               <div class="sub-page-actions">
                  <div class="inner">
                     <div class="btn btn-inverse left add-contact mr10">New Contact <i class="icon-white icon-plus"></i></div>
                     {{renderSearchField}}
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
