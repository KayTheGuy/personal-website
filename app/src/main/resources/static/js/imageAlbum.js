$(document).ready(function() {
	// get album images
	$.ajax({
		url : '/api/album',
		type : 'GET',
		contentType: "application/json",
		dataType: 'json',
//	beforeSend : showSpinner()
	}).done(function(imgList) {
		var currentPic;
		var currentPicDiv;
		var currentSpaceDiv;
		var currentMiddleDiv;
		var currentRow;
		var currentRowIndx = 0;
		for(var i = 0; i < imgList.length; i++) {
			var album = $('#img-album-content');
			if(i % 3 === 0) {
				currentRow = $("<div>", {id: "row" + currentRowIndx++, "class": "mdl-grid"});
				currentSpaceDiv = $("<div>", {"class": "mdl-cell mdl-cell--2-col"});
				currentRow.append(currentSpaceDiv);
				album.append(currentRow);
			} 
			currentPicDiv = $("<div>", {id: "img" + i, "class": "album-image-div mdl-cell mdl-cell--3-col"});
			currentPic = $("<img>", {src: imgList[i].path, "class": "album-image", alt: imgList[i].name, height: "150", width: "225"});
			currentMiddleDiv = "<div class=\"album-img-middle\"><div class=\"album-img-text\"><i class=\"image-map material-icons\">place</i>" 
								+  imgList[i].name
								+ "</div></div>";
			currentPicDiv.append(currentPic);
			currentPicDiv.append(currentMiddleDiv);
			currentRow.append(currentPicDiv);
			if(i % 3 === 2) {
				currentSpaceDiv = $("<div>", {"class": "mdl-cell mdl-cell--1-col"});
				currentRow.append(currentSpaceDiv);
			}
		}
	}).always(function() {
		// always
	}).fail(function(message) {
		showError("Failed to send message. Please Try again." + message.responseText);
	});
	
	// event handler for dynamically added elements
	var modal = document.getElementById('contactSentMsg');
	$(document).on ("click", ".album-image", function () {
		// show message
		var imageElement = $('#image-preview');
		imageElement.attr('src', this.src);
		modal.style.visibility = "visible";
		
    });
	
	// close modal handlers
	$('#modalClose').on('click', function() {
	    modal.style.visibility = "hidden";
	});
	
	$(document).on('click touchstart', function(event) {
	    if (event.target == modal) {
	        modal.style.visibility = "hidden";
	    }
	});
});