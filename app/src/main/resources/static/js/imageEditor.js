var radioBtns;

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

function changeRadioBtnsClasses(id) {
	let slctdEl = document.getElementById(id);
	
	Array.prototype.forEach.call(radioBtns, function(btn) {
		rmClasName(btn, 'selected');
	});
	
	let newClass = slctdEl.className + ' selected';
	slctdEl.className = newClass;
}

// helper function
function rmClasName(element, className) {
	let classes = element.className.split(/\s+/);
    for(let i = 0; i < classes.length; i++) {
    	if (classes[i] === className) {
    		classes[i] = '';
    	} 
    }
    element.className = classes.join(' ');
}

$(document).ready(
		function() {
			// get all radio buttons
			radioBtns = document.getElementsByClassName('radio-btn');
			
			$('.radio-btn').on('click touchstart', function(e) {
				e.stopPropagation();
				changeRadioBtnsClasses($(this).attr('id'));
			});
			
			var filterID = 0;
			// trigger file picker
			$('#image-editor-select-button').on('click touchstart', function(e) {
				e.stopPropagation();
				$('#image-picker').click();
			});
			// make upload button visible
			$('#image-picker').change(function() {
				showPreview(this.files[0]);
			});

			// trigger black and black effect
			$('#bw').on('click touchstart', function(e) {
				e.stopPropagation();
				filterID = 0;
				$('#image-upload').click();
			});

			// trigger invert effect
			$('#invert').on('click touchstart', function(e) {
				e.stopPropagation();
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
									// show error
								});
					}));

			// undo applied filter
			$('#undo').on('click touchstart', function(e) {
				e.stopPropagation();
				$('#image-picker').change();
			});
		});