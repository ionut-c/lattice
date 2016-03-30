(function ($window) {
  'use strict';

  $window.SameHeightComponent = SameHeightComponent;

  function SameHeightComponent(options) {
    var $component = $(options.parentSelector);
    var paused = false;

    function init() {
      calculateSameHeight();
      if (options.sameHeightOnResize) {
        attachEvents();
      }
    }
    init();

    this.setPaused = function (value) {
      paused = value;
      calculateSameHeight();
    }

    function attachEvents() {
      var rtime;
      var timeout = false;
      var delta = 0;
      $(window).resize(function () {
        rtime = new Date();
        if (timeout === false) {
          timeout = true;
          setTimeout(resizeend, delta);
        }
      });

      function resizeend() {
        if (new Date() - rtime < delta) {
          setTimeout(resizeend, delta);
        } else {
          timeout = false;
          calculateSameHeight();
        }
      }
    }

    function calculateSameHeight() {

      $component.each(function () {
        var $children = $(this).find(options.childrenSelector);

        if (!$children.length) return;

        $children.css('height', '');

        if (paused) return;

        var maxHeight = 0;
        $children.each(function () {
          var childHeight = $(this).outerHeight(options.includeMargin);
          if (childHeight > maxHeight) {
            maxHeight = childHeight;
          }
        });
        maxHeight = Math.round(maxHeight * 100) / 100;
        $children.css('height', maxHeight + 'px');
      });
    }
  }
}(window));
