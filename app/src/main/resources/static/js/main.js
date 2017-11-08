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

$(document).ready(function() {

});