$(document).ready(function(){
	if ($('.slider').length > 0) {
	  $('.slider').slick({
		  dots: true,
		  infinite: true,
		  speed: 300,
	  });
	}

	if ($('.carousel').length > 0) {
	  $('.carousel').slick({
		  dots: true,
		  infinite: true,
		  speed: 300,
		  slidesToShow: 3,
		  slidesToScroll: 3,
		  responsive: [
		    {
		      breakpoint: 1200,
		      settings: {
		        slidesToShow: 2,
		        slidesToScroll: 2,
		        arrows: false
		      }
		    },
		    {
		      breakpoint: 768,
		      settings: {
		        slidesToShow: 1,
		        slidesToScroll: 1,
		        arrows: false
		      }
		    }
		  ]
	  });
	}
});