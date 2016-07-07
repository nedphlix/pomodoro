var deadline;
var increment = 25; //in minutes
var remainder = {};

var clock;
var minutesSpan;
var secondsSpan;

// design inspiration: egg timer, codepen, pomodoro clock

function setDeadLine(currentTime) {
	increment *= 60 * 1000;
	deadline = new Date(Date.parse(currentTime) + increment);
	getTimeRemaining(deadline, currentTime);
}

function getTimeRemaining(deadline) {
	var t = deadline - Date.parse(new Date());
	var seconds = Math.floor( (t/1000) % 60 );
	var minutes = Math.floor( (t/1000/60) % 60 );
	return {
		'total': t,
		'minutes': minutes,
		'seconds': seconds
	}
}

function initializeClock() {
	var d = Date.now();
	var currentTime = new Date(d);
	setDeadLine(currentTime); // defines the deadline

	function updateClock() {
		var t = getTimeRemaining(deadline);
		minutesSpan.innerHTML = t.minutes;
		secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
		if(t.total < 1000) {
			clearInterval(timeinterval);
		}		
	}

	updateClock();
	var timeinterval = setInterval(updateClock, 1000);
}

window.onload = function() {
	clock = document.getElementById("clockdiv");
	minutesSpan = clock.querySelector('.minutes');
	secondsSpan = clock.querySelector('.seconds');

	initializeClock();
}
