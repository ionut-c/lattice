var BackToTopComponent = (function BackToTopComponent($) {
	var $component = $("body").find(".back-to-top-component"),
			$footer = $component.find(".footer-component");

	function attachEvents() {
			$(window).resize(function() {
					reachFooter();
			});
	}

	function reachFooter() {
		//function here
	}

	function init() {
		if(!$component.length) return;
		attachEvents();
		reachFooter()
	}

	return {
		init : init
	};

}(jQuery));

BackToTopComponent.init();
