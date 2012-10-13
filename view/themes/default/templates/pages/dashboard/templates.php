<?php session_start(); ?>

         <!-- List View -->
         <script id="template-list" type="text/x-handlebars-template">
            <div class="main-view">
               <div class="sub-page-actions">
                  <div class="inner">
                     {{renderSearchField}}
                     <span class="page-nav">
                     {{renderPaginationTemplate pagination.item_count pagination.items_per_page pagination.float}}
                     </span>
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

         <!-- Updates Items -->
         <script id="template-updates-list-items" type="text/x-handlebars-template">
            <div class="title">
               <h1>{{title}}</h1>
            </div>
            <div class="sub-info">
               <div class="info left first">{{time}}</div>
               <div class="info left">{{author}}</div>
               <div class="info left last">{{project}}</div>
            </div>
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

         <!-- Single Post View -->
         <script id="template-single-post" type="text/x-handlebars-template">
            <div class="secondary-view">
               <div class="sub-page-actions">
                  <div class="inner">
                     <div class="btn btn-inverse go-back left"><i class="icon-white icon-arrow-left"></i> Back</div>
                     {{#if owner}}
                     <div class="btn btn-inverse edit right">Edit <i class="icon-white icon-pencil"></i></div>
                     {{/if}}
                     <div class="clr"></div>
                  </div>
                  <div class="shadow"></div>
               </div>
               <div class="post-content">
                  <div class="header">
                     <div class="inner">
                        <div class="title">
                           <h1>{{title}}</h1>
                        </div>
                        <div class="sub-info">
                           <div class="info left first">{{time}}</div>
                           <div class="info left">{{author}}</div>
                           <div class="info left last">{{project}}</div>
                        </div>
                        <div class="clr"></div>
                     </div>
                     <div class="shadow down"></div>
                  </div>
                  <div class="message">
                     <p>{{content.message}}</p>
                  </div>
                  {{#if content.links}}
                  <div class="links">
                     <div class="header">
                        <p>Links</p>
                     </div>
                     <ul>
                     {{#each content.links}}
                        <li>
                           <a href="{{url}}" target="_blank">{{title}}</a>
                        </li>
                     {{/each}}
                     </ul>
                  </div>
                  {{/if}}
                  <div class="comments">
                     <div class="header">
                        <p class="left">Comments</p>
                        <i class="icon-minus right"></i>
                        <div class="clr"></div>
                     </div>
                     <div class="body">
                        <span class="collapseable">
                           {{#each content.comments}}
                           <div class="single-comment clr">
                              <div class="meta-info left">
                                 <p class="first">{{author}}</p>
                                 <p>{{time}}</p>
                              </div>
                              <div class="comment-text right">
                                 <p>{{message}}</p>
                              </div>
                              <div class="clr"></div>
                           </div>
                           {{/each}}
                        </span>
                        <div class="add-comment clr">
                           <div class="meta-info left">
                              <p class="first">{{renderCurrentUser}}</p>
                              <p>{{renderCurrentDate}}</p>
                           </div>
                           <div class="comment-text right">
                              <div class="inner">
                                 <textarea name="message" placeholder="add your comment..." rows="3"></textarea>
                              </div>
                           </div>
                           <div class="clr"></div>
                        </div>
                        <div class="button">
                           <div class="btn btn-inverse right submit-comment">Comment</div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </script>
