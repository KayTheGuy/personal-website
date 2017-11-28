var formErrMsg = 'Please fill the form first.';

function checkEmailInput(email) {
	var re = /\S+@\S+\.\S+/;
	var result = re.test(email);
	if(!result) {
		formErrMsg = 'You have entered an invalid email address.';
		$('#contact-form-email').css({ borderBottom: '1px solid #e45514'});
		return false;
	}
	$('#contact-form-email').css({ borderBottom: '1px solid rgba(0,0,0,.12)'});
	return true;
}

function checkEmptyInput(input, field) {
	if(!input) { // empty field
		formErrMsg = 'Please provide a valid ' + field;
		$('#contact-form-' + field).css({ borderBottom: '1px solid #e45514'});
		return false;
	}
	$('#contact-form-' + field).css({ borderBottom: '1px solid rgba(0,0,0,.12)'});
	return true;
}

function checkAllInputs() {
	return checkEmailInput($('#contact-form-email').val()) &&
			checkEmptyInput($('#contact-form-name').val(), 'name') &&
			checkEmptyInput($('#contact-form-subject').val(), 'subject') &&
			checkEmptyInput($('#contact-form-message').val(), 'message');
}

function showSpinner() {
	$('#modalSpinner').css({visibility: 'visible'});
}

$(document).ready(function() {
	
	// check form inputs
	$('#contact-form-email').blur(function() {
		checkEmailInput($(this).val());
	});
	
	$('#contact-form-name').blur(function() {
		checkEmptyInput($(this).val(), 'name');
	});
	
	$('#contact-form-subject').blur(function() {
		checkEmptyInput($(this).val(), 'subject');
	});
	
	$('#contact-form-message').blur(function() {
		checkEmptyInput($(this).val(), 'message');
	});
	
	// click hidden form submit
	$('#contatct-form-button').click(function() {
		$('#contatct-form-upload').click();
	});
	
	// submit contact form
	$('#contatct-form').on('submit', function(e) {
		e.preventDefault();
		
		if(checkAllInputs()) {
			// get form data
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
			beforeSend : showSpinner()
			}).done(function() {
				// hide spinner
				$('#modalSpinner').css({visibility: 'hidden'});
				
				// show message
				var modal = document.getElementById('contactSentMsg');
				modal.style.visibility = "visible";
				
				$('#modalClose').on('click', function() {
				    modal.style.visibility = "hidden";
				});
				
				$(document).on('click touchstart', function(event) {
				    if (event.target == modal) {
				        modal.style.visibility = "hidden";
				    }
				});
				
			}).always(function() {
				// always
			}).fail(function(message) {
				showError("Failed to send message. Please Try again." + message.responseText);
			});
		} else {
			showError(formErrMsg);
		}
	});
});