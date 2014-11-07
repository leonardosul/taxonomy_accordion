/**
* @file
* Uses ui.accordion and jquery.cookie system libraries.
*
* Adds accordion to the selectors passed in from taxonomy_accordion.module.
* Creates a cookie for each accordion selector to remember state between page loads.
* Cookies expire at the end of the session.
*/

(function($) {
  Drupal.behaviors.taxonomy_accordion = {
    attach: function (context, settings) {

      // Set up an extension to match text exactly.
      $.expr[":"].containsExact = function (obj, index, meta, stack) {
        return (obj.textContent || obj.innerText || $(obj).text() || "") == meta[3];
      };

      // For every selector provided by the module.
      $.each(settings.taxonomy_accordion.selector_list, function() {
        // Grab the selector in a string.
        var taxSelector = this.toString();
        // Pull the taxonomy name from the selecto.
        var cookieId = taxSelector.match(/\(([^)]+)\)/)[1];
        // Remove additional double quotes from taxonomy name.
        cookieId = cookieId.replace(/[|&;$%@"<>()+,]/g, "");

        // Add prefix to taxonomy name to create a cookie name.
        var cookieName = 'accordionState_' + cookieId;
        // Create the cookie.
        var status = $.cookie(cookieName);

        // Add accordion functionality to taxonomy terms.
        $(taxSelector).accordion();

        // If the cookie reads hidden or is not yet defined.
        if(status == 'hidden' || status == undefined){
          // Hide the elements within that taxonomy parent.
          $(taxSelector).next().hide();
          // Add a function to show the terms within the taxonomy parent on click.
          // And to change the cookie to read shown.
          $(taxSelector).click(function() {
            $(taxSelector).next().toggle("slow");
            $.cookie(cookieName, 'shown');
          });
        }
        // If the cookie reads shown.
        else if (status == 'shown'){
          // Show the elements within that taxonomy parent.
          $(taxSelector).next().show();
          // Add a function to hide the terms within the taxonomy parent on click.
          // And to change the cookie to read hidden.
          $(taxSelector).click(function() {
            $(taxSelector).next().toggle("slow");
            $.cookie(cookieName, 'hidden');
          });
        }
      });
    }
  };
})(jQuery);
