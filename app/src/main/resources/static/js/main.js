function xhr_get(url) {
	return $.ajax( {
		url: url,
		type: 'get',
//		beforeSend: showSpinner
	}).always(function(data) {
		// stop spinner
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

});