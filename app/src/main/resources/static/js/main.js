function showSpinner() {
	$('.spinner').shoe();
}

function hideSpinner() {
	$('.spinner').hide();
}


function triggerBackToTop() {
	var top = $(this).scrollTop();
	if(top > 500) {
		$('.back-to-top').show();
	} else {
		$('.back-to-top').hide();
	}
};

function triggerBackToTopModal() {
	var top = $('.modal').scrollTop();
	if(top > 500) {
		$('.back-to-top-modal').show();
	} else {
		$('.back-to-top-modal').hide();
	}
};

function topFunction(e) {
	e.preventDefault();
    document.body.scrollTop = 0; 
    document.documentElement.scrollTop = 0;
}

function topFunctionMoal(e) {
	e.preventDefault();
	$('.modal').scrollTop(0); 
}

function clickLinkInside() {
	link = $(this).find("a").attr("href");
	
	if(link) {
		window.location = link;
	}
}

$(document).ready(function() {
	$('.back-to-top').on('click touchstart', topFunction);
	$('.back-to-top-modal').on('click touchstart', topFunctionMoal);
	$(document).on('scroll', triggerBackToTop);
	$(document).on('touchmove', triggerBackToTop);
	$('.modal').on('scroll', triggerBackToTopModal);
	$('.modal').on('touchmove', triggerBackToTopModal);
	$('.menu-item').on('click touchstart', clickLinkInside);
});

