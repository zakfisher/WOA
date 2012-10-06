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
      }
   }
};

WOA.utilities.Pagination.controller.init();