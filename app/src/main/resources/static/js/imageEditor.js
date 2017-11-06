function showPreview(form) {
	var file = form.files[0];
	if(file) {
		var reader = new FileReader();
		reader.onload = function(e) {
			var _URL = window.URL || window.webkitURL;
			var img = new Image();
			var imageElement = $('#image-preview');
			// create image object to find the width and height of the file
			img.onload = function () {
				var height = this.height;
				var width = this.width;
				
				// resize large images
				if(height > 500 || width > 500) {
					var max = Math.max(height, width);
					var downSizeRatio = Math.round(max / 500);
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

$(document).ready(function() {
	// trigger file picker
	$('#image-button').click(function() {
		$('#image-picker').click();
	});
	// make upload button visible
	$('#image-picker').change(function() {
		// TODO: create multiple buttons for different edits instead
		// TODO: create modal spinner
		showPreview(this);
		$('#upload-button').removeAttr('hidden');
	});
	
	// trigger file upload
	$('#upload-button').click(function() {
		$('#image-upload').click();
	});
	
	// upload image using AJAX 
	$('#image-form').on('submit', (function(e) {
		e.preventDefault();
		$.ajax({
			url: '/upload/image',
			enctype: 'multipart/form-data',
			type: 'POST',
			processData: false, // important: it is raw image and shouldn't be converted to String
			contentType: false,
			data: new FormData(this),
//			beforeSend: test(this)
		}).done(function(data) {
			console.log('success: ' + data);
		}).always(function() {
			// remove spinner
		}).fail(function(message) {
			// properly show error message
			console.error(message);
		});
	}));
});