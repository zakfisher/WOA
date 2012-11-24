/*********************************************
 * WOA Music Page Class
 *
 * Desc:  Javascript Music Page Object
 *
 * Creator: Zachary Fisher - zfisher@worldofanarchy.com
 *
 * Copyright (c) Anarchy Productions International LLC, 2012
 *
 * Search Keys:
 * - Model
     >> getTracks
 * - View
     >> loadPage
 * - Controller
 *********************************************/
WOA.pages.Music =
{
   model : {
      /*************************************************************
       * Method - getTracks()
       *
       *    Fetch All Tracks
       *************************************************************/
      getTracks : function()
      {
         $.get('music/all_tracks', WOA.pages.Music.view.showPage).error();
      }
   },
   view : {
      /*************************************************************
       * Method - loadPage()
       *
       *    Build Post List
       *************************************************************/
      loadPage : function()
      {
         WOA.pages.Music.model.getTracks();
      },
      /*************************************************************
       * Method - showPage(data)
       *
       *    Display Page
       *************************************************************/
      showPage : function(data)
      {
//         // Load contacts
//         var data = {
//            contacts : true,
//            type : 'contacts',
//            items : [
//               {
//                  template : 'contacts-list-items',
//                  id      : 44,
//                  first_name : 'Jimmy',
//                  last_name : 'Smoothsocks',
//                  type : 'Investor',
//                  title : 'Venture Capitalist',
//                  company : 'VC Funding, Inc.'
//               },
//               {
//                  template : 'contacts-list-items',
//                  id      : 3,
//                  first_name : 'Mr',
//                  last_name : 'Halal',
//                  type : 'Vendor',
//                  title : 'General Manager',
//                  company : 'Habibs Restaurant'
//               }
//            ]
//         };
//         data.pagination = {
//            float : 'right',
//            extra_class : 'list-end',
//            template : 'pagination',
//            item_count : data.items.length,
//            items_per_page : 5
//         }
//
//         // Cache Indexes for Single Post Reference
//         data.item_index = {};
//         $(data.items).each(function(i, v) {
//            data.item_index[v.id] = i;
//         });
//
//         // Cache Result Set
//         WOA.static.list_cache = data;
//
//         // Render List Template
//         Handlebars.renderTemplate('template-list', data, 'div.dynamic-content');

         $('div.dynamic-content').html('page data loaded');
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
      }
   }
};

WOA.pages.Music.controller.init();