var imgList; // global object to hold image information
var numOfImagePerLoad = 6;
var numOfLoad = 0;
var loading = true;
var counterRatio = 1;

// google map functions
var initMap = function() {
	var uluru = {
		lat : 49.2827,
		lng : -123.1207
	};
	mapHelper(8, uluru);
};

var adjustMap = function(lat, lng) {
	var uluru = {
		lat : lat,
		lng : lng
	};
	mapHelper(12, uluru);
};

var mapHelper = function(zoom, uluru) {
	var map = new google.maps.Map(document.getElementById('album-map'), {
		zoom : zoom,
		center : uluru
	});
	var marker = new google.maps.Marker({
		position : uluru,
		map : map
	});
};

var setModalImage = function(imgId) {
	var nextID = imgId + 1, prevID = imgId - 1;
	// only show next and previous buttons if there is an image next or previous
	if ($('#' + prevID).length) {
		$('#image-modal-before').show();
	} else {
		$('#image-modal-before').hide();
	}

	if (imgId < numOfLoad * numOfImagePerLoad && imgId < imgList.length) {
		$('#image-modal-next').show();
	} else if (imgId == numOfLoad * numOfImagePerLoad && imgId < imgList.length) {
		renderMoreImages();
		$('#image-modal-next').show();
	} else {
		$('#image-modal-next').hide();
	}

	var selectedImg = imgList[imgId - 1];
	var imageElement = $('#image-modal');
	var locationIcon = "<i data-lat=\"" + selectedImg.lat + "\" data-lng=\""
			+ selectedImg.lng
			+ "\" class=\"image-map material-icons\">place</i>"
	imageElement.attr('src', selectedImg.path);
	$('#image-modal-location').html(locationIcon + selectedImg.name + ', ');
	$('#image-modal-date').html(selectedImg.date);
};

var renderMoreImages = function() {
	var currentPic, currentPicDiv, currentSpaceDiv, currentMiddleDiv, currentRow;
	var startID = numOfLoad * numOfImagePerLoad;
	var endID = Math.min(startID + numOfImagePerLoad, imgList.length);
	numOfLoad++;
	var html = []
	for (var i = startID; i < endID; i++) {
		currentRowOpen = '<div class="image-album-row mdl-grid">';
		spaceDiv = '<div class="image-album-div mdl-cell mdl-cell--2-col"></div>';
		currentPicDivOpen = '<div class="image-album-div mdl-cell mdl-cell--8-col">';
		divClose = '</div>';

		currentPic = '<img id="' + imgList[i].id + '" src="' + imgList[i].path
				+ '" class="image-album mdl-shadow--8dp" alt="' + imgList[i].name
				+ '" data-date="' + imgList[i].date + '">';

		currentMiddleDiv = '<div class="image-album-middle"><div class="image-album-text"><i data-lat="'
				+ imgList[i].lat
				+ '" data-lng="'
				+ imgList[i].lng
				+ '" class="image-map material-icons">place</i>'
				+ imgList[i].name + '</div></div>';

		html.push(currentRowOpen);
		html.push(spaceDiv);

		html.push(currentPicDivOpen);

		html.push(currentPic);
		html.push(currentMiddleDiv);

		html.push(divClose);

		html.push(spaceDiv);
		html.push(divClose);
	}
	
	var album = document.getElementById('image-album-content');
	var newElementsDiv = document.createElement('div');
	var htmlString = html.join('');
	newElementsDiv.innerHTML = htmlString.trim();
	album.appendChild(newElementsDiv);
	
	// current loading is complete
	loading = false;
	hideSpinner();

	// all images loaded
	if (endID === imgList.length) {
		$('#album-main-container').scroll(function() {
			// stop loading more
		});
		hideSpinner();
	}
	
	// hover for only mouse
	$('.image-album-div').on('mouseover', function() {
		$(this).find('img').css({opacity: '0.6'});
		$(this).find('.image-album-middle').css({opacity: '1'});
	});
	$('.image-album-div').on('mouseleave', function() {
		$(this).find('img').css({opacity: '1'});
		$(this).find('.image-album-middle').css({opacity: '0'});
	});
};

var dynamicImageLoad = function() {
    var docHeight = $(document).height();
    var winHeight = $(window).height();
    var winScrollTop = $(window).scrollTop();
    counterRatio = (docHeight - winScrollTop) / docHeight;

	if (!loading && (winScrollTop >= docHeight - winHeight - 50)
			&& (numOfLoad * numOfImagePerLoad) < imgList.length) {
		loading = true;
		renderMoreImages();
	}
	setImageCounter();
};

var oldRatioNum = -1;
var oldTotNum = -1;
var setImageCounter = function() {	
	var total = Math.min(numOfImagePerLoad * numOfLoad, imgList.length);
	var ratio = Math.round((1 - counterRatio) * total) + 1;
	if (!loading && ratio <= total) {
		var ratioEl = document.getElementById('image-album-counter-ratio');
		var totalEl = document.getElementById('image-album-counter-total');
		
		ratioEl.innerHTML = ratio;
		totalEl.innerHTML = total;
		
		if(ratio != oldRatioNum) {
			var newRatio = ratioEl.cloneNode(true);
			ratioEl.parentNode.replaceChild(newRatio, ratioEl);
			newRatio.classList.add('run-anim');
			oldRatioNum = ratio;
		}
		
		if(total != oldTotNum) {
			var newTot = totalEl.cloneNode(true);
			totalEl.parentNode.replaceChild(newTot, totalEl);
			newTot.classList.add('run-anim');
			oldTotNum = total;
		}
		
	}
};

$(window).on(
		'load',
		function() {
			showMessage();
			// dynamically load more images on scroll
			$(document).on('scroll', dynamicImageLoad);
			$(document).on('touchmove', dynamicImageLoad);
			
			var currentImgID;

			// get album images
			$.ajax({
				url : '/api/album',
				type : 'GET',
				contentType : "application/json",
				dataType : 'json',
			}).done(function(data) {
				// set global object holding image information
				imgList = data;
				// render first images
				renderMoreImages();
			}).always(function() {

			}).fail(
					function(message) {
						showError("Failed to load images. Please Try again."
								+ message.responseText);
					});

			// event handler for dynamically added elements
			$(document).on("click", ".image-album", function() {
				currentImgID = parseInt(this.id);
				setModalImage(currentImgID);
				makeElementsVisible(['image-prev-div']);
			});

			// navigate through album
			$('#image-modal-before').on('click touchstart', function(e) {
			    e.preventDefault(); 
			    if(e.type == "touchstart") {
					currentImgID--;
					setModalImage(currentImgID);
			    } else if(e.type == "click") {
			    	currentImgID--;
					setModalImage(currentImgID);
			    }
			});

			$('#image-modal-next').on('click touchstart', function(e) {
			    e.preventDefault(); 
			    if(e.type == "touchstart") {
					currentImgID++
					setModalImage(currentImgID);
			    } else if(e.type == "click") {
					currentImgID++
					setModalImage(currentImgID);
			    }
			});

			$(document).on(
				"click touchstart",
				".image-map",
				function(e) {
					adjustMap(
							parseFloat($(this).data('lat')),
							parseFloat($(this).data('lng'))
					);
					
					makeElementsVisible(['map-prev-div']);
			});
			

			// close modal handlers
			$('.close').on('click touchstart', function(e) {
				e.preventDefault();
				e.stopPropagation();
				makeElementsHidden(['image-prev-div', 'map-prev-div']);
			});
		});