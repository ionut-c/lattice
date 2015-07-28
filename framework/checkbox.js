var Checkboxes = function() {
	$(document).on('click', '.suit-checkbox', function() {
		$(this).parent().toggleClass("checked");
		$(this).siblings("input").prop('checked', !$(this).siblings("input").prop('checked'));
	});
	$(document).on('click', '.suit-checkbox-label', function() {
		$(this).parent().toggleClass("checked");
		$(this).siblings("input").prop('checked', !$(this).siblings("input").prop('checked'));
	});
	$('input:checkbox[data-interface="suit"]').each(function() {
		$(this).hide();
		if($(this).attr('data-size') != undefined) {
			var size = "font-size: "+$(this).attr('data-size')+"rem";
		} else {
			var size = "";
		}
		$(this).wrap('<div class="suit-checkbox-wrapper" style="'+size+'"></div>');
		$(this).parent().append('<div class="suit-checkbox"></div>');
		if($(this).attr('checked') != undefined) {
			$(this).parent().addClass("checked");
			$(this).prop('checked', true);
		} else {
			$(this).prop('checked', false);
		}
		if($(this).attr('data-label') != undefined) {
			$(this).parent().append('<span class="suit-checkbox-label">'+$(this).attr('data-label')+'</span>')
		}
	});
};