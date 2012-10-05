//Handlebars.registerHelper('each', function(context, block) {
//   var ret = "";
//   for(var i=0, j=context.length; i<j; i++) {
//      context[i].index = i;
//      ret = ret + block(context[i]);
//   }
//   return ret;
//});

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