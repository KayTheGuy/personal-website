function xhr_get(url) {
	return $.ajax( {
		url: url,
		type: 'get',
		beforeSend: showSpinner
	}).always(function(data) {
		$('#mainContent').empty();
	}).fail(function(message) {
		// show error message
	});
}

function showSpinner() {
	var spinner = "<div id=\"spinner\" class=\"mdl-spinner mdl-js-spinner is-active \"></div>";
	$('#mainContent').empty().append(spinner);
	componentHandler.upgradeElement($('#spinner').get(0));
}


$(document).ready(function() {
	// requesting academics page
	$('#academics').click(function(e) {
		e.preventDefault();
		xhr_get('/academics').done(function(data) {
			$('#mainContent').append(data);
		});
	});
	
	// requesting resume file
	$('#resume').click(function(e) {
		e.preventDefault();
		xhr_get('/resume').done(function(data) {
			$('#mainContent').append(data);
		});
	});
	
	// requesting contact page
	$('#contact').click(function(e) {
		e.preventDefault();
		xhr_get('/contact').done(function(data) {
			$('#mainContent').append(data);
		});
	});
	
	// test spinner
	$('#spinnerTest').click(function(e) {
		showSpinner();
	});
});