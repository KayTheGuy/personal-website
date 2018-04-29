var myLanguage = [ "Java", "JavaScript", "Python", "SQL", "CSS", "HTML" ];
var lanStyle = "{ font-family: \"Poiret One\"; font-size: 140%; }";
var introStyle = "{ font-weight: 400; letter-spacing: 0.1em; }";

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

var typeForClass = function(id, data, period, loop, style, delta1, delta2, showIntroButton) {
	var element = document.getElementById(id);
	new TextTyper(element, id, data, period, loop, style, delta1, delta2, showIntroButton);
};

$(window).on('load', function() {
	var coursesVisible = false;
	typeForClass('languages', myLanguage, 1000, true, lanStyle, 200, 400, null);
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
	$('#show-my-resume').on('click touchstart', function() {
		makeElementsVisible(['resume-modal-div']);
	});
	
	// close modal handlers
	$('.close').on('click touchstart', function() {
		makeElementsHidden(['resume-modal-div']);
	});
});