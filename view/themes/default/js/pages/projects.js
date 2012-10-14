/*********************************************
 * WOA Projects Page Class
 *
 * Desc:  Javascript Projects Page Object
 *
 * Creator: Zachary Fisher - zfisher@worldofanarchy.com
 *
 * Copyright (c) Anarchy Productions International LLC, 2012
 *
 * Search Keys:
 * - Model
 * - View
     >> loadPage
 * - Controller
 *********************************************/
WOA.pages.Projects =
{
   model : {
      /*************************************************************
       * Method - getProjects()
       *
       *    Fetch Projects Data
       *************************************************************/
      getProjects : function()
      {
         $.get(WOA.static.env + 'test/test/abc', function(data) { WOA.pages.Projects.view.showPage(data); });
      }
   },
   view : {
      /*************************************************************
       * Method - loadPage()
       *
       *    Init Page Logic
       *    - Fetch Projects Data
       *************************************************************/
      loadPage : function()
      {
         // Dashboard (list)
         WOA.pages.Projects.model.getProjects();
      },

      /*************************************************************
       * Method - loadSubPage()
       *
       *    Load Sub Page (default = overview)
       *************************************************************/
      loadSubPage : function()
      {
         if ($.inArray(WOA.static.sub_page, WOA.static.user_pages['projects']) == -1) { WOA.static.sub_page = 'overview'; }
         $('div.content.right').load('view/themes/default/templates/pages/' + WOA.static.page + '/' + WOA.static.sub_page + '.php');
      },

      /*************************************************************
       * Method - showPage(data)
       *
       *    Display Page
       *************************************************************/
      showPage : function(data)
      {
         // Load projects
         var data = {
            type : 'projects',
            items : [
               {
                  template : 'projects-list-items',
                  id      : 44,
                  project : 'Crazy Shit Project',
                  last_updated    : '1.1.12',
                  user_count : 5
               },
               {
                  template : 'projects-list-items',
                  id      : 4,
                  project : 'haslslsls Project',
                  last_updated    : '11.18.12',
                  user_count : 15
               },
               {
                  template : 'projects-list-items',
                  id      : 224,
                  project : 'ABCC Project',
                  last_updated    : '10.12.10',
                  user_count : 3
               },
               {
                  template : 'projects-list-items',
                  id      : 5,
                  project : '234t Project',
                  last_updated    : '9.12.12',
                  user_count : 2
               }
            ]
         };
         data.pagination = {
            float : 'right',
            extra_class : 'list-end',
            template : 'pagination',
            item_count : data.items.length,
            items_per_page : 5
         }

         // Cache Indexes for Single Post Reference
         data.item_index = {};
         $(data.items).each(function(i, v) {
            data.item_index[v.id] = i;
         });

         // Cache Result Set
         WOA.static.list_cache = data;

         // Render List Template
         Handlebars.renderTemplate('template-list', data, 'div.dynamic-content');
      },

      /*************************************************************
       * Method - displaySingleProject(e)
       *
       *    Redirect to Single Project View
       *************************************************************/
      displaySingleProject : function(e)
      {
         var item = ($(e.target).is('.item')) ? $(e.target) : $(e.target).parents('.item');
         var id = item.attr('data-id');
         var project = WOA.static.list_cache.items[WOA.static.list_cache.item_index[id]];

         console.log(project);

         // Cache Project
         WOA.static.current_project = project;
      }
   },
   controller :
   {
      /*************************************************************
       * Init Method
       *************************************************************/
      init : function()
      {
         /** Handlers **/

         // View Single Project
         $(document).on('click', 'div.dynamic-content div.list-container.projects div.item', WOA.pages.Projects.view.displaySingleProject);
      }
   }
};

WOA.pages.Projects.controller.init();