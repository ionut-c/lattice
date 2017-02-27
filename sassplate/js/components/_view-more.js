(function(global, $) {
    'use strict';

    function ViewMoreComponent(settings) {

        var $components,
            options;

        var defaults = {
            component: '.view-more-component',
            elements: '.view-more-element',
            moreBtn: '.view-more',
            lessBtn: '.view-less',
            mobile: {
                breakpoint: 768,
                elementsToLoad: 1,
                initialVisibleElements: 1
            },
            tablet: {
                breakpoint: 992,
                elementsToLoad: 2,
                initialVisibleElements: 2
            },
            desktop: {
                elementsToLoad: 3,
                initialVisibleElements: 3
            }
        };

        function init(settings) {
            options = $.extend(true, {}, defaults, settings);
            $components = $(options.component);

            $components.each(function(index,elem){

                var $component,
                    $elements,
                    $moreBtn,
                    $lessBtn,
                    $window,
                    totalSize,
                    visibleElements,
                    initialVisibleElements,
                    elementsToLoad,
                    isLastRow,
                    elementsOnLastRow;

                function handleResize() {
                    $elements.hide();
                    $moreBtn.off();
                    $lessBtn.off();
                    $lessBtn.hide();
                    isLastRow = false;
                    initOptions();
                    loadContent();
                }

                function debounce(fn, delay) {
                    var timer;

                    return function() {
                        var context = this;
                        var args = arguments;

                        clearTimeout(timer);
                        timer = setTimeout(function() {
                            fn.apply(context, args);
                            timer = null;
                        }, delay);
                    }
                }

                function showItems(e) {
                    e.preventDefault();

                    var nextVisibleElements;

                    nextVisibleElements = ((visibleElements + elementsToLoad) <= totalSize) ? (visibleElements + elementsToLoad) : totalSize;
                    $elements.slice(visibleElements, nextVisibleElements).slideDown('fast');

                    $lessBtn.show();

                    if (nextVisibleElements == totalSize) {
                        $moreBtn.hide();
                        isLastRow = true;
                        elementsOnLastRow = totalSize - visibleElements;
                    } else {
                        isLastRow = false;
                    }
                    visibleElements = nextVisibleElements;
                }

                function hideItems(e) {
                    e.preventDefault();

                    var nextVisibleElements;

                    if (isLastRow) {
                        nextVisibleElements = visibleElements - elementsOnLastRow;
                        isLastRow = false;
                    } else {
                        nextVisibleElements = visibleElements - elementsToLoad;
                    }

                    $elements.slice(nextVisibleElements, visibleElements).slideUp('fast');
                    visibleElements = nextVisibleElements;

                    if (visibleElements <= elementsToLoad) {
                        $lessBtn.hide();
                    }

                    if (!$moreBtn.is(":visible")) {
                        $moreBtn.show();
                    }
                }

                function bindEvents() {
                    $moreBtn.on('click', showItems);
                    $lessBtn.on('click', hideItems);
                    $window.resize(debounce(handleResize, 100));
                }

                function loadContent() {
                    $elements.hide();
                    $elements.slice(0, initialVisibleElements).show();
                    if (visibleElements >= totalSize) {
                        $moreBtn.hide();
                    } else {
                        $moreBtn.show();
                        bindEvents();
                    }
                }

                /*
                    elementsToLoad - elements to load
                    initialVisibleElements - elements to show initialy
                    visibleElements - visible elements counter
                */
                function initOptions() {
                    if (window.innerWidth < options.mobile.breakpoint) {
                        elementsToLoad = options.mobile.elementsToLoad;
                        initialVisibleElements = options.mobile.initialVisibleElements;
                        visibleElements = options.mobile.initialVisibleElements;
                    } else if (window.innerWidth < options.tablet.breakpoint) {
                        elementsToLoad = options.tablet.elementsToLoad;
                        initialVisibleElements = options.tablet.initialVisibleElements;
                        visibleElements = options.tablet.initialVisibleElements;
                    } else {
                        elementsToLoad = options.desktop.elementsToLoad;
                        initialVisibleElements = options.desktop.initialVisibleElements;
                        visibleElements = options.desktop.initialVisibleElements;
                    }
                    return true;
                }

                function currentInit() {
                    $component = $(elem);
                    $elements = $component.find(options.elements);
                    $window = $(window);
                    totalSize = $elements.size();
                    $moreBtn = $(options.moreBtn, $component);
                    $lessBtn = $(options.lessBtn, $component);
                    isLastRow = false;
                    initOptions() && loadContent();
                }

                currentInit();
            });
        }

        init(settings);
    }

    if (global.ViewMoreComponent) {
        console.log('ViewMoreComponent already exist!');
    } else {
        global.ViewMoreComponent = ViewMoreComponent;
    }
}(window, jQuery));

/*
    HTML Structure:

    <section class="view-more-component">
        <div class="view-more-element">
            ...
        </div>
        <div class="view-more-element">
            ...
        </div>
        <div class="view-more-element">
            ...
        </div>
        <div class="view-more-element">
            ...
        </div>
        <div class="view-more-controls">
            <a href="#" class="view-more">view more</a>
            <a href="#" class="view-less">view less</a>
        </div>
    </section>


    JavaScript init:

    var viewMoreComponent = new ViewMoreComponent({
        component: ".view-more-component",
        elements: ".element",
        moreBtn: '.view-more',
        lessBtn: '.view-less',
        mobile: {
            breakpoint: 768,
            elementsToLoad: 1,
            initialVisibleElements: 1
        },
        tablet: {
            breakpoint: 992,
            elementsToLoad: 2,
            initialVisibleElements: 2
        },
        desktop: {
            elementsToLoad: 3,
            initialVisibleElements: 3
        }
    });
*/
