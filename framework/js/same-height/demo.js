$(window).load(function () {
  var options = {
    parentSelector: '.same-height-component',
    childrenSelector: '.same-height-target',
    sameHeightOnResize: {
      minWidthToResize: 543,
      maxWidthToResize: 785
    }
  };

  var shComponent = window.SameHeightComponent(options);

});
