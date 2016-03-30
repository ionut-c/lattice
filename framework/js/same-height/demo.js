$(window).load(function () {
  var options = {
    parentSelector: '.same-height-component',
    childrenSelector: '.same-height-target',
    includeMargin: true,
    sameHeightOnResize: true
  };

  window.SameHeightComponent(options);
});
