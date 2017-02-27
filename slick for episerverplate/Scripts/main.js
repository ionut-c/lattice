$(document).ready(function() {
  $('.hero-slider-component').slick({
		slidesToShow: 1,
	    slidesToScroll: 1,
			arrows: false,
	    autoplay: true,
	    autoplaySpeed: 3000
	});

  $('.carousel-component').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  $('.test-carousel').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  // Carousel only on mobile - works only with refresh, NOT with resize
  $('.mobile-refresh-carousel-component').slick({
    responsive: [
      {
        breakpoint: 4000,
        settings: "unslick"
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
  // End carousel only on mobile - works only with refresh, NOT with resize

  // Carousel only on mobile - working with resize also
  var onMobile;

  if ($(window).width() < 768) {
    onMobile = true;
    $('.mobile-resize-carousel').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true
    });
  } else {
    onMobile = false;
  }

  $(window).resize(function() {
    if ($(window).width() < 768) {
      if(onMobile == false) {
        $('.mobile-resize-carousel').slick({
          slidesToShow: 1,
          slidesToScroll: 1
        });
        onMobile = true;
      }
    } else {
      if(onMobile == true) {
        $('.mobile-resize-carousel').slick('unslick');
        onMobile = false;
      }
    }
  });
  // End carousel only on mobile - working with resize also

  // Carousel on mobile and tablet only - working with resize also
  var onTablet;

  if ($(window).width() < 992) {
    onTablet = true;
    $('.mobile-tablet-resize-carousel').slick({
      slidesToShow: 2,
      slidesToScroll: 1,
      arrows: true,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    });
  } else {
    onTablet = false;
  }

  $(window).resize(function() {
    if ($(window).width() < 992) {
      if(onTablet == false) {
        $('.mobile-tablet-resize-carousel').slick({
          slidesToShow: 2,
          slidesToScroll: 1,
          responsive: [
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1
              }
            }
          ]
        });
        onTablet = true;
      }
    } else {
      if(onTablet == true) {
        $('.mobile-tablet-resize-carousel').slick('unslick');
        onTablet = false;
      }
    }
  });
  // End carousel on mobile and tablet only - working with resize also

  // Carousel on desktop only - working with resize also
  var onDesktop;

  if ($(window).width() > 992) {
    onDesktop = true;
    $('.desktop-resize-carousel').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: true
    });
  } else {
    onDesktop = false;
  }

  $(window).resize(function() {
    if ($(window).width() > 992) {
      if(onDesktop == false) {
        $('.desktop-resize-carousel').slick({
          slidesToShow: 4,
          slidesToScroll: 1
        });
        onDesktop = true;
      }
    } else {
      if(onDesktop == true) {
        $('.desktop-resize-carousel').slick('unslick');
        onDesktop = false;
      }
    }
  });
  // End carousel on desktop only - working with resize also
});

$(window).load(function() {
  var options = {
    parentSelector: '.same-height-component',
    childrenSelector: '.same-height-target',
    sameHeightOnResize: {
    }
  };

  // No same height on mobile
  var options2 = {
    parentSelector: '.same-height-until-mobile',
    childrenSelector: '.same-height-target-until-mobile',
    sameHeightOnResize: {
      minWidthToResize: 1,
      maxWidthToResize: 767
    }
  };

  var shComponent = window.SameHeightComponent(options);
  var shComponent2 = window.SameHeightComponent(options2);
});

// Use the code below for single carousel with pagination
if ($('.test-carousel-component').length > 0) {
	$(".test-carousel").each(function() {
		$(this).on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
			//currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
			var i = (currentSlide ? currentSlide : 0) + 1;
			var html = "<span class='active'>" + i + '</span>' + ' / ' + slick.slideCount;
			$(this).parent().find('.carousel-pagination').html(html);
		});
	});
};

// Use the code below for multiple carousels with pagination
// var elemArray = ['.test-carousel','.another-carousel'];
// var count = 0;
// for(count = 0; count < elemArray.length; count++) {
//   $(elemArray[count]).each(function() {
//     $(this).on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
//       //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
//       var i = (currentSlide ? currentSlide : 0) + 1;
//       var html = "<span class='active'>" + i + '</span>' + ' / ' + slick.slideCount;
//       $(this).parent().find('.carousel-pagination').html(html);
//     });
//   });
// }
