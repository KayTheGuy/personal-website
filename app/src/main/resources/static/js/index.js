var myLanguage = [ "Java", "JavaScript", "Python", "SQL", "CSS", "HTML" ];
var lanStyle = "{ color: white; font-family: \"Poiret One\"; font-size: 200%; }";
var introStyle = "{ font-weight: 400; letter-spacing: 0.1em; }";

var intro = [ "<p> Hi!<br /> <br /> My name is Kayhan. I am a Software Developer, " +
			 "currently working at <a href=\"https://www.sap.com/index.html\" " +
			 "target=\"_blank\">SAP</a> (Vancouver). I am responsible for developing" +
			 " internal tools that scan SAP programs to make sure their open source " +
			 "components are legally compliant.</p> " +
			 "<p>I am a back-end developer but sometimes I play around with front-ends " +
			 "as well. My favorite languages are Java, Python, and JavaScript, " +
			 "respectively.</p> <p>I love coding, exercising, driving, and " +
			 "listening to music.</p>"]
			
var TextTyper = function(el, id, dataList, period, loop, style, delta1, delta2, fallback) {
	this.el = el;
	this.id= id;
	this.dataList = dataList;
	this.loop = loop;
	this.period = parseInt(period, 10) || 2000;
	this.style = style;
	this.delta1 = delta1;
	this.delta2 = delta2;
	this.fallback = fallback;
	this.loopNum = 0;
	this.txt = '';
	this.typeIt();
	if(style) this.applyCSS(style);
	this.isDeleting = false;
};

TextTyper.prototype.applyCSS = function() {
	var css = document.createElement("style");
	css.type = "text/css";
	css.innerHTML = "#" + this.id + " > .wrap " + this.style; 
	document.body.appendChild(css);
}

TextTyper.prototype.typeIt = function() {
	var i = this.loopNum % this.dataList.length;
	var fullTxt = this.dataList[i];
	
	if (this.isDeleting) {
		this.txt = fullTxt.substring(0, this.txt.length - 1);
	} else {
		this.txt = fullTxt.substring(0, this.txt.length + 1);
	}

	this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';
	var that = this;
	var delta = this.delta1 - Math.random() * 100;
	
	if (this.isDeleting) { delta /= 1.5; }
	
	if (!this.isDeleting && this.txt === fullTxt) {
		delta = this.period;
		this.isDeleting = true;
		if(!this.loop) {
			if(this.fallback) this.fallback();
			return;
		}
	} else if (this.isDeleting && this.txt === '') {
		this.isDeleting = false;
		this.loopNum++;
		delta = this.delta2;
	}
	
	setTimeout(function() {
		that.typeIt();
	}, delta);
};

function typeForClass(id, data, period, loop, style, delta1, delta2, showIntroButton) {
	var element = document.getElementById(id);
	new TextTyper(element, id, data, period, loop, style, delta1, delta2, showIntroButton);
}

var showIntroButton = function() {
	$('#intro-buttons').show();
}

$(window).on('load', function() {
	var coursesVisible = false;
	
	typeForClass('languages', myLanguage, 1000, true, lanStyle, 200, 400, null);
	typeForClass('my-intro-txt', intro, 500, false, introStyle, 20, 20, showIntroButton);
	
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
	
	// RESUME
	var resumeModal = document.getElementById('resume-modal-div');
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