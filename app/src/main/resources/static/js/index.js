var test = false;
function navigateSkillItem(el) {
	var skillEl = document.getElementById('skill');
	if(!test) {
		skillEl.getElementsByTagName('p')[0].innerHTML = "Java";
	} else {
		skillEl.getElementsByTagName('p')[0].innerHTML = "JavaScript";
	}
	test = !test;
}

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
	
	// Skills Navigation
	$('#select-skill').on('click touchstart', function(e) {
	    e.preventDefault(); 
	    if(e.type == "touchstart") {
	    	navigateSkillItem(this);
	    } else if(e.type == "click") {
	    	navigateSkillItem(this);
	    }
	});
});