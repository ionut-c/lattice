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
            
            var classes = "lattice-radio";
            if($(this).attr('disabled') != undefined) {
                classes += " lattice-disabled";
            }
            $(this).parent().append('<div class="'+classes+'"></div>');
            
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
            if(!$(this).hasClass('lattice-disabled')) {
                $('.lattice-radio-wrapper[data-name="'+$(this).parent().attr("data-name")+'"]').removeClass("checked");
                $(this).parent().addClass("checked");
                $(this).siblings("input").click();
                if($(this).parent().hasClass("checked")) {
                    $(this).siblings("input").prop('checked', true);
                } else {
                    $(this).siblings("input").prop('checked', false);
                }
            }
        });
        $(document).on('click', '.lattice-radio-label', function() {
            if(!$(this).siblings('.lattice-disabled').length > 0) {
                $('.lattice-radio-wrapper[data-name="'+$(this).parent().attr("data-name")+'"]').removeClass("checked");
                $(this).parent().addClass("checked");
                $(this).siblings("input").click();
                if($(this).parent().hasClass("checked")) {
                    $(this).siblings("input").prop('checked', true);
                } else {
                    $(this).siblings("input").prop('checked', false);
                }
            }
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