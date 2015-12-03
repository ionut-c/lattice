function LatticeToggle() {
    var $component = $('body').find('input:checkbox[data-interface="lattice"][data-behaviour="toggle"]');
    
    function render() {
        $component.each(function() {
            $(this).hide();
            if($(this).attr('data-size') != undefined) {
                var size = "font-size: "+$(this).attr('data-size')+"rem";
            } else {
                var size = "";
            }
            $(this).wrap('<div class="lattice-toggle-wrapper" style="'+size+'"></div>');

            var classes = "lattice-toggle";
            if($(this).attr('disabled') != undefined || $(this).attr('readonly') != undefined) {
                classes += " lattice-disabled";
            }
            $(this).parent().append('<div class="'+classes+'"><span class="checked">'+$(this).attr("data-checked")+'</span><span class="unchecked">'+$(this).attr("data-unchecked")+'</span></div>');

            if($(this).attr('checked') != undefined) {
                $(this).parent().addClass("checked");
                $(this).prop('checked', true);
            } else {
                $(this).prop('checked', false);
            }
        });
    }

    function attachEvents() {
        $(document).on('click', '.lattice-toggle', function() {
            if(!$(this).hasClass('lattice-disabled')) {
                $(this).parent().toggleClass("checked");
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