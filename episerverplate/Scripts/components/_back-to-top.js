(function(global, $) {
    'use strict';

    var BackToTopComponent = function(userOptions) {
        var $triggerElements,
            options;

        var defaultOptions = {
            sourceElement: '.js-scroll',
            duration: 400
        }

        function handleOnClick(e) {
            e.preventDefault();
            var $this = $(this),
                $container,
                targetElement,
                containerSelector = $this.attr('data-scroll-container'),
                targetElemSelector = $this.attr('data-scroll-target');

            if (!containerSelector) {
                containerSelector = 'window';
                $container = $('html, body');
            } else {
                $container = $(containerSelector);
            }

            if (containerSelector === targetElemSelector) {
                $container.animate({
                    scrollTop: 0
                }, options.duration);
            } else {
                targetElement = document.querySelector(targetElemSelector);
                $container.animate({
                    scrollTop: Math.abs(targetElement.offsetTop - $container[0].offsetTop)
                }, options.duration);
            }
        }

        function bindEvents() {
            $triggerElements.on('click', handleOnClick);
        }

        function init(userOptions) {

            options = $.extend({}, defaultOptions, userOptions);

            $triggerElements = $(options.sourceElement);

            if ($triggerElements.length) {
                bindEvents();
            }
        }

        init(userOptions);
    };

    if (global.BackToTopComponent) {
        console.log('BackToTopComponent already exist!');
    } else {
        global.BackToTopComponent = BackToTopComponent;
    }

}(this, jQuery));

/*
    HTML Structure:

    1. Back to top of the page
        Specify the data-scroll-target attribute to be equal to window.

        <a href="#" class="js-scroll" data-scroll-target="window">back to page top</a>

    2. Back to top of a scrollable container

        Specify both data-scroll-target and data-scroll-container attributes to be equal to the same section selector.

       <section id="#section">
           ....
           <a href="#" class="js-scroll" data-scroll-target="#section" data-scroll-container="#section">back to section top</a>
       </section>

    3. Go to specific item

        Specify the data-scroll-target attribute to be equal to the selector of the item.

        <a href="#" class="js-scroll" data-scroll-target="#item">go to item</a>
        ...
        <div id="item"></div>

    4. Go to item inside a scrollable container

        Specify the data-scroll-target attribute to be equal to the selector of the item.
        Specify the data-scroll-container to be equal to the selector of the container.

        <section id="#section">
           ....
           <div id="item"></div>
           ...
           <a href="#" class="js-scroll" data-scroll-target="#item" data-scroll-container="#section">go to item</a>
           ...
        </section>


    JavaScript init:

    var backToTopComponent = new BackToTopComponent({
        sourceElement: '.js-scroll',
        duration: 800
    });
*/
