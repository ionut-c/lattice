$(document).ready(function() {
	var inputTypeCheckbox = new InputTypeCheckbox();
	var inputTypeRadio = new InputTypeRadio();
	var inputTypeFile = new InputTypeFile();
	$(".code").each(function() {
		var temp = $(this).html();
		temp = temp.replace(/="/g, "=\"<span class=\"value\">");
		temp = temp.replace(/" /g, "</span>\" ");
		temp = temp.replace(/"&gt;/g, "</span>\">");
		$(this).html(temp);
	});
});

