function triggerBackToTop() {
	var top = $(this).scrollTop();
	if(top > 100) {
		$('.back-to-top').show();
	} else {
		$('.back-to-top').hide();
	}
};

function topFunction(e) {
	e.preventDefault();
    document.body.scrollTop = 0; 
    document.documentElement.scrollTop = 0;
}

$(document).ready(function() {
	$('.back-to-top').hide();
	$('.back-to-top').on('click touchstart', topFunction);
	$(document).on('scroll', triggerBackToTop);
	$(document).on('touchmove', triggerBackToTop);
});

