function InputTypeRadio() {
    var $component = $('body').find('input:radio[data-interface="lattice"]');

    function render() {
        $('body').find('input:radio[data-interface="lattice"]').each(function() {
            $(this).hide();
            if($(this).attr('data-size') != undefined) {
                var size = "font-size: "+$(this).attr('data-size')+"rem";
            } else {
                var size = "";
            }
            $(this).wrap('<div class="lattice-radio-wrapper" data-name="'+$(this).attr("name")+'" style="'+size+'"></div>');
            $(this).parent().append('<div class="lattice-radio"></div>');
            if($(this).attr('checked') != undefined) {
                $(this).parent().addClass("checked");
                $(this).prop('checked', true);
            } else {
                $(this).prop('checked', false);
            }
            if($(this).attr('data-label') != undefined) {
                $(this).parent().append('<span class="lattice-radio-label">'+$(this).attr('data-label')+'</span>')
            }
        });
    }

    function attachEvents() {
        $(document).on('click', '.lattice-radio', function() {
            $('.lattice-radio-wrapper[data-name="'+$(this).parent().attr("data-name")+'"]').removeClass("checked");
            $(this).parent().addClass("checked");
            $(this).siblings("input").prop('checked', true);
        });
        $(document).on('click', '.lattice-radio-label', function() {
            $('.lattice-radio-wrapper[data-name="'+$(this).parent().attr("data-name")+'"]').removeClass("checked");
            $(this).parent().addClass("checked");
            $(this).siblings("input").prop('checked', true);
        });
    }

    function init() {
        render();
        attachEvents();
    }

    if($component.length > 0) {
        init();
    }
};