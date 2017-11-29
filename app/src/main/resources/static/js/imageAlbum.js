// google map functions
function initMap() {
	var uluru = {lat: 49.2827, lng: -123.1207};
	mapHelper(8, uluru);
}

function adjustMap(lat, lng) {
	var uluru = {lat: lat, lng: lng};
	mapHelper(14, uluru);
}

function mapHelper(zoom, uluru) {
	var map = new google.maps.Map(document.getElementById('album-map'), {
		zoom: zoom,
		center: uluru
	});
	var marker = new google.maps.Marker({
		position: uluru,
		map: map
	});
}

$(document).ready(function() {
	// get album images
	$.ajax({
		url : '/api/album',
		type : 'GET',
		contentType: "application/json",
		dataType: 'json',
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
			currentPic = $("<img>", {src: imgList[i].path, "class": "album-image", alt: imgList[i].name, "data-date": imgList[i].date, height: "150", width: "225"});
			currentMiddleDiv = "<div class=\"album-img-middle\"><div class=\"album-img-text\"><i data-lat=\"" + imgList[i].lat + "\" data-lng=\"" + imgList[i].lng + "\" class=\"image-map material-icons\">place</i>" 
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
		showError("Failed to load images. Please Try again." + message.responseText);
	});
	
	// event handler for dynamically added elements
	var imgModal = document.getElementById('image-prev-div');
	$(document).on ("click", ".album-image", function () {
		var imageElement = $('#image-preview');
		imageElement.attr('src', this.src);
		$('#image-preview-location').html(this.alt);
		$('#image-preview-date').html($(this).data('date'));
		imgModal.style.visibility = "visible";
    });
	
	var mapModal = document.getElementById('map-prev-div');
	$(document).on ("click", ".image-map", function () {
		adjustMap(parseFloat($(this).data('lat')), parseFloat($(this).data('lng')));
		mapModal.style.visibility = "visible";
	});
	
	// close modal handlers
	$('.close').on('click', function() {
		imgModal.style.visibility = "hidden";
		mapModal.style.visibility = "hidden";
	});
	
	$(document).on('click touchstart', function(event) {
		if (event.target == imgModal || event.target == mapModal) {
			imgModal.style.visibility = "hidden";
			mapModal.style.visibility = "hidden";
		}
	});
});