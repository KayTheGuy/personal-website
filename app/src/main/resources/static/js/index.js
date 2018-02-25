$(document).ready(function () {
	var coursesVisible = false;
	$('#show-courses-button').click(function() {
		if(coursesVisible) {
			$('#course-table-div').css("display", "none");
			$(this).text('Show Courses');
		} else {
			$('#course-table-div').css("display", "table");
			$(this).text('Hide Courses');
		}
		$(this).toggleClass('buttonReversed');
		coursesVisible = !coursesVisible;
	});
});