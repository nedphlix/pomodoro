var deadline;
var increment = 25; //in minutes
var breakTime = 5; // in minutes
var remainder = {};
var t;
var timeinterval;
var intervalRunning = false;
var breakRunning = false;

var pMinusButton, pPlusButton, bMinusButton, bPlusButton;
var pTimeSpan, bTimeSpan;
var binarySpan;
var sound, filename = "bell";
var clock;
var minutesSpan, secondsSpan;
var startButton, stopButton, resetButton, breakButton;

var welcomeMessage = "Go for it.";

// design inspiration: egg timer, codepen, pomodoro clock
// need to validate times > 0

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
		t = getTimeRemaining(deadline);
		minutesSpan.innerHTML = t.minutes;
		secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
		var titleHelper = binarySpan.innerHTML;
		if(t.total < 1000) {
			intervalRunning = true;
			playSound(filename);
			if (breakRunning === true) {
				increment = parseInt(pTimeSpan.innerHTML);
				binarySpan.innerHTML = "Work";
				intervalRunning = true;
				breakRunning = false;
			} else {
				increment = parseInt(bTimeSpan.innerHTML);
				binarySpan.innerHTML = "Break";
				// playSound(filename);
				intervalRunning = true;
				breakRunning = true;
			}
			initializeClock();
		}
		intervalRunning = true;		
		document.title = titleHelper + " / " + t.minutes + ": " + ('0' + t.seconds).slice(-2);
	}

	updateClock();
	timeinterval = setInterval(updateClock, 1000);
}

function playSound(filename) {
	sound.innerHTML = '<audio autoplay="autoplay"><source src="' + filename + '.mp3" type="audio/mpeg" /><source src="' + filename + '.ogg" type="audio/ogg" /><embed hidden="true" autostart="true" loop="false" src="' + filename +'.mp3" /></audio>';
}

window.onload = function() {
	pMinusButton = document.getElementById("pMinusButton");
	pPlusButton = document.getElementById("pPlusButton");
	bMinusButton = document.getElementById("bMinusButton");
	bPlusButton = document.getElementById("bPlusButton");
	pTimeSpan = document.getElementById("pTimeSpan");
	bTimeSpan = document.getElementById("bTimeSpan");
	binarySpan = document.getElementById("binarySpan");
	clock = document.getElementById("clockdiv");
	sound = document.getElementById("sound");
	minutesSpan = clock.querySelector('.minutes');
	secondsSpan = clock.querySelector('.seconds');
	startButton = document.getElementById("startButton");
	stopButton = document.getElementById("stopButton");
	resetButton = document.getElementById("resetButton");
	breakButton = document.getElementById("breakButton");

	document.title = "Pomodoro2000"

	pTimeSpan.innerHTML = increment;
	bTimeSpan.innerHTML = breakTime;
	minutesSpan.innerHTML = increment;
	secondsSpan.innerHTML = "00";
	binarySpan.innerHTML = welcomeMessage;

	startButton.addEventListener("click", function() {
		if (intervalRunning === false) {
			initializeClock();
			intervalRunning = true;
			if (breakRunning === false) {
				binarySpan.innerHTML = "Work";
			} else {
				binarySpan.innerHTML = "Break";
			}
		}
	});

	stopButton.addEventListener("click", function() {
		if (intervalRunning = true && binarySpan.innerHTML !== welcomeMessage) {
			clearInterval(timeinterval);
			increment = t.minutes + t.seconds / 60;
			binarySpan.innerHTML = "Paused";
			document.title = "Paused";
			intervalRunning = false;
		}
	});

	resetButton.addEventListener("click", function() {
		clearInterval(timeinterval);
		increment = pTimeSpan.innerHTML;
		minutesSpan.innerHTML = increment;
		secondsSpan.innerHTML = "00";
		binarySpan.innerHTML = welcomeMessage;
		document.title = "Pomodoro2000"
		intervalRunning = false;
		breakRunning = false;
	});

	breakButton.addEventListener("click", function() {
		clearInterval(timeinterval);
		increment = bTimeSpan.innerHTML;
		minutesSpan.innerHTML = increment;
		secondsSpan.innerHTML = "00";
		binarySpan.innerHTML = "Break";
		initializeClock();
		intervalRunning = true;
		breakRunning = true;
	});

	pMinusButton.addEventListener("click", function() {
		if (intervalRunning === false && increment > 0) {
			increment = parseInt(pTimeSpan.innerHTML);
			increment -= 1;
			pTimeSpan.innerHTML = increment;
			minutesSpan.innerHTML = increment;
		}
	});

	pPlusButton.addEventListener("click", function() {
		if (intervalRunning === false) {
			increment = parseInt(pTimeSpan.innerHTML);
			increment += 1;
			pTimeSpan.innerHTML = increment;
			minutesSpan.innerHTML = increment;
		}
	})

	bMinusButton.addEventListener("click", function() {
		if (breakRunning === false && breakTime > 0) {
			breakTime = parseInt(bTimeSpan.innerHTML);
			breakTime -= 1;
			bTimeSpan.innerHTML = breakTime;
		}
	});

	bPlusButton.addEventListener("click", function() {
		if (breakRunning === false) {
			breakTime = parseInt(bTimeSpan.innerHTML);
			breakTime += 1;
			bTimeSpan.innerHTML = breakTime;
		}
	})

}
