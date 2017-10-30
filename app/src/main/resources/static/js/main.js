$(document).ready(function() {
	function xhr_get(url) {
		return $.ajax( {
			url: url,
			type: 'get',
//			dataType: 'json',
//		beforeSend:
		}).always(function() {
			// remove loading image
		}).fail(function(message) {
			// show error message
//			console.error(message);
		});
	}
	
	$('#academics').click(function(e) {
		e.preventDefault();
		xhr_get('/academics').done(function(data) {
			$('#mainContent').empty().append(data);
		});
	});
});