// show preview of selected image
function showPreview(form) {
	var file = form.files[0];
	if (file) {
		var reader = new FileReader();
		reader.onload = function(e) {
			var _URL = window.URL || window.webkitURL;
			var img = new Image();
			var imageElement = $('#image-preview');
			// create image object to find the width and height of the file
			img.onload = function() {
				var height = this.height;
				var width = this.width;

				// resize large images
				if (height > 800 || width > 800) {
					var max = Math.max(height, width);
					var downSizeRatio = Math.round(max / 800);
					imageElement.attr('height', height / downSizeRatio);
					imageElement.attr('width', width / downSizeRatio);
				} else {
					imageElement.attr('height', height);
					imageElement.attr('width', width);
				}
			};
			img.src = _URL.createObjectURL(file); // trigger the img.onload
			imageElement.attr('src', e.target.result);
			$('#image-label').text(file.name);
			
		};
		reader.readAsDataURL(file);
	}
}

function showSpinner() {
	var spinner = "<div id=\"spinner\" class=\"mdl-spinner mdl-js-spinner is-active \"></div>";
	$('#img-spinner').empty().append(spinner);
	componentHandler.upgradeElement($('#spinner').get(0));
}

$(document).ready(function() {
	var filterID = 0;
	// trigger file picker
	$('#image-button').click(function() {
		$('#image-picker').click();
	});
	// make upload button visible
	$('#image-picker').change(function() {
		// TODO: create multiple buttons for different edits instead
		showPreview(this);
	});

	// trigger black and white effect
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
	$('#image-form').on('submit', (function(e) {
		e.preventDefault();
		$.ajax({
			url : '/filter/' + filterID,
			enctype : 'multipart/form-data',
			type : 'POST',
			processData : false, // important: it is raw image and shouldn't be converted to String
			contentType : false,
			data : new FormData(this),
			beforeSend : showSpinner()
		}).done(function(img) {
			$('#image-preview').attr('src', "data:image/png;base64," + img);
		}).always(function() {
			$('#img-spinner').empty();
		}).fail(function(message) {
			showError("Code "+ message.responseJSON.status + ": " + message.responseJSON.message);
		});
	}));
	
	// undo applied filter
	$('#undo').click(function() {
		$('#image-picker').change();
	});
});