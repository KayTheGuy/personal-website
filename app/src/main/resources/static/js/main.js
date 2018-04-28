var showMessage = function(message) {
	var el = $('#main-message');
	if(message != undefined) {
		$('#main-message-txt').text(message);
	}
	el.css('display', 'block');
	el.addClass('active');
	setTimeout(hideMessage, 6000);
};

var hideMessage = function(e) {
	$('#main-message').removeClass('active');
};

var showSpinner = function() {
	$('.spinner').show();
};

var hideSpinner = function() {
	$('.spinner').hide();
};

var triggerBackToTop = function() {
	var top = $(this).scrollTop();
	if(top > 500) {
		$('.back-to-top').show();
	} else {
		$('.back-to-top').hide();
	}
};

var triggerBackToTopModal = function() {
	var top = $('.modal').scrollTop();
	if(top > 500) {
		$('.back-to-top-modal').show();
	} else {
		$('.back-to-top-modal').hide();
	}
};

var topFunction = function(e) {
	e.preventDefault();
    document.body.scrollTop = 0; 
    document.documentElement.scrollTop = 0;
};

var topFunctionMoal = function(e) {
	e.preventDefault();
	$('.modal').scrollTop(0); 
};

var clickLinkInside = function() {
	link = $(this).find("a").attr("href");
	
	if(link) {
		window.location = link;
	}
};

$(document).ready(function() {
	$(document).on('scroll', triggerBackToTop);
	$(document).on('touchmove', triggerBackToTop);
	$('.modal').on('scroll', triggerBackToTopModal);
	$('.modal').on('touchmove', triggerBackToTopModal);
	$('.menu-item').on('click touchstart', clickLinkInside);
	$('.menu-dropdown-item').on('click touchstart', clickLinkInside);
	$('.back-to-top').on('click touchstart', topFunction);
	$('.back-to-top-modal').on('click touchstart', topFunctionMoal);
	$('#main-message-close').on('click touchstart', hideMessage);
});

