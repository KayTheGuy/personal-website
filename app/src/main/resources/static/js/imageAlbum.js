var imgList; // global object to hold image information

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
		$('#image-modal-before').css({backgroundColor: 'white', color: '#00b5ec'});
		$('#image-modal-before').prop('disabled', false);
	} else {
		$('#image-modal-before').css({backgroundColor: 'rgba(0,0,0,0)', color: 'rgba(0,0,0,0)'});
		$('#image-modal-before').prop('disabled', true);
	}
	
	if($('#' + nextID).length) {
		$('#image-modal-next').css({backgroundColor: 'white', color: '#00b5ec'});
		$('#image-modal-next').prop('disabled', false);
	} else {
		$('#image-modal-next').css({backgroundColor: 'rgba(0,0,0,0)', color: 'rgba(0,0,0,0)'});
		$('#image-modal-next').prop('disabled', true);
	}
	
	var selectedImg = imgList[imgId - 1];
	var imageElement = $('#image-modal');
	var locationIcon = "<i data-lat=\"" + selectedImg.lat + "\" data-lng=\"" + selectedImg.lng + "\" class=\"image-map material-icons\">place</i>"
	imageElement.attr('src', selectedImg.path); 
	$('#image-modal-location').html(locationIcon + selectedImg.name);
	$('#image-modal-date').html(selectedImg.date);
}

var numOfLoad = 0;
var loading = true;
function renderImages() {
	var currentPic, currentPicDiv, currentSpaceDiv, currentMiddleDiv, currentRow;
	var numOfImagePerLoad = 21; // must be multiple of 3 to work properly
	startID = numOfLoad * numOfImagePerLoad;
	endID = Math.min(startID + numOfImagePerLoad, imgList.length);
	numOfLoad++;
	console.log(numOfLoad);
	for(var i = startID; i < endID; i++) {
		var album = $('#img-album-content');
		if(i % 3 === 0) {
			currentRow = $("<div>", {"class": "mdl-grid"});
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
	// current loading is complete
	loading = false;
	// hide spinner
	$('#spinner').css({visibility: 'hidden'});
	
	// all images loaded
	if(endID === imgList.length) {
		// remove scroll listener
		$('#mainContent').scroll(function() {
			// nothing
		}); 
		// remove spinner
		$('#spinner').remove();
	}
}

function dynamicImageLoad() {
	var currentScroll = $(this)[0].scrollTop;
	var maxScroll = $(this)[0].scrollHeight - $(this).height();
    if(!loading && (currentScroll >= maxScroll - 50)) {
    	// show spinner
    	$('#spinner').css({visibility: 'visible'});
    	// is loading: stop scroll listener from doing anything
    	loading = true;
    	renderImages();
    }
}

$(document).ready(function() {
	// dynamically load more images on scroll
	$('#mainContent').on(
		{
			'touchmove': dynamicImageLoad,
			'scroll': dynamicImageLoad
		}
	);
	
	var currentImgID;
	
	// get album images
	$.ajax({
		url : '/api/album',
		type : 'GET',
		contentType: "application/json",
		dataType: 'json',
	}).done(function(data) {
		// set global object holding image information
		imgList = data;
		// render few first images
		renderImages();
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
		currentImgID--;
		setModalImage(currentImgID);
	});
	
	$('#image-modal-next').on('click', function() {
		currentImgID++
		setModalImage(currentImgID);
	});
	
	var mapModal = document.getElementById('map-prev-div');
	$(document).on("click", ".image-map", function () {
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