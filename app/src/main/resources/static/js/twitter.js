
$(document).ready(function() {
	
	$('#twitter-button').click(function() {
		$.ajax({
			url : '/api/twitter',
			type : 'GET',
			contentType: "application/json",
			dataType: 'json',
		}).done(function() {
			
		}).always(function() {
			
		}).fail(function() {
			
		});
	});
	
});