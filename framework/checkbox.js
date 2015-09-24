function InputTypeCheckbox() {
    var $component = $('body').find('input:checkbox[data-interface="lattice"]');
    
    function render() {
        $component.each(function() {
            $(this).hide();
            if($(this).attr('data-size') != undefined) {
                var size = "font-size: "+$(this).attr('data-size')+"rem";
            } else {
                var size = "";
            }
            $(this).wrap('<div class="lattice-checkbox-wrapper" style="'+size+'"></div>');
            $(this).parent().append('<div class="lattice-checkbox"></div>');
            if($(this).attr('checked') != undefined) {
                $(this).parent().addClass("checked");
                $(this).prop('checked', true);
            } else {
                $(this).prop('checked', false);
            }
            if($(this).attr('data-label') != undefined) {
                $(this).parent().append('<span class="lattice-checkbox-label">'+$(this).attr('data-label')+'</span>')
            }
        });
    }

    function attachEvents() {
        $(document).on('click', '.lattice-checkbox', function() {
            $(this).parent().toggleClass("checked");
            $(this).siblings("input").prop('checked', !$(this).siblings("input").prop('checked'));
        });
        $(document).on('click', '.lattice-checkbox-label', function() {
            $(this).parent().toggleClass("checked");
            $(this).siblings("input").prop('checked', !$(this).siblings("input").prop('checked'));
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