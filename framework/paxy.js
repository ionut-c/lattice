
var paxy = (function(){

  var followers = [];
  var customProperties = [];
  var customEffects = [];

  var debug = false;

  return {
    getFollowers: function() {
      return followers;
    },
    getCustomProperties: function() {
      return customProperties;
    },
    getCustomEffects: function() {
      return customEffects;
    },
    getDebug: function() {
      return debug;
    },
    setDebug: function(value) {
      debug = value;
    }
  }
})();

function paxyDebug() {
  paxy.setDebug("true");
  $('body').append('<div id="paxyDebug" style="position: fixed; background: rgba(0,0,0,.9); top: 5px; right: 5px; z-index: 1000; color: #eee; padding: 10px; border-radius: 3px; ">Scroll Pos: <span id="scrollPos">'+ $window.scrollTop() +'</span></div>');
}

$(document).ready(function(){
  // Cache the Window object
  $window = $(window);
paxyDebug();

  $('[data-paxy]').each(function(){
    var $this = $(this);
    var data = $this.data("paxy");
    bind($this, data);
  });

  update();

  function bind($this, data) {
    var followers = paxy.getFollowers();
    var customProperties = paxy.getCustomProperties();
    var customEffects = paxy.getCustomEffects();
    var bindingTo = data.substr(0, data.indexOf('{'));
    var params = data.substr(data.indexOf('{')+1, (data.indexOf('}')-data.indexOf('{')-1));
    params = params.split(',');
    switch (bindingTo) {
      case "follower":
        var temp = [$this, params[0]];
        followers.push(temp);
      break;
      case "customProperty":
        var temp = [$this, params[0], params[1], params[2], params[3]];
        customProperties.push(temp);
      break;
      case "customEffect":
        var temp = [$this, params[0], params[1], params[2], params[3], params[4], params[5]];
        customEffects.push(temp);
      break;
    }
  }

  $(window).on("scroll", function() {
    update();
  });

  function update() {
    var followers = paxy.getFollowers();
    var customProperties = paxy.getCustomProperties();
    var customEffects = paxy.getCustomEffects();
    if(paxy.getDebug()) {
      $("#scrollPos").html($window.scrollTop());     
    }
    for(var i = 0; i < followers.length; i++) {
      follower.apply(this, followers[i]);
    }
    for(var i = 0; i < customProperties.length; i++) {
      customProperty.apply(this, customProperties[i]);
    }
    for(var i = 0; i < customEffects.length; i++) {
      customEffect.apply(this, customEffects[i]);
    }
  }

  function follower($this, startValue) {
    if($window.scrollTop() >= startValue) {
      if($this.siblings(".ghost").length == 0) {
        $this.after('<div class="ghost" style="height:'+$this.outerHeight(true)+'px;"></div>');
      }
      $this.css("position", "fixed");
      $this.addClass("following");
    } else {
      $this.siblings(".ghost").remove();
      $this.css("position", "");
      $this.removeClass("following");
    }
  }

  function customProperty($this, cssProp, initialValue, newValue, startValue) {
    if($window.scrollTop() >= startValue) {
      $this.css(cssProp, newValue);
    } else {
      $this.css(cssProp, initialValue);
    }
  }

  function customEffect($this, cssProp, startValue, endValue, units, start, finish) {
    if($window.scrollTop() >= start && $window.scrollTop() <= finish) {
      var positions = finish - start + 1;
      var factor = (parseInt(startValue)-parseInt(endValue)) / positions;
      var crtPos = finish - $window.scrollTop() + 1;
      var computedValue = factor*crtPos + parseInt(endValue) ;
      $this.css(cssProp, computedValue + "" + units);
    } else if($window.scrollTop() < start) {
      $this.css(cssProp, "");
    } else if($window.scrollTop() > finish) {
      $this.css(cssProp, endValue + units);
    }
  }
});