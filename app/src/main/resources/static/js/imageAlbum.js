$(document).ready(function() {
	
	$.ajax({
		url : '/api/album',
		type : 'GET',
		contentType: "application/json",
		dataType: 'json',
//	beforeSend : showSpinner()
	}).done(function(imgList) {
		var currentPic;
		var currentPicDiv;
		var currentRow;
		var currentRowIndx = 0;
		for(var i = 0; i < imgList.length; i++) {
			var album = $('#img-album-content');
			if(i % 3 === 0) {
				currentRow = $("<div>", {id: "row" + currentRowIndx++, "class": "mdl-grid"});
				album.append(currentRow);
			} 
			currentPicDiv = $("<div>", {id: "img" + i, "class": "mdl-cell mdl-cell--4-col"});
			currentPic = $("<img>", {src: imgList[i].path, "class": "album-img-cell", alt: imgList[i].name, height: "200", width: "300"});
			currentPicDiv.append(currentPic);
			currentRow.append(currentPicDiv);
		}
	}).always(function() {
		// always
	}).fail(function(message) {
		showError("Failed to send message. Please Try again." + message.responseText);
	});
	
});