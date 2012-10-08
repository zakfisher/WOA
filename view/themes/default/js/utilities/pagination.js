/*********************************************
 * WOA Pagination Utility Class
 *
 * Desc:  Javascript Pagination Utility Object
 *
 * Creator: Zachary Fisher - zfisher@worldofanarchy.com
 *
 * Copyright (c) Anarchy Productions International LLC, 2012
 *
 * Search Keys:
 * - Model
 * - View
 * - Controller
 *********************************************/
WOA.utilities.Pagination =
{
   model : {},
   view : {
      /*************************************************************
       * Method - showNextPage(e)
       *
       *    Display Next Result Set
       *************************************************************/
      showNextPage : function(e)
      {
         var button = ($(e.target).is('.btn')) ? $(e.target) : $(e.target).parents('.btn');

         if (!button.hasClass('disabled'))
         {
            $('div.pagination div.btn.prev').removeClass('disabled');

            var currentPage = button.siblings('div.tracker').find('.current-page');
            var currentPageNum = parseInt(currentPage.text());

            var totalPages = button.siblings('div.tracker').find('.total-pages');
            var totalPagesNum = parseInt(totalPages.text());

            var nextPage = currentPageNum + 1;
            if (nextPage == totalPagesNum) { $('div.pagination div.btn.next').addClass('disabled'); }
            $('div.tracker').find('.current-page').html(nextPage);

            // Show Next Set
            var list = $('div.dynamic-content').find('.list-container');
            list.find('span.page-set').addClass('hidden');
            list.find('span.page-set[data-list-page=' + nextPage + ']').removeClass('hidden');
         }
      },

      /*************************************************************
       * Method - showPrevPage(e)
       *
       *    Display Previous Result Set
       *************************************************************/
      showPrevPage : function(e)
      {
         var button = ($(e.target).is('.btn')) ? $(e.target) : $(e.target).parents('.btn');

         if (!button.hasClass('disabled'))
         {
            $('div.pagination div.btn.next').removeClass('disabled');

            var currentPage = button.siblings('div.tracker').find('.current-page');
            var currentPageNum = parseInt(currentPage.text());

            var prevPage = currentPageNum - 1;
            if (prevPage == 1) { $('div.pagination div.btn.prev').addClass('disabled'); }
            $('div.tracker').find('.current-page').html(prevPage);

            // Show Next Set
            var list = $('div.dynamic-content').find('.list-container');
            list.find('span.page-set').addClass('hidden');
            list.find('span.page-set[data-list-page=' + prevPage + ']').removeClass('hidden');
         }
      },

      /*************************************************************
       * Method - executeSearch(e)
       *
       *    Search & Display Result Set
       *************************************************************/
      executeSearch : function(e)
      {
         var searchValue = $(e.target).val();

         // Create New Result Set
         if (searchValue != '')
         {
            var resultSet = {
               pagination : {
                  extra_class : WOA.static.list_cache.pagination.extra_class,
                  float : WOA.static.list_cache.pagination.float,
                  items_per_page : WOA.static.list_cache.pagination.items_per_page
               },
               items : []
            };

            $(WOA.static.list_cache.items).each(function(i, v) {
               var val = searchValue.toLowerCase();
               switch (WOA.static.list_cache.type) {
                  case 'updates':
                     if ((v.author.toLowerCase().indexOf(val) != -1 ) || (v.title.toLowerCase().indexOf(val) != -1 ) || (v.project.toLowerCase().indexOf(val) != -1 )) { resultSet.items.push(v); }
                  case 'projects':
                     if (v.project.toLowerCase().indexOf(val) != -1 ) { resultSet.items.push(v); }
                  case 'contacts':
                     if ((v.first_name.toLowerCase().indexOf(val) != -1 ) || (v.last_name.toLowerCase().indexOf(val) != -1 ) || (v.title.toLowerCase().indexOf(val) != -1 ) || (v.company.toLowerCase().indexOf(val) != -1 )) { resultSet.items.push(v); }
                  default:
               }
            });

            resultSet.pagination.item_count = resultSet.items.length;

            // Results Found
            if (resultSet.items.length > 0)
            {
               Handlebars.renderTemplate('template-results-list', resultSet, 'div.list-container');
               Handlebars.renderTemplate('template-results-pagination', resultSet.pagination, 'div.sub-page-actions span.page-nav');
            }

            // No Results Found
            else
            {
               $('div.list-container').html('<p class="no-results">No Results Found.</p>');
               $('div.pagination').remove();
            }
         }

         // Default back to cached results
         else {
            Handlebars.renderTemplate('template-list', WOA.static.list_cache, 'div.dynamic-content');
            $('div.dynamic-content input[name=search]').focus();
         }
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
         $(document).on('click', 'div.pagination .next', WOA.utilities.Pagination.view.showNextPage);
         $(document).on('click', 'div.pagination .prev', WOA.utilities.Pagination.view.showPrevPage);
         $(document).on('keyup', 'div.dynamic-content input[name=search]', WOA.utilities.Pagination.view.executeSearch);
      }
   }
};

WOA.utilities.Pagination.controller.init();