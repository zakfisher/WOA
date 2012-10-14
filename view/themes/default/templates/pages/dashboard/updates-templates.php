<?php session_start(); ?>

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
