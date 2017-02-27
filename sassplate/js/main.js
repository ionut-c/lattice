$(window).load(function () {
  var options = {
    parentSelector: '.same-height-component',
    childrenSelector: '.same-height-target',
    sameHeightOnResize: {
    }
  };

  // No same height on mobile
  var options2 = {
    parentSelector: '.same-height-until-mobile',
    childrenSelector: '.same-height-target-until-mobile',
    sameHeightOnResize: {
      minWidthToResize: 1,
      maxWidthToResize: 767
    }
  };

  var shComponent = window.SameHeightComponent(options);
  var shComponent2 = window.SameHeightComponent(options2);
});
