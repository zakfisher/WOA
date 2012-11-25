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
            {{#if editMode}}
            {{else}}
            <div class="secondary-view">
            {{/if}}
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
                     <p>{{renderPostMessage content.message}}</p>
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
                                 <p class="date">{{time}}</p>
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
                                 <textarea name="comment" rows="3">Add your comment...</textarea>
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
            {{#if editMode}}
            {{else}}
            </div>
            {{/if}}
         </script>

         <!-- Add/Edit Post View -->
         <script id="template-add-edit-post" type="text/x-handlebars-template">
            <div class="post-content">
               <div class="header">
                  <div class="inner mb5">
                     <div class="title">
                        <input type="text" value="{{#if addMode}}Add Post Title{{else}}{{title}}{{/if}}" maxchar="75" />
                     </div>
                     <div class="sub-info">
                        <div class="info left first">
                           {{#if addMode}}
                           {{renderCurrentDate}}
                           {{else}}
                           {{time}}
                           {{/if}}
                        </div>
                        <div class="info left">
                           {{#if addMode}}
                           <?= $_SESSION['user']['username']; ?>
                           {{else}}
                           {{author}}
                           {{/if}}
                        </div>
                        <div class="info left last">
                           {{#if addMode}}
                           <select>
                              <option selected disabled>Choose Project</option>
                              {{#each projects}}
                              <option value="{{id}}" data-project="{{project}}">{{project}}</option>
                              {{/each}}
                           </select>
                           {{else}}
                           {{project}}
                           {{/if}}
                        </div>
                     </div>
                     <div class="clr"></div>
                  </div>
                  <div class="shadow"></div>
               </div>
               <div class="message text">
                  <textarea rows=5>{{#if addMode}}Add your message...{{else}}{{renderPostMessageText content.message}}{{/if}}</textarea>
               </div>
               <div class="links">
                  <div class="header">
                     <p>Links</p>
                  </div>
                  <div class="inner">
                     {{#if content.links}}
                     <ul>
                        {{#each content.links}}
                        {{renderLinkItem this}}
                        {{/each}}
                     </ul>
                     {{/if}}
                     <div class="add-link clr">
                        <input class="left mr15" type="text" value="Title" name="title" />
                        <input class="left" type="text" value="URL" name="url" />
                        <div class="btn btn-inverse add right"><i class="icon-white icon-plus"></i> Add Link</div>
                     </div>
                     <div class="clr"></div>
                  </div>
                  <div class="shadow down"></div>
                  <div class="submit-cancel clr">
                     <div class="inner">
                        {{#if editMode}}<div class="btn btn-danger left delete-post show-modal" data-modal="confirm_post_delete"><i class="icon-white icon-trash"></i> Delete Post</div>{{/if}}
                        <div class="btn {{#if addMode}}cancel-new{{else}}cancel{{/if}} right"><i class="icon-remove"></i> Cancel</div>
                        <div class="btn btn-inverse {{#if addMode}}add-new{{else}}update{{/if}} right"><i class="icon-white icon-ok"></i> {{#if addMode}}Submit{{else}}Update{{/if}}</div>
                     </div>
                  </div>
                  <p class="error clr"></p>
               </div>
            </div>
         </script>

         <!-- New Link List Item -->
         <script id="template-add-link" type="text/x-handlebars-template">
            <li data-link-id="{{id}}">
               <div class="btn btn-inverse delete-link left clr"><i class="icon-white icon-remove"></i></div>
               <a href="{{url}}" target="_blank">{{title}}</a>
               <div class="clr"></div>
            </li>
         </script>

         <!-- Single Comment -->
         <script id="template-single-comment" type="text/x-handlebars-template">
            <div class="single-comment clr">
               <div class="meta-info left">
                  <p class="first">{{author}}</p>
                  <p class="date">{{time}}</p>
               </div>
               <div class="comment-text right">
                  <p>{{message}}</p>
               </div>
               <div class="clr"></div>
            </div>
         </script>