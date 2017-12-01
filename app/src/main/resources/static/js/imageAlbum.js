// google map functions
function initMap() {
	var uluru = {lat: 49.2827, lng: -123.1207};
	mapHelper(8, uluru);
}

function adjustMap(lat, lng) {
	var uluru = {lat: lat, lng: lng};
	mapHelper(12, uluru);
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

function setModalImage(imgId) {
	var nextID = imgId + 1, prevID = imgId - 1;
	// only show next and previous buttons if there is an image next or previous
	if($('#' + prevID).length) {
		$('#image-modal-before').prop('disabled', false);
	} else {
		$('#image-modal-before').prop('disabled', true);
	}
	
	if($('#' + nextID).length) {
		$('#image-modal-next').prop('disabled', false);
	} else {
		$('#image-modal-next').prop('disabled', true);
	}
	
	var selectedImg = $('#' + imgId);
	var imageElement = $('#image-modal');
	imageElement.attr('src', selectedImg.attr('src'));
	$('#image-modal-location').html(selectedImg.attr('alt'));
	$('#image-modal-date').html(selectedImg.data('date'));
}

$(document).ready(function() {
	var firstImgId, lastImgId, currentImgID;
	
	// get album images
	$.ajax({
		url : '/api/album',
		type : 'GET',
		contentType: "application/json",
		dataType: 'json',
	}).done(function(imgList) {
		firstImgId = 1; // in database id is identity(1,1)
		lastImgId = imgList.length;
		
		var currentPic, currentPicDiv, currentSpaceDiv, currentMiddleDiv, currentRow;
		var currentRowIndx = 0;
		for(var i = 0; i < imgList.length; i++) {
			var album = $('#img-album-content');
			if(i % 3 === 0) {
				currentRow = $("<div>", {id: "row" + currentRowIndx++, "class": "mdl-grid"});
				currentSpaceDiv = $("<div>", {"class": "mdl-cell mdl-cell--2-col"});
				currentRow.append(currentSpaceDiv);
				album.append(currentRow);
			} 
			currentPicDiv = $("<div>", {"class": "album-image-div mdl-cell mdl-cell--3-col"});
			currentPic = $("<img>", {id: imgList[i].id, src: imgList[i].path, "class": "album-image", alt: imgList[i].name, "data-date": imgList[i].date, height: "150", width: "225"});
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
		currentImgID = parseInt(this.id);
		setModalImage(currentImgID);
		imgModal.style.visibility = "visible";
    });
	
	// navigate through album
	$('#image-modal-before').on('click', function() {
		setModalImage(currentImgID--);
	});
	
	$('#image-modal-next').on('click', function() {
		setModalImage(currentImgID++);
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