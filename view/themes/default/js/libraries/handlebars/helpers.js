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

Handlebars.registerHelper('renderPaginationTemplate', function(totalItems, itemsPerPage, extraClass) {
   var pageCount = Math.ceil(totalItems / itemsPerPage);
   var data = {
      item_count : totalItems,
      page_count : pageCount,
      extra_class : extraClass
   };

   if (pageCount > 1) {
      var template = Handlebars.compile($('#template-pagination').html());
      return new Handlebars.SafeString(template(data));
   }
});

Handlebars.registerHelper('renderSearchField', function(data) {
   var template = Handlebars.compile($('#template-search-field').html());
   return new Handlebars.SafeString(template(data));
});

Handlebars.registerHelper('renderContactTypes', function(data) {
   var items = '';
   var types = [];
   $(data).each(function(i, v) {
      if ($.inArray(v.type, types) == -1) {
         types.push(v.type);
         items += '<div class="li" data-filter="' + v.type + '"><p>' + ((v.type.substr(0, 1).toUpperCase()) + v.type.substr(1).toLowerCase()) + '</p></div>';
      }
   });
   return new Handlebars.SafeString(items);
});

Handlebars.registerHelper('renderProjectFilter', function(data) {
    var items = '';
    var projects = [];
    $(data).each(function(i, v) {
        if ($.inArray(v.project, projects) == -1) {
            projects.push(v.project);
            items += '<div class="li" data-filter="' + v.project + '"><p>' + v.project + '</p></div>';
        }
    });
    return new Handlebars.SafeString(items);
});

Handlebars.registerHelper('renderCurrentUser', function() {
   return new Handlebars.SafeString(WOA.static.user.username);
});

Handlebars.registerHelper('renderCurrentDate', function() {
   var today = new Date();
   var month = today.getMonth();
   month++;
   var day = today.getDate();
   var year = today.getFullYear();
   year += '';
   year = year.substr(2);
   var date = month + '.' + day + '.' + year;
   return new Handlebars.SafeString(date);
});

Handlebars.registerHelper('renderListItems', function(items, itemsPerPage) {
   var pages = [];
   var idx = 0;
   $(items).each(function(i, v) {
      if (i % itemsPerPage == 0 && i != 0) { idx++; }
      if (typeof pages[idx] == 'undefined') {
         pages[idx] = {};
         pages[idx].page_number = (idx + 1);
         pages[idx].items = [];
         if (idx > 0) { pages[idx].hidden = true; }
      }
      pages[idx].items.push(v);
   });

   var data = { pages : pages };
   var template = Handlebars.compile($('#template-list-items').html());
   return new Handlebars.SafeString(template(data));
});

Handlebars.registerHelper('renderLinkItem', function(data) {
   var template = Handlebars.compile($('#template-add-link').html());
   return new Handlebars.SafeString(template(data));
});

Handlebars.registerHelper('renderPostMessage', function(html) {
    return new Handlebars.SafeString(html);
});

Handlebars.registerHelper('renderPostMessageText', function(html) {
    html = html.replace(/<br\/>/g,'\n');
    return new Handlebars.SafeString(html);
});