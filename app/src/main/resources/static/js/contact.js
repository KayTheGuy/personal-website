$(document).ready(function() {
	$('#contatct-form-button').click(function() {
		$('#contatct-form-upload').click();
	});
	$('#contatct-form').on('submit', function(e) {
		e.preventDefault();
		
		var formData = {
			name: $('#contact-form-name').val(),	
			email: $('#contact-form-email').val(),	
			subject: $('#contact-form-subject').val(),	
			message: $('#contact-form-message').val()	
		};
		
		$.ajax({
			url : '/message',
			type : 'POST',
			contentType: "application/json",
			dataType: 'json',
			data: JSON.stringify(formData),
//			beforeSend : showSpinner()
		}).done(function() {
			alert('message sent');
		}).always(function() {
			// always
		}).fail(function(message) {
			showError("Failed to send message. Please Try again." + message.responseText);
			console.log(message);
		});
	});
});