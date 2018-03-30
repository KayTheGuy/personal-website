$(document).ready(function() {
	var coursesVisible = false;
	
	// COURSES
	$('#show-courses-button').click(function() {
		if (coursesVisible) {
			$('#course-table-div').css("display", "none");
			$(this).text('Show Courses');
		} else {
			$('#course-table-div').css("display", "table");
			$(this).text('Hide Courses');
		}
		$(this).toggleClass('reversed-button');
		coursesVisible = !coursesVisible;
	});
	
	var resumeModal = document.getElementById('resume-modal-div');
	// RESUME
	$('#show-my-resume').on('click touchstart', function() {
		resumeModal.style.visibility = "visible";
	});
	
	// close modal handlers
	$('.close').on('click touchstart', function() {
		resumeModal.style.visibility = "hidden";
	});

	$(document).on('click touchstart', function(event) {
		if (event.target == resumeModal) {
			resumeModal.style.visibility = "hidden";
		}
	});
});