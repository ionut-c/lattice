
(function ($window) {
  'use strict';

  $window.SameHeightComponent = SameHeightComponent;

  function SameHeightComponent(options) {
    var $component = $(options.parentSelector);

    function init() {
      calculateSameHeight();
      if (options.sameHeightOnResize) {
        attachEvents();
      }
    }

    var $window = $(window),
        breakpoints = [751, 768, 975, 992, 1009, 1183, 1200, 1217],
        currentBreakpoint = 0;

    var breakpointHit = function() {
      setTimeout(calculateSameHeight, 100);
    }

    var window_w = $window.width();

    $window.resize(function() {
      var i$, len$; window_w = $window.width();
        for (i$ = 0, len$ = breakpoints.length; i$ < len$; i$++) {
            var testPoint = breakpoints[i$];
            if (window_w < testPoint) {
                 if (testPoint == currentBreakpoint)
                     break;
                 currentBreakpoint = testPoint;
                 breakpointHit(testPoint);
                 break;
            }
        }
    });



    function attachEvents() {
      $(window).resize(function () {
          calculateSameHeight();
      });
    }

    function isWidthExcluded() {
      return options.sameHeightOnResize
       && options.sameHeightOnResize.maxWidthToResize
       && options.sameHeightOnResize.minWidthToResize
       && $(window).width() < options.sameHeightOnResize.maxWidthToResize
       && $(window).width() > options.sameHeightOnResize.minWidthToResize
    }

    function calculateSameHeight() {
      $component.each(function () {
        var $children = $(this).find(options.childrenSelector);

        if (!$children.length) return;

        $children.css('height', '');

        if (isWidthExcluded()) return;

        var maxHeight = 0;
        $children.each(function () {
          var childHeight = $(this)[0].getBoundingClientRect().height;
          if (childHeight > maxHeight) {
            maxHeight = childHeight;
          }
        });
        maxHeight = Math.round(maxHeight * 100) / 100;
        $children.css('height', maxHeight + 'px');
      });
    }

    init()

    return {
      calculateSameHeight: calculateSameHeight
    }
  }
}(window));
