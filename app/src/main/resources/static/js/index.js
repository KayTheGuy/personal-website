var myLanguage = [ "Java", "Python", "JavaScript", "SQL", "CSS", "HTML" ];
var myTools = [ "Spring", "SQL Server", "MySQL", "MongoDB", "Git" ];
var lanStyle = "{ font-family: \"Poiret One\"; font-size: 140%; }";
var introStyle = "{ font-weight: 400; letter-spacing: 0.1em; }";

var TextTyper = function(el, id, dataList, period, style, delta1, delta2, fallback) {
	this.el = el;
	this.id= id;
	this.dataList = dataList;
	this.period = parseInt(period, 10) || 2000;
	this.style = style;
	this.delta1 = delta1;
	this.delta2 = delta2;
	this.fallback = fallback;
	this.count = 0;
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
	if(this.count < this.dataList.length) {
		var fullTxt = this.dataList[this.count];
		
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
			if (this.count === this.dataList.length - 1) {
				if(this.fallback) {
					var self = this;
					var timeoutId = setTimeout(function() {
						self.fallback();
					}, 2000);
				}
				return;
			} else {
				delta = this.period;				
				this.isDeleting = true;
			}
		} else if (this.isDeleting && this.txt === '') {
			this.isDeleting = false;
			this.count++;
			delta = this.delta2;
		}
		
		setTimeout(function() {
			that.typeIt();
		}, delta);
	}
};

var typeForClass = function(id, data, period, style, delta1, delta2, fallback) {
	var element = document.getElementById(id);
	new TextTyper(element, id, data, period, style, delta1, delta2, fallback);
};

var toggleLoop = function() {
	var skillTitleEl = document.getElementById('skills-title');
	if (skillTitleEl.innerHTML.startsWith('Languages: ')) {
		typeForClass('skills-value', myTools, 1000, lanStyle, 140, 500, toggleLoop);
		skillTitleEl.innerHTML = 'Tools: '
	} else if (skillTitleEl.innerHTML.startsWith('Tools: ')) {
		$('#skills-reload').show();
		$('#skills-title').hide();
		$('#skills-value').hide();
		skillTitleEl.innerHTML = 'Languages: '
	}
};

$(window).on('load', function() {
	var coursesVisible = false;
	typeForClass('skills-value', myLanguage, 1000, lanStyle, 140, 500, toggleLoop);
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
	
	$('#skills-reload').click(function() {
		$('#skills-value').show();
		$('#skills-title').show();
		typeForClass('skills-value', myLanguage, 1000, lanStyle, 140, 500, toggleLoop);
		$('#skills-reload').hide();
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