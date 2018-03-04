var imgList; // global object to hold image information
var numOfImagePerLoad = 6;
var numOfLoad = 0;
var loading = true;

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
		$('#image-modal-before').show();
	} else {
		$('#image-modal-before').hide();
	}
	
	if(imgId < numOfLoad * numOfImagePerLoad) {
		$('#image-modal-next').show();
	} else if(imgId  == numOfLoad * numOfImagePerLoad && imgId < imgList.length) {
		renderMoreImages();	
		$('#image-modal-next').show();
	} 
	else {
		$('#image-modal-next').hide();
	}
	
	var selectedImg = imgList[imgId - 1];
	var imageElement = $('#image-modal');
	var locationIcon = "<i data-lat=\"" + selectedImg.lat + "\" data-lng=\"" + selectedImg.lng + "\" class=\"image-map material-icons\">place</i>"
	imageElement.attr('src', selectedImg.path); 
	$('#image-modal-location').html(locationIcon + selectedImg.name + ', ');
	$('#image-modal-date').html(selectedImg.date);
}

function renderMoreImages() {
	var currentPic, currentPicDiv, currentSpaceDiv, currentMiddleDiv, currentRow;
	startID = numOfLoad * numOfImagePerLoad;
	endID = Math.min(startID + numOfImagePerLoad, imgList.length);
	numOfLoad++;
	var album = $('#img-album-content');
	var html = []
	for(var i = startID; i < endID; i++) {
		currentRowOpen = '<div class="album-image-row mdl-grid">';
		spaceDiv = '<div class="album-image-div mdl-cell mdl-cell--1-col"></div>';
		currentPicDivOpen = '<div class="album-image-div mdl-cell mdl-cell--10-col">';
		divClose = '</div>';
		
		currentPic = '<img id="' + imgList[i].id + '" src="' + imgList[i].path + 
					 '" class="album-image" alt="' + imgList[i].name + 
					 '" data-date="' + imgList[i].date + '">';
		
		currentMiddleDiv = '<div class="album-img-middle"><div class="album-img-text"><i data-lat="'
							+ imgList[i].lat + '" data-lng="' + imgList[i].lng + 
							'" class="image-map material-icons">place</i>' +  imgList[i].name
							+ '</div></div>';
		
		html.push(currentRowOpen);
		html.push(spaceDiv);
		
		html.push(currentPicDivOpen);
		
		html.push(currentPic);
		html.push(currentMiddleDiv);
		
		html.push(divClose);
		
		html.push(spaceDiv);
		html.push(divClose);
	}
	album.append(html.join(''));
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
    	renderMoreImages();
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
		renderMoreImages();
	}).always(function() {
		// always
	}).fail(function(message) {
		showError("Failed to load images. Please Try again." + message.responseText);
	});
	
	// event handler for dynamically added elements
	var imgModal = document.getElementById('image-prev-div');
	$(document).on ("click swipe", ".album-image", function () {
		currentImgID = parseInt(this.id);
		setModalImage(currentImgID);
		imgModal.style.visibility = "visible";
    });
	
	// navigate through album
	$('#image-modal-before').on('click touchstart', function() {
		currentImgID--;
		setModalImage(currentImgID);
	});
	
	$('#image-modal-next').on('click touchstart', function() {
		currentImgID++
		setModalImage(currentImgID);
	});
	
	var mapModal = document.getElementById('map-prev-div');
	$(document).on("click touchstart", ".image-map", function () {
		adjustMap(parseFloat($(this).data('lat')), parseFloat($(this).data('lng')));
		mapModal.style.visibility = "visible";
	});
	
	// close modal handlers
	$('.close').on('click touchstart', function() {
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