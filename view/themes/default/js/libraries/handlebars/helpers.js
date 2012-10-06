Handlebars.renderTemplate = function(templateId, context, container, append)
{
   var template = Handlebars.compile($('#' + templateId).html());
   if (typeof append !== 'undefined' && append === true) { $(container).append($(template(context))); }
   else if (typeof append !== 'undefined' && append == 'append') { $(container).append($(template(context))); }
   else if (typeof append !== 'undefined' && append == 'prepend') { $(container).prepend($(template(context))); }
   else if (typeof append !== 'undefined' && append == 'before') { $(container).before($(template(context))); }
   else if (typeof append !== 'undefined' && append == 'after') { $(container).after($(template(context))); }
   else { $(container).html(template(context)); }
};

Handlebars.registerHelper('renderInnerTemplate', function(template, data) {
   var template = Handlebars.compile($('#template-' + template).html());
   return new Handlebars.SafeString(template(data));
});

Handlebars.registerHelper('renderPaginationTemplate', function(totalItems, itemsPerPage) {
   var pageCount = Math.ceil(totalItems / itemsPerPage);
   var data = {
      item_count : totalItems,
      page_count : pageCount
   };

   var template = Handlebars.compile($('#template-pagination').html());
   return new Handlebars.SafeString(template(data));
});

Handlebars.registerHelper('renderSearchField', function(data) {
   var template = Handlebars.compile($('#template-search-field').html());
   return new Handlebars.SafeString(template(data));
});