/*********************************************
 * WOA Class
 *
 * Desc:  Global Javascript WOA Object
 *
 * Creator: Zachary Fisher - zfisher@worldofanarchy.com
 *
 * Copyright (c) Anarchy Productions International LLC, 2012
 *
 * Search Keys:
 * - Init Global WOA Object
 * - Import JS Classes
 *********************************************/
$(function() {

   /** Init Global WOA Object **/
   WOA =
   {
      navigation : {},
      user : {},
      pages : {},
      modals : {},
      static : {}
   };

   /** Import JS Classes **/
   $.getScript('view/themes/default/js/jquery/cookie.js');
   $.getScript('view/themes/default/js/navigation.js');
   $.getScript('view/themes/default/js/user.js');
   $.getScript('view/themes/default/js/pages/all.js');
   $.getScript('view/themes/default/js/modals/all.js');
});