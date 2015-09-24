function SameHeightComponent() {
	var $component = $("body").find(".same-height-component");
	var paused = false;

	this.setPaused = function(value) {
		paused = value;
		calculateSameHeight();
	}
	function init() {
			calculateSameHeight();
			attachEvents();
	}

	function attachEvents() {
		$(window).resize(function() {
			calculateSameHeight();
		});
	}

	function calculateSameHeight() {
			$component.each(function() {
				var $children = $(this).children();
				if($(this).find(".same-height-target").length > 0) {
					$children = $(this).find(".same-height-target");
				}
				var height = 0;
				$children.css("height", "");
				if(!paused) {
					$children.each(function() {
						$this = $(this);
						$this.height = parseFloat($this.height());
						if($this.height > height) {
							height = $this.height;
						}
					});
					$children.css("height", height+"px");
				}
			});
	}

	if($component.length > 0) {
		init();
	}
}

$(window).load(function() {
	var sameHeight = new SameHeightComponent();
});