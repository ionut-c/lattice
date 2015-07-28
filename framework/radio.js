var Radios = function() {
	$(document).on('click', '.suit-radio', function() {
		$('.suit-radio-wrapper[data-group="'+$(this).parent().attr("data-group")+'"]').removeClass("checked");
		$(this).parent().addClass("checked");
		$(this).siblings("input").prop('checked', true);
	});
	$(document).on('click', '.suit-radio-label', function() {
		$('.suit-radio-wrapper[data-group="'+$(this).parent().attr("data-group")+'"]').removeClass("checked");
		$(this).parent().addClass("checked");
		$(this).siblings("input").prop('checked', true);
	});
	$('input:radio[data-interface="suit"]').each(function() {
		$(this).hide();
		if($(this).attr('data-size') != undefined) {
			var size = "font-size: "+$(this).attr('data-size')+"rem";
		} else {
			var size = "";
		}
		$(this).wrap('<div class="suit-radio-wrapper" data-group="'+$(this).attr("data-group")+'" style="'+size+'"></div>');
		$(this).parent().append('<div class="suit-radio"></div>');
		if($(this).attr('checked') != undefined) {
			$(this).parent().addClass("checked");
			$(this).prop('checked', true);
		} else {
			$(this).prop('checked', false);
		}
		if($(this).attr('data-label') != undefined) {
			$(this).parent().append('<span class="suit-radio-label">'+$(this).attr('data-label')+'</span>')
		}
	});
};