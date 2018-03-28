// show preview of selected image
function showPreview(file) {
	if (file) {
		var reader = new FileReader();
		reader.onload = function(e) {
			var imageElement = $('#image-editor-preview').attr('src',
					e.target.result);
			$('#image-label').text(file.name);
		};
		reader.readAsDataURL(file);
	}
}

function showSpinner() {
	$('#img-spinner').addClass('is-active');
}
function hideSpinner() {
	$('#img-spinner').removeClass('is-active');
}

$(document).ready(
		function() {
			var filterID = 0;
			// trigger file picker
			$('#image-editor-select-button').click(function() {
				$('#image-picker').click();
			});
			// make upload button visible
			$('#image-picker').change(function() {
				showPreview(this.files[0]);
			});

			// trigger black and black effect
			$('#bw').click(function() {
				filterID = 0;
				$('#image-upload').click();
			});

			// trigger invert effect
			$('#invert').click(function() {
				filterID = 1;
				$('#image-upload').click();
			});

			// upload image using AJAX
			$('#image-form').on(
					'submit',
					(function(e) {
						e.preventDefault();
						$.ajax({
							url : '/filter/' + filterID,
							enctype : 'multipart/form-data',
							type : 'POST',
							processData : false, // important: it is raw
													// image and shouldn't be
													// converted to String
							contentType : false,
							data : new FormData(this),
							beforeSend : showSpinner()
						}).done(
								function(img) {
									$('#image-editor-preview').attr('src',
											"data:image/png;base64," + img);
								}).always(function() {
							hideSpinner();
						}).fail(
								function(message) {
									showError("Code "
											+ message.responseJSON.status
											+ ": "
											+ message.responseJSON.message);
								});
					}));

			// undo applied filter
			$('#undo').click(function() {
				$('#image-picker').change();
			});
		});