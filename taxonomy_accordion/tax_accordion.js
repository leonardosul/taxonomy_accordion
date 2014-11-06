/**
* @file
* Uses ui.accordion and jquery.cookie sytem libraries.
*
* Adds accordion to the selectors passed in from taxonomy_accordion_7.module.
* Creates a cookie for each accordion selector to remember state betweeen page loads.
* Cookies expire at the end of the session.
*/


(function($) {
  Drupal.behaviors.taxonomy_accordion = {
    attach: function (context, settings) {

      // Set up an extension to match text exactly.
      $.expr[":"].containsExact = function (obj, index, meta, stack) {
        return (obj.textContent || obj.innerText || $(obj).text() || "") == meta[3];
      };

      $.each(settings.taxonomy_accordion.selector_list, function() {
        var taxSelector = this.toString();
        var cookieId = taxSelector.match(/\(([^)]+)\)/)[1];
        cookieId = cookieId.replace(/[|&;$%@"<>()+,]/g, "");

        var cookieName = 'accordionState_' + cookieId;
        var status = $.cookie(cookieName);

        //$(taxSelector).accordion();

        $(taxSelector).accordion();

        if(status == 'hidden' || status == undefined){
          $(taxSelector).next().hide();
          $(taxSelector).click(function() {
            $(taxSelector).next().toggle("slow");
            $.cookie(cookieName, 'shown');
          });
        }
        else if (status == 'shown'){
          $(taxSelector).next().show();
          $(taxSelector).click(function() {
            $(taxSelector).next().toggle("slow");
            $.cookie(cookieName, 'hidden');
          });
        }
      });
    }
  };
})(jQuery);
