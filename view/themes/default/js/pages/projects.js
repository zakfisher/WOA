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
         $.get(WOA.static.env + 'projects/get_projects', function(data) { WOA.pages.Projects.view.showPage(data); });
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


//      [
//      {
//         // High Access
//         template : 'projects-list-items',
//         id      : 44,
//         project : 'Crazy Shit Project',
//         last_updated    : '1.1.12',
//         user_count : 5,
//         sub_nav : [
//            {
//               sub_page : 'overview',
//               title : 'Overview'
//            },
//            {
//               sub_page : 'updates',
//               title : 'Updates'
//            },
//            {
//               sub_page : 'biz_plan',
//               title : 'Business Plan'
//            },
//            {
//               sub_page : 'contracts',
//               title : 'Contracts'
//            }
//         ],
//         contracts : [
//            {
//               template : 'contracts-nda',
//               id : 22,
//               title : 'This Guys NDA',
//               extra : {}
//            }
//         ]
//      },
//      {
//         // Admin Access
//         template : 'projects-list-items',
//         id      : 4,
//         project : 'haslslsls Project',
//         last_updated    : '11.18.12',
//         user_count : 15,
//         sub_nav : [
//            {
//               sub_page : 'overview',
//               title : 'Overview'
//            },
//            {
//               sub_page : 'updates',
//               title : 'Updates'
//            },
//            {
//               sub_page : 'biz_plan',
//               title : 'Business Plan'
//            },
//            {
//               sub_page : 'partners',
//               title : 'Partners'
//            }
//         ],
//         partners : [
//            {
//               template : 'contacts-list-items',
//               id      : 3,
//               first_name : 'Mr',
//               last_name : 'Halal',
//               type : 'Vendor',
//               title : 'General Manager',
//               company : 'Habibs Restaurant',
//               contracts : [
//                  {
//                     template : 'contracts-nda',
//                     id : 22,
//                     title : 'This Guys NDA',
//                     extra : {}
//                  }
//               ]
//            },
//            {
//               template : 'contacts-list-items',
//               id      : 4,
//               first_name : 'Tooth',
//               last_name : 'Fairy',
//               type : 'Investor',
//               title : 'Banker',
//               company : 'Magic Co.',
//               contracts : [
//                  {
//                     template : 'contracts-nda',
//                     id : 22,
//                     title : 'This Guys NDA',
//                     extra : {}
//                  }
//               ]
//            },
//            {
//               template : 'contacts-list-items',
//               id      : 11,
//               first_name : 'Mantots',
//               last_name : 'Andgondi',
//               type : 'Accountant',
//               title : 'Business Banking Specialist',
//               company : 'Wells Fargo',
//               contracts : [
//                  {
//                     template : 'contracts-nda',
//                     id : 22,
//                     title : 'This Guys NDA',
//                     extra : {}
//                  }
//               ]
//            }
//         ]
//      },
//      {
//         // Low Access
//         template : 'projects-list-items',
//         id      : 224,
//         project : 'ABCC Project',
//         last_updated    : '10.12.10',
//         user_count : 3,
//         sub_nav : [
//            {
//               sub_page : 'overview',
//               title : 'Overview'
//            },
//            {
//               sub_page : 'updates',
//               title : 'Updates'
//            },
//            {
//               sub_page : 'contracts',
//               title : 'Contracts'
//            }
//         ]
//      },
//      {
//         template : 'projects-list-items',
//         id      : 5,
//         project : '234t Project',
//         last_updated    : '9.12.12',
//         user_count : 2
//      }
//      ]







      /*************************************************************
       * Method - showPage(data)
       *
       *    Display Page
       *************************************************************/
      showPage : function(projects)
      {
         // Load projects
         var data = {
            type : 'projects',
            items : projects
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

         // Display Project Sub Nav
         $('div.content.left ul.sub-nav.default').addClass('hidden');
         Handlebars.renderTemplate('template-project-sub-nav', project.sub_nav, 'div.content.left ul.sub-nav.sub-page');
         $('span.sub-page-nav').removeClass('hidden');
         $('div.btn.back-to-dashboard').attr('data-sub-page', 'projects');

         // Default to Overview
         WOA.pages.Projects.view.displaySingleProjectSubPage(null, 'overview');
      },

      /*************************************************************
       * Method - displaySingleProjectSubPage(page)
       *
       *    Display Single Project Sub Page
       *************************************************************/
      displaySingleProjectSubPage : function(e, page)
      {
         // Direct Page Request
         WOA.static.sub_page = (e == null && typeof page != 'undefined') ? page : WOA.static.sub_page;

         // User Click Page Request
         if (e != null && typeof page == 'undefined') { WOA.static.sub_page = ($(e.target).is('li')) ? $(e.target).attr('data-sub-page') : $(e.target).parents('li').attr('data-sub-page'); }

         // Display Page
         $('div.content.left ul.sub-nav li.active').removeClass('active');
         $('li[data-sub-page=' + WOA.static.sub_page + ']').addClass('active');
         var data = WOA.static.project[WOA.static.sub_page];
         data.project = WOA.static.current_project.project;
         Handlebars.renderTemplate('template-project-wrapper', data, 'div.content.right div.header');

         // Init Sub Page
         WOA.navigation.view.initSubPage();
      }
   },
   controller :
   {
      /*************************************************************
       * Init Method
       *************************************************************/
      init : function()
      {
         WOA.static.project = {
            overview : {
               shadow_down : true,
               title : 'Project Overview'
            },
            updates : {
               shadow_down : true,
               title : 'Project Updates'
            },
            biz_plan : {
               shadow_down : true,
               title : 'Business Plan'
            },
            contracts : {
               shadow_down : true,
               title : 'Contracts'
            },
            partners : {
               shadow_down : true,
               title : 'Partners'
            }
         };
         /** Handlers **/

         // View Single Project
         $(document).on('click', 'div.dynamic-content div.list-container.projects div.item', WOA.pages.Projects.view.displaySingleProject);

         // View Sub Page
         $(document).on('click', 'ul.sub-nav.sub-page li', WOA.pages.Projects.view.displaySingleProjectSubPage);
      }
   }
};

WOA.pages.Projects.controller.init();