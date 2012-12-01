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
        getProjects : function() { $.get('projects/get_projects', WOA.pages.Projects.view.showPage); },

        /*************************************************************
         * Method - getProjectNames(callback)
         *
         *    Fetch Project Names
         *************************************************************/
        getProjectNames : function(callback) { $.get('projects/get_project_names', callback); }
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
         * Method - showPage(data)
         *
         *    Display Page
         *************************************************************/
        showPage : function(projects)
        {
            // Load projects
            var data = {
                projects : true,
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

            if (data.items.length < 6) { data.noSearch = true; }

            // Cache Result Set
            WOA.static.list_cache = data;

            // Render List Template
            Handlebars.renderTemplate('template-list', data, 'div.dynamic-content');
            if ($('div.sub-page-actions').length == 0) { $('div.content.right div.header div.shadow.first').removeClass('down'); }
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
            $('span.sub-page-nav').removeClass('hidden');
            $('div.btn.back-to-dashboard').attr('data-sub-page', 'projects');
            Handlebars.renderTemplate('template-project-sub-nav', project.sub_nav, 'div.content.left ul.sub-nav.sub-page');

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