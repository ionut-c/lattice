var MaterialInputComponent = (function MaterialInputComponent($) {
    var $component = $(".material-input[type=text]");

    function updateInput($this) {
      if($this.val() !== "") {
        $this.addClass("filled");
      } else {
        $this.removeClass("filled");
      }
    }

    function attachEvents() {
      $component.on('keyup change', function() {
        updateInput($(this));
      });

      $component.siblings('label').click(function (e) {
        e.preventDefault();
        $(this).prev().trigger("focus");
      });
    }

    function init() {
        if (!$component.length) return;
        attachEvents();
        $component.each(function() {
          updateInput($(this));
        });
    }

    return {
        init: init
    };

}(jQuery));

//accounting from IE filling in forms after document ready
var ua = window.navigator.userAgent;
if(ua.indexOf('MSIE ') > 0 || ua.indexOf('Trident/') > 0 || ua.indexOf('Edge/') > 0 ) {
  $(document).ready(function() {
    MaterialInputComponent.init();
  });
} else {
  MaterialInputComponent.init();
}
