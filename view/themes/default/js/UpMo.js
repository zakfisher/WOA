/*********************************************
 * UpMo Class
 *
 * Desc:  Global Javascript UpMo Object
 *
 * Creator: Zachary Fisher - zach@upmo.com
 *
 * Copyright (c) Upwardly Mobile, Inc., 2012
 *
 * Search Keys:
 * - Init Global UpMo Object
 * - Import JS Classes
 *********************************************/
$(function() {

   /** Init Global UpMo Object **/
   UpMo =
   {
      navigation : {},
      pages : {},
      modals : {},
      static : {}
   };

   /** Import JS Classes **/
   $.getScript('view/themes/default/js/navigation.js');
   $.getScript('view/themes/default/js/pages/all.js');
   $.getScript('view/themes/default/js/modals/all.js');
});