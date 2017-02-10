(function(global, $) {
    'use strict';

    var FilterComponent = function(options) {
        var $component,
            $elementsContainer,
            $controls,
            $filterAllControl,
            $otherControls,
            opts;

        var defaults = {
            component: '.filter-component',
            elementsContainer: '.filter-gallery',
            controls: '.filter-control',
            singleFiltering: true
        };

        function toggleString(str, strToToggle) {
            var indexOfFilterValue = str.indexOf(strToToggle);
            if (indexOfFilterValue > -1) {
                if (indexOfFilterValue === 0) {
                    str = str.substring(strToToggle.length + 1);
                } else {
                    str = str.substring(0, indexOfFilterValue) + str.substring(indexOfFilterValue + strToToggle.length + 1);
                }
            } else {
                str = str.length === 0 ? strToToggle : (str + ' ' + strToToggle);
            }
            return str;
        }

        function removeString(str, strToRemove) {
            var indexStrToRemove = str.indexOf(strToRemove);
            if (indexStrToRemove > -1) {
                if (indexStrToRemove === 0) {
                    str = str.substring(strToRemove.length + 1);
                } else {
                    str = str.substring(0, indexStrToRemove) + str.substring(indexStrToRemove + strToRemove.length + 1);
                }
            }
            return str;
        }

        function handleSingleFiltering(e) {
            e.preventDefault();
            var $this = $(this),
                filterValue = $this.attr('data-filter');

            if ($this.hasClass('highlight')) {
                $this.removeClass('highlight');
                $elementsContainer.attr('data-filter', '');
            } else {
                $controls.each(function() {
                    var $current = $(this);
                    if ($current != $this) {
                        $current.removeClass('highlight');
                    }
                })
                $this.addClass('highlight');
                $elementsContainer.attr('data-filter', filterValue);
            }
        }

        function handleMultipleFiltering(e) {
            e.preventDefault();
            var $this = $(this),
                filterValue = $this.attr('data-filter'),
                galleryFilterData = $elementsContainer.attr('data-filter');

            $this.toggleClass('highlight');

            if (filterValue === 'filter-all') {
                if ($elementsContainer.attr('data-filter') === 'filter-all') {
                    $elementsContainer.attr('data-filter', '');
                } else {
                    $elementsContainer.attr('data-filter', 'filter-all');
                    $otherControls.removeClass('highlight');
                }
            } else {
                galleryFilterData = toggleString(galleryFilterData, filterValue);
                galleryFilterData = removeString(galleryFilterData, 'filter-all');
                $elementsContainer.attr('data-filter', galleryFilterData);
                $filterAllControl.removeClass('highlight');
            }
        }

        function changeFiltering(newOption) {
            resetFilter();
            if (opts.singleFiltering) {
                $controls.off('click', handleSingleFiltering);
                opts.singleFiltering = false;
            } else {
                $controls.off('click', handleMultipleFiltering);
                opts.singleFiltering = true;
            }

            switch (newOption) {
                case 'single':
                    $controls.on('click', handleSingleFiltering);
                    break;
                case 'multiple':
                    $controls.on('click', handleMultipleFiltering);
                    break;
                default:
                    console.log('Option not available');
            }
        }

        function resetFilter() {
            $elementsContainer.attr('data-filter', 'filter-all');
            $filterAllControl.addClass('highlight');
            $otherControls.removeClass('highlight');
        }

        function bindEvents() {
            if (opts.singleFiltering) {
                $controls.on('click', handleSingleFiltering);
            } else {
                $controls.on('click', handleMultipleFiltering);
            }
        }

        function init(options) {
            opts = $.extend({}, defaults, options || {});

            $component = $(opts.component);
            $elementsContainer = $(opts.elementsContainer, $component);
            $controls = $(opts.controls, $component);
            $filterAllControl = $(opts.controls + "[data-filter='filter-all']", $component);
            $otherControls = $controls.not("[data-filter='filter-all']");
            if (!$component.length || !$elementsContainer || !$controls) return;

            bindEvents();
        }

        init(options);

        return {
            changeFiltering: changeFiltering,
            reset: resetFilter
        }
    };

    if (global.FilterComponent) {
        console.log('FilterComponent already exist!');
    } else {
        global.FilterComponent = FilterComponent;
    }
}(this, jQuery));


/*
    HTML Structure:

    <section class="filter-component">
        <div class="filter-controls">
            <a class="filter-control highlight" data-filter="filter-all">all</a>
            <a class="filter-control" data-filter="filter-blog">blog</a>
            ...
        </div>
        <div class="filter-gallery" data-filter="filter-all">
            <div data-filter-type="filter-blog">
                <h2>Positive blog</h2>
            </div>
            <div data-filter-type="filter-news">
                <h2>Positive news</h2>
            </div>
            ...
        </div>
    </section>


    CSS Declaration:

    .filter-gallery [data-filter-type] {
        opacity: 0.2;
        transform: scale(0);
        transition: 0.5s ease all;
    }

    .filter-gallery[data-filter='filter-all'] [data-filter-type] {
        opacity: 1;
        transform: scale(1);
        transition: 1s ease all;
    }

    .filter-gallery[data-filter*='filter-blog'] [data-filter-type='filter-blog'],
    .filter-gallery[data-filter*='filter-news'] [data-filter-type='filter-news'],
    .filter-gallery[data-filter*='filter-social'] [data-filter-type='filter-social']  {
        opacity: 1;
        transform: scale(1);
    }


    JavaScript init:

    var filterComponent = new FilterComponent({
            component: '.filter-component',
            elementsContainer: '.filter-gallery',
            controls: '.filter-control',
            singleFiltering: true
    });

    filterComp.changeFiltering('single');
    filterComp.changeFiltering('multiple');
    filterComp.reset();

*/
