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