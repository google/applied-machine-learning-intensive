/*==========================================
========      Master timed.js     =========
============================================
===     This file contains the JS for    ===
===     the Runestone timed component.   ===
============================================
===              Created By              ===
===             Kirby Olson              ===
===               6/11/15                ===
==========================================*/

var TimedList = {};    // Timed dictionary

// Timed constructor
function Timed (opts) {
    if (opts) {
        this.init(opts);
    }
}

Timed.prototype = new RunestoneBase();

/*====================================
=== Setting Timed Assess Variables ===
====================================*/

Timed.prototype.init = function (opts) {
    RunestoneBase.apply(this, arguments);
    var orig = opts.orig;
    this.origElem = orig; // the entire element of this timed assessment and all of its children
    this.divid = orig.id;
    this.children = this.origElem.childNodes;

    this.timeLimit = 0;
    this.limitedTime = false;
    if (!isNaN($(this.origElem).data("time"))) {
        this.timeLimit = parseInt($(this.origElem).data("time"), 10) * 60; // time in seconds to complete the exam
        this.startingTime = this.timeLimit;
        this.limitedTime = true;
    }
    this.showFeedback = true;
    if ($(this.origElem).is("[data-no-feedback]")) {
        this.showFeedback = false;
    }
    this.showResults = true;
    if ($(this.origElem).is("[data-no-result]")) {
        this.showResults = false;
    }
    this.random = false;
    if ($(this.origElem).is("[data-random]")) {
        this.random = true;
    }
    this.showTimer = true;
    if ($(this.origElem).is("[data-no-timer]")) {
        this.showTimer = false;
    }
    this.fullwidth = false;
    if ($(this.origElem).is("[data-fullwidth]")) {
        this.fullwidth = true;
    }

    this.running = 0;
    this.paused = 0;
    this.done = 0;
    this.taken = 0;
    this.score = 0;
    this.incorrect = 0;
    this.correctStr = "";
    this.incorrectStr = "";
    this.skippedStr = "";
    this.skipped = 0;

    this.currentQuestionIndex = 0;   // Which question is currently displaying on the page
    this.renderedQuestionArray = []; // list of all problems

    this.getNewChildren();
    this.renderTimedAssess();
};

Timed.prototype.getNewChildren = function () {
    this.newChildren = [];
    for (var i = 0; i < this.origElem.childNodes.length; i++) {
        this.newChildren.push(this.origElem.childNodes[i]);
    }
};

/*===============================
=== Generating new Timed HTML ===
===============================*/

Timed.prototype.renderTimedAssess = function () {
    this.renderContainer();
    this.renderTimer();
    this.renderControlButtons();
    this.assessDiv.appendChild(this.timedDiv);    // This can't be appended in renderContainer because then it renders above the timer and control buttons.
    this.createRenderedQuestionArray();
    if (this.renderedQuestionArray.length > 1)
        this.renderNavControls();
    this.renderSubmitButton();
    this.renderFeedbackContainer();
    this.useRunestoneServices = opts.useRunestoneServices;

    // Replace intermediate HTML with rendered HTML
    $(this.origElem).replaceWith(this.assessDiv);

    // check if already taken and if so show results
    this.tookTimedExam();
};

Timed.prototype.renderContainer = function () {
    this.assessDiv = document.createElement("div"); // container for the entire Timed Component

    if (this.fullwidth) {
       // allow the container to fill the width - barb
       $(this.assessDiv).attr({
           "style": "max-width:none"
       });
    }
    this.assessDiv.id = this.divid;
    this.timedDiv = document.createElement("div"); // div that will hold the questions for the timed assessment
    this.navDiv = document.createElement("div"); // For navigation control
    $(this.navDiv).attr({"style": "text-align:center"});
    this.switchDiv = document.createElement("div"); // is replaced by the questions
    this.timedDiv.appendChild(this.switchDiv);
    this.timedDiv.appendChild(this.navDiv);
    $(this.timedDiv).attr({ // set the id, and style the div to be hidden
        "id": "timed_Test",
        "style": "display:none"
    });
};

Timed.prototype.renderTimer = function () {
    this.wrapperDiv = document.createElement("div");
    this.timerContainer = document.createElement("P");
    this.wrapperDiv.id = this.divid + "-startWrapper";
    this.timerContainer.id = this.divid + "-output";
    this.wrapperDiv.appendChild(this.timerContainer);
    this.showTime();
};

Timed.prototype.renderControlButtons = function () {
    this.controlDiv = document.createElement("div");
    $(this.controlDiv).attr({
        "id": "controls",
        "style": "text-align: center"
    });
    this.startBtn = document.createElement("button");
    this.pauseBtn = document.createElement("button");
    this.resetBtn = document.createElement("button");

    $(this.startBtn).attr({
        "class": "btn btn-success",
        "id": "start",
        "tabindex": "0",
        "role": "button",
    });
    this.startBtn.textContent = "Start";
    this.startBtn.addEventListener("click", function () {
        this.renderTimedQuestion();
        this.startAssessment();
    }.bind(this), false);

    $(this.pauseBtn).attr({
        "class": "btn btn-default",
        "id": "pause",
        "disabled":"true",
        "tabindex": "0",
        "role": "button"
    });
    this.pauseBtn.textContent = "Pause";
    this.pauseBtn.addEventListener("click", function () {
        this.pauseAssessment();
    }.bind(this), false);

    $(this.resetBtn).attr({
        "class": "btn btn-default",
        "id": "reset",
        "disabled": "true",
        "tabindex": "1",
        "role": "button"
    });
    this.resetBtn.textContent = "Reset";
    this.resetBtn.addEventListener("click", function () {
        this.checkResetability();
    }.bind(this), false);
    $(this.resetBtn).hide();

    this.controlDiv.appendChild(this.startBtn);
    this.controlDiv.appendChild(this.pauseBtn);
    this.controlDiv.appendChild(this.resetBtn);
    this.assessDiv.appendChild(this.wrapperDiv);
    this.assessDiv.appendChild(this.controlDiv);
};

Timed.prototype.renderNavControls = function () {
	this.pagNavList = document.createElement("ul");
    $(this.pagNavList).addClass("pagination");
	this.leftContainer = document.createElement("li");
    this.leftNavButton = document.createElement("button");
    this.leftNavButton.innerHTML = "&#8249; Prev";
    $(this.leftNavButton).attr("aria-label", "Previous");
    $(this.leftNavButton).attr("tabindex", "0");
    $(this.leftNavButton).attr("role", "button");
    $(this.leftNavButton).css("cursor", "pointer");
	this.leftContainer.appendChild(this.leftNavButton);
    this.pagNavList.appendChild(this.leftContainer);
    this.rightContainer = document.createElement("li");
    this.rightNavButton = document.createElement("button");
    $(this.rightNavButton).attr("aria-label", "Next");
    $(this.rightNavButton).attr("tabindex", "0");
    $(this.rightNavButton).attr("role", "button");
    this.rightNavButton.innerHTML = "Next &#8250;";
    $(this.rightNavButton).css("cursor", "pointer");
    this.rightContainer.appendChild(this.rightNavButton);
	this.pagNavList.appendChild(this.rightContainer);
	this.ensureButtonSafety();
	this.navDiv.appendChild(this.pagNavList);
    this.break = document.createElement("br");
    this.navDiv.appendChild(this.break);

    // render the question number jump buttons
    this.qNumList = document.createElement("ul");
	$(this.qNumList).attr("id", "pageNums");
    this.qNumWrapperList = document.createElement("ul");
    $(this.qNumWrapperList).addClass("pagination");
	var tmpLi, tmpA;
    for (var i = 0; i < this.renderedQuestionArray.length; i++) {
	    tmpLi = document.createElement("li");
		tmpA = document.createElement("a");
        tmpA.innerHTML = i + 1;
        $(tmpA).css("cursor", "pointer");
        if (i === 0) {
            $(tmpLi).addClass("active");
        }
        tmpLi.appendChild(tmpA);
        this.qNumWrapperList.appendChild(tmpLi);
    }
    this.qNumList.appendChild(this.qNumWrapperList);
    this.navDiv.appendChild(this.qNumList);
	this.navBtnListeners();
};

Timed.prototype.navBtnListeners = function() {
	// Next and Prev Listener
	this.pagNavList.addEventListener("click", function (event) {
		if ($("div#timed_Test form input[name='group1']").is(":checked")) {
			$("ul#pageNums > ul > li:eq(" + this.currentQuestionIndex +")").addClass("answered");
		}
		var target = $(event.target).text();
		if (target.match(/Next/)) {
			if ($(this.rightContainer).hasClass("disabled")) {
				return;
			}
			this.currentQuestionIndex++;
		}
		else if (target.match(/Prev/)) {
			if ($(this.leftContainer).hasClass("disabled")) {
				return;
			}
			this.currentQuestionIndex--;
		}
		this.renderTimedQuestion();
		this.ensureButtonSafety();
		for (var i = 0; i < this.qNumList.childNodes.length; i++) {
			for (var j = 0; j < this.qNumList.childNodes[i].childNodes.length; j++) {
				$(this.qNumList.childNodes[i].childNodes[j]).removeClass("active");
			}
		}
		$("ul#pageNums > ul > li:eq(" + this.currentQuestionIndex +")").addClass("active");
	}.bind(this), false);

	// Numbered Listener
	this.qNumList.addEventListener("click", function (event) {
		if ($("div#timed_Test form input[name='group1']").is(":checked")) {
			$("ul#pageNums > ul > li:eq(" + this.currentQuestionIndex + ")").addClass("answered");
		}
		for (var i = 0; i < this.qNumList.childNodes.length; i++) {
			for (var j = 0; j < this.qNumList.childNodes[i].childNodes.length; j++) {
				$(this.qNumList.childNodes[i].childNodes[j]).removeClass("active");
			}
		}
		var target = $(event.target).text();
		this.currentQuestionIndex = parseInt(target) - 1;
		$("ul#pageNums > ul > li:eq(" + this.currentQuestionIndex +")").addClass("active");
		this.renderTimedQuestion();
		this.ensureButtonSafety();
	}.bind(this), false);

};

Timed.prototype.renderSubmitButton = function () {
    this.buttonContainer = document.createElement("div");
    $(this.buttonContainer).attr({"style": "text-align:center"});
    this.finishButton = document.createElement("button");
    $(this.finishButton).attr({
        "id": "finish",
        "class": "btn btn-primary"
    });
    this.finishButton.textContent = "Finish Exam";
    this.finishButton.addEventListener("click", function () {
       if (window.confirm("Clicking OK means you are ready to submit your answers and are finished with this assessment.")) {
          this.finishAssessment();
       }
    }.bind(this), false);

    this.buttonContainer.appendChild(this.finishButton);
    this.timedDiv.appendChild(this.buttonContainer);
};

Timed.prototype.ensureButtonSafety = function () {  // Makes sure that user can't navigate past the range of this.renderedQuestionArray
    if (this.currentQuestionIndex === 0) {
        if (this.renderedQuestionArray.length != 1) {
            $(this.rightContainer).removeClass("disabled");
        }
        $(this.leftContainer).addClass("disabled");
    }
    if (this.currentQuestionIndex >= (this.renderedQuestionArray.length-1)) {
        if (this.renderedQuestionArray.length != 1) {
            $(this.leftContainer).removeClass("disabled");
        }
        $(this.rightContainer).addClass("disabled");
    }
    if (this.currentQuestionIndex > 0 && this.currentQuestionIndex < this.renderedQuestionArray.length-1) {
        $(this.rightContainer).removeClass("disabled");
        $(this.leftContainer).removeClass("disabled");
    }
};

Timed.prototype.renderFeedbackContainer = function () {
    this.scoreDiv = document.createElement("P");
    this.scoreDiv.id = this.divid + "results";
    this.scoreDiv.style.display = "none";
    this.assessDiv.appendChild(this.scoreDiv);
};

Timed.prototype.createRenderedQuestionArray = function () {
    // this finds all the assess questions in this timed assessment and calls their constructor method
    // Also adds them to this.renderedQuestionArray
    // todo:  This needs to be updated to account for the runestone div wrapper.
    for (var i = 0; i < this.newChildren.length; i++) {
        var tmpChild = this.newChildren[i];
        opts = {'orig':tmpChild, 'useRunestoneServices':eBookConfig.useRunestoneServices}
        if ($(tmpChild).children("[data-component]")) {
            tmpChild = $(tmpChild).children("[data-component]")[0];
            opts.orig = tmpChild;
        }
        if ($(tmpChild).is("[data-component=multiplechoice]")) {
            this.renderedQuestionArray.push({"question": new TimedMC(opts)});
        } else if ($(tmpChild).is("[data-component=fillintheblank]")) {
            var newFITB = new TimedFITB(opts);
            this.renderedQuestionArray.push({"question": newFITB});
        } else if ($(tmpChild).is("[data-component=dragndrop]")) {
            this.renderedQuestionArray.push({"question": new TimedDragNDrop(opts)});
        } else if ($(tmpChild).is("[data-component=clickablearea]")) {
            this.renderedQuestionArray.push({"question": new TimedClickableArea(opts)});
        } else if ($(tmpChild).is("[data-component=shortanswer]")) {
            this.renderedQuestionArray.push({"question": new TimedShortAnswer(opts)});
        } else if ($(tmpChild).is("[data-component=parsons]")) {
            this.renderedQuestionArray.push({"question": new TimedParsons(opts)});
        } else if ($(tmpChild).is("[data-component=activecode]")) {
            this.renderedQuestionArray.push({"question": new TimedActiveCode(opts)});
        } else if ($(tmpChild).is("[data-childcomponent]")) {
            // this is for when a directive has a wrapper element that isn't actually part of the javascript object
            // for example, activecode has a wrapper div that contains the question for the element
            var child = $("#" + $(tmpChild).data("childcomponent"));
            if ($(child[0]).is("[data-component=activecode]")) {
                // create & insert new JS object back into wrapper div-- we're simulating the parsing that would happen outside of a timed exam
                opts.orig = child[0];
                var newAC = new TimedActiveCode(opts);
                $(child[0]).remove();
                var tmp = tmpChild.childNodes[0];
                $(tmp).after(newAC.containerDiv);
                this.renderedQuestionArray.push({"wrapper": tmpChild, "question": newAC});
            }
        }
    }
    if (this.random) {
        this.randomizeRQA();
    }
};
Timed.prototype.randomizeRQA = function () {
    var currentIndex = this.renderedQuestionArray.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = this.renderedQuestionArray[currentIndex];
        this.renderedQuestionArray[currentIndex] = this.renderedQuestionArray[randomIndex];
        this.renderedQuestionArray[randomIndex] = temporaryValue;

    }
};

Timed.prototype.renderTimedQuestion = function () {
    var currentWrapper = this.renderedQuestionArray[this.currentQuestionIndex].wrapper;
    var currentQuestion = this.renderedQuestionArray[this.currentQuestionIndex].question;
    // if the question is actually inside a wrapper (for example, activecode), then we want to display the wrapper, but evaluate the actual question object
    if (currentWrapper) {
        $(this.switchDiv).replaceWith(currentWrapper);
        this.switchDiv = currentWrapper;
    } else {
        $(this.switchDiv).replaceWith(currentQuestion.containerDiv);
        this.switchDiv = currentQuestion.containerDiv;
    }
    // If the timed component has listeners, those might need to be reinitialized
    // This flag will only be set in the elements that need it--it will be undefined in the others and thus evaluate to false
    if (currentQuestion.needsReinitialization) {
        currentQuestion.reinitializeListeners();
    }
};


/*=================================
=== Timer and control Functions ===
=================================*/

Timed.prototype.handlePrevAssessment = function () {
		$(this.startBtn).hide();
        $(this.pauseBtn).attr("disabled", true);
        $(this.finishButton).attr("disabled", true);
        this.running = 0;
        this.done = 1;
        if (this.showResults) {
           $(this.timedDiv).show();
           this.submitTimedProblems(false); // do not log these results
        } else {
           $(this.pauseBtn).hide();
           $(this.timerContainer).hide();
        }
};

Timed.prototype.startAssessment = function () {
    if (!this.taken) {
        $("#relations-next").hide(); // hide the next page button for now
        $("#relations-prev").hide(); // hide the previous button for now
        $(this.startBtn).hide();
        $(this.pauseBtn).attr("disabled", false);
        if (this.running === 0 && this.paused === 0) {
            this.running = 1;
            $(this.timedDiv).show();
            this.increment();
            this.logBookEvent({"event": "timedExam", "act": "start", "div_id": this.divid});
            var timeStamp = new Date();
            var storageObj = {"answer": [0,0,this.renderedQuestionArray.length,0], "timestamp": timeStamp};
            localStorage.setItem(this.localStorageKey(), JSON.stringify(storageObj));
        }
        $(window).on('beforeunload', function(){
            // this actual value gets ignored by newer browsers
            return 'Are you sure you want to leave?';
        });
    } else {
       this.handlePrevAssessment();
    }
};

Timed.prototype.pauseAssessment = function () {
    if (this.done === 0) {
        if (this.running === 1) {
            this.logBookEvent({"event": "timedExam", "act": "pause", "div_id": this.divid});
            this.running = 0;
            this.paused = 1;
            this.pauseBtn.innerHTML = "Resume";
            $(this.timedDiv).hide();
        } else {
            this.logBookEvent({"event": "timedExam", "act": "resume", "div_id": this.divid});
            this.running = 1;
            this.paused = 0;
            this.increment();
            this.pauseBtn.innerHTML = "Pause";
            $(this.timedDiv).show();
        }
    }
};

Timed.prototype.checkResetability = function () {
    /* Reset is only available if there is no record of a completed exam and the
       localStorage does not reflect a partially completed exam */
    let sendInfo = {"div_id":this.divid, "course":eBookConfig.course};
    $(this.resetBtn).attr({
        "disabled": true
    });
    console.log(sendInfo)
    jQuery.getJSON(eBookConfig.ajaxURL + "checkTimedReset", sendInfo, this.resetExam.bind(this));

}

Timed.prototype.resetExam = function (result,status,ignore) {
    console.log(result);
    if (result.canReset === true) {
        if (confirm("Only reset the exam if you experienced techinical difficulties. Your instructor will be notified of this reset.")) {
            this.logBookEvent({"event":"timedExam","act":"reset","div_id":this.divid,
                               "course":eBookConfig.course,"correct":this.score,"incorrect":this.incorrect,
                               "skipped":this.skipped,"time":this.timeTaken,"reset":true});
            localStorage.clear(); // Clear records of exam from localStorage

            /* Prevent using server's record of the reset as the exam results when the page reloads */
            localStorage.setItem(this.localStorageKey(),JSON.stringify({"answer":[-1],"timestamp":new Date()}));

            location.reload();
        };
    } else {
        alert("This exam does not qualify to be reset. Contact your instructor with any questions.");
    }
}

Timed.prototype.showTime = function () { // displays the timer value
    if (this.showTimer) {
    	var mins = Math.floor(this.timeLimit / 60);
    	var secs = Math.floor(this.timeLimit) % 60;
    	var minsString = mins;
    	var secsString = secs;

    	if (mins < 10) {
        	minsString = "0" + mins;
    	}
    	if (secs < 10) {
        	secsString = "0" + secs;
    	}
    	var beginning = "Time Remaining    ";
    	if (!this.limitedTime) {
        	beginning = "Time Taken    ";
    	}
    	var timeString =  beginning + minsString + ":" + secsString;

    	if (this.done || this.taken) {
        	var minutes = Math.floor(this.timeTaken / 60);
        	var seconds = Math.floor(this.timeTaken % 60);
        	if (minutes < 10) {
            	minutes = "0" + minutes;
        	}
        	if (seconds < 10) {
            	seconds = "0" + seconds;
        	}
        	timeString = "Time taken: " + minutes + ":" + seconds;
    	}

    	this.timerContainer.innerHTML = timeString;
    	var timeTips = document.getElementsByClassName("timeTip");
    	for (var i = 0; i <= timeTips.length - 1; i++) {
        	timeTips[i].title = timeString;
    	}
    } else {
       $(this.timerContainer).hide();
    }
};

Timed.prototype.increment = function () { // increments the timer
    // if running (not paused) and not taken
    if (this.running === 1 && !this.taken) {
        setTimeout(function () {
            if (this.limitedTime) {  // If there's a time limit, count down to 0
                this.timeLimit--;
            } else {
                this.timeLimit++; // Else count up to keep track of how long it took to complete
            }
            localStorage.setItem(eBookConfig.email + ":" + this.divid + "-time", this.timeLimit);
            this.showTime();
            if (this.timeLimit > 0) {
                this.increment();
                // ran out of time
            } else {
                $(this.startBtn).attr({"disabled": "true"});
                $(this.finishButton).attr({"disabled": "true"});
                this.running = 0;
                this.done = 1;
                if (this.taken === 0) {
                    this.taken = 1;
                    window.alert("Sorry, but you ran out of time.  Your current answers have been saved");
                    this.finishAssessment();
                }
            }
        }.bind(this), 1000);
    }
};

Timed.prototype.tookTimedExam = function () {
    // Checks if this exam has been taken before
    $(this.timerContainer).css({
        "width": "50%",
        "margin": "0 auto",
        "background-color": "#DFF0D8",
        "text-align": "center",
        "border": "2px solid #DFF0D8",
        "border-radius": "25px"
    });

    $(this.scoreDiv).css({
        "width": "50%",
        "margin": "0 auto",
        "background-color": "#DFF0D8",
        "text-align": "center",
        "border": "2px solid #DFF0D8",
        "border-radius": "25px"
    });

    $(".tooltipTime").css({
        "margin": "0",
        "padding": "0",
        "background-color": "black",
        "color": "white"
    });

    this.checkServer("timedExam");

};

Timed.prototype.finishAssessment = function () {
    $("#relations-next").show(); // show the next page button for now
    $("#relations-prev").show(); // show the previous button for now
    if (!this.showFeedback) {  // bje - changed from showResults
        $(this.timedDiv).hide();
        $(this.pauseBtn).hide();
        $(this.timerContainer).hide();
    }
    this.findTimeTaken();
    this.running = 0;
    this.done = 1;
    this.taken = 1;
    this.submitTimedProblems(true); // log results
    this.checkScore();
    this.displayScore();
    this.storeScore();
    this.logScore();
    $(this.pauseBtn).attr("disabled", true);
    this.finishButton.disabled = true;
    $(window).off('beforeunload');
};

Timed.prototype.submitTimedProblems = function (logFlag) {
    for (var i = 0; i < this.renderedQuestionArray.length; i++) {
        var currentQuestion = this.renderedQuestionArray[i].question;
        currentQuestion.processTimedSubmission(logFlag);
    }
    if (!this.showFeedback) {
        this.hideTimedFeedback();
    }
};

Timed.prototype.hideTimedFeedback = function () {
    for (var i = 0; i < this.renderedQuestionArray.length; i++) {
        var currentQuestion = this.renderedQuestionArray[i].question;
        currentQuestion.hideFeedback();
    }
};

Timed.prototype.checkScore = function () {
	this.correctStr = "";
    this.skippedStr = "";
    this.incorrectStr = "";
    // Gets the score of each problem

    for (var i = 0; i < this.renderedQuestionArray.length; i++) {
        var correct = this.renderedQuestionArray[i].question.checkCorrectTimed();
        if (correct == "T") {
            this.score++;
            this.correctStr = this.correctStr + (i + 1) + ", ";

        } else if (correct == "F") {
            this.incorrect++;
            this.incorrectStr = this.incorrectStr + (i + 1) + ", ";
        } else if (correct === null) {
            this.skipped++;
            this.skippedStr = this.skippedStr + (i + 1) + ", ";
        } else {
            // ignored question; just do nothing
        }
    }
	// remove extra comma and space at end if any
    if (this.correctStr.length > 0) this.correctStr = this.correctStr.substring(0,this.correctStr.length-2);
    else this.correctStr = "None";
    if (this.skippedStr.length > 0) this.skippedStr = this.skippedStr.substring(0,this.skippedStr.length-2);
    else this.skippedStr = "None";
    if (this.incorrectStr.length > 0) this.incorrectStr = this.incorrectStr.substring(0,this.incorrectStr.length-2);
    else this.incorrectStr = "None";
};

Timed.prototype.findTimeTaken = function () {
    if (this.limitedTime) {
        this.timeTaken = this.startingTime - this.timeLimit;
    } else {
        this.timeTaken = this.timeLimit;
    }
};

Timed.prototype.storeScore = function () {
    var storage_arr = [];
    storage_arr.push(this.score, this.correctStr, this.incorrect, this.incorrectStr, this.skipped, this.skippedStr, this.timeTaken);
    var timeStamp = new Date();
    var storageObj = JSON.stringify({"answer": storage_arr, "timestamp": timeStamp});
    localStorage.setItem(this.localStorageKey(), storageObj);
};

Timed.prototype.logScore = function () {
    this.logBookEvent({"event": "timedExam", "act": "finish", "div_id": this.divid, "correct": this.score, "incorrect": this.incorrect, "skipped": this.skipped, "time": this.timeTaken});
};

Timed.prototype.shouldUseServer = function (data) {
    // We override the RunestoneBase version because there is no "correct" attribute, and there are 2 possible localStorage schemas
    // --we also want to default to local storage because it contains more information
    if (localStorage.length === 0)
        return true;
    var storageObj = localStorage.getItem(this.localStorageKey());
    if (storageObj === null)
        return true;
    try {
        var storedData = JSON.parse(storageObj).answer;
        if (storedData.length == 4) {
            if (data.correct == storedData[0] && data.incorrect == storedData[1] && data.skipped == storedData[2] && data.timeTaken == storedData[3])
                return true;
        } else if (storedData.length == 7) {
            if (data.correct == storedData[0] && data.incorrect == storedData[2] && data.skipped == storedData[4] && data.timeTaken == storedData[6]) {
                return false;   // In this case, because local storage has more info, we want to use that if it's consistent
            }
        }
        var storageDate = new Date(JSON.parse(storageObj[1]).timestamp);
    } catch (err) {
        // error while parsing; likely due to bad value stored in storage
        console.log(err.message);
        localStorage.removeItem(this.localStorageKey());
        return;
    }
    var serverDate = new Date(data.timestamp);
    if (serverDate < storageDate) {
        this.logScore();
        return false;
    }
    return true;
};

Timed.prototype.checkLocalStorage = function () {
    var len = localStorage.length;
    if (len > 0) {
        if (localStorage.getItem(this.localStorageKey()) !== null) {
            this.taken = 1;
            this.restoreAnswers("");
        } else {
            this.taken = 0;
        }
    } else {
        this.taken = 0;
    }
};

Timed.prototype.restoreAnswers = function (data) {
    this.taken = 1;
    var tmpArr;
    if (data === "") {
        try {
            tmpArr = JSON.parse(localStorage.getItem(this.localStorageKey())).answer;
        } catch (err) {
            // error while parsing; likely due to bad value stored in storage
            console.log(err.message);
            localStorage.removeItem(this.localStorageKey());
            this.taken = 0;
            return;
        }
    } else {
        // Parse results from the database
        tmpArr = [parseInt(data.correct), parseInt(data.incorrect), parseInt(data.skipped), parseInt(data.timeTaken), data.reset];
        this.setLocalStorage(tmpArr);
    }
    if (tmpArr.length == 1) {
        // Exam was previously reset
        this.reset = true;
        this.taken = 0;
        return;
    }
    if (tmpArr.length == 4) {
        // Accidental Reload OR Database Entry
        this.score = tmpArr[0];
        this.incorrect = tmpArr[1];
        this.skipped = tmpArr[2];
        this.timeTaken = tmpArr[3];
    }
    else if (tmpArr.length == 7) {
        // Loaded Completed Exam
        this.score = tmpArr[0];
        this.correctStr = tmpArr[1];
        this.incorrect = tmpArr[2];
        this.incorrectStr = tmpArr[3];
        this.skipped = tmpArr[4];
        this.skippedStr = tmpArr[5];
        this.timeTaken = tmpArr[6];
    }
    else {
        // Set localStorage in case of "accidental" reload
        this.score = 0;
        this.incorrect = 0;
        this.skipped = this.renderedQuestionArray.length;
        this.timeTaken = 0;
    }
    if (this.taken) {
        if (this.skipped === this.renderedQuestionArray.length) {
            $(this.resetBtn).show();
            $(this.resetBtn).attr({
                "disabled": false
            });
            this.showFeedback = false;
        }
        this.handlePrevAssessment();
    }
    this.renderTimedQuestion();
    this.displayScore();
	this.showTime();
};

Timed.prototype.setLocalStorage = function (parsedData) {
    var timeStamp = new Date();
    var storageObj = {"answer": parsedData, "timestamp": timeStamp};
    localStorage.setItem(this.localStorageKey(), JSON.stringify(storageObj));
};

Timed.prototype.displayScore = function () {

	if (this.showResults) {
       // if we have some information
       if (this.correctStr.length > 0 || this.incorrectStr.length > 0 || this.skippedStr.length > 0)
       {
          var scoreString = "Num Correct: " + this.score + ". Questions: " + this.correctStr + "<br>" +
          "Num Wrong: " + this.incorrect + ". Questions: " + this.incorrectStr + "<br>" +
          "Num Skipped: " + this.skipped + ". Questions: " + this.skippedStr + "<br>";
          var numQuestions = this.score + this.incorrect + this.skipped;
          var percentCorrect = (this.score / numQuestions) * 100;
          scoreString += "Percent Correct: " + percentCorrect + "%";
          $(this.scoreDiv).html(scoreString);
          this.scoreDiv.style.display = "block";
      }
      else
      {
          var scoreString = "Num Correct: " + this.score + "<br>" +
          "Num Wrong: " + this.incorrect + "<br>" +
          "Num Skipped: " + this.skipped + "<br>";
          var numQuestions = this.score + this.incorrect + this.skipped;
          var percentCorrect = (this.score / numQuestions) * 100;
          scoreString += "Percent Correct: " + percentCorrect + "%";
          $(this.scoreDiv).html(scoreString);
          this.scoreDiv.style.display = "block";
      }
      this.highlightNumberedList();
   }
   else {
      $(this.scoreDiv).html("Thank you for taking the exam.  Your answers have been recorded.");
      this.scoreDiv.style.display = "block";
   }
};

Timed.prototype.highlightNumberedList = function () {
	var correctCount = this.correctStr;
	var	incorrectCount = this.incorrectStr;
	var skippedCount = this.skippedStr;

	correctCount = correctCount.replace(/ /g,'').split(',');
	incorrectCount = incorrectCount.replace(/ /g,'').split(',');
	skippedCount = skippedCount.replace(/ /g,'').split(',');

	$(function () {		// This code is wrapped in a function so that it executes only after DOM has loaded
		var numberedBtns = $("ul#pageNums > ul > li");
		if (numberedBtns.hasClass("answered")) {
			numberedBtns.removeClass("answered");
		}
		for (var i = 0; i < correctCount.length; i++) {
			var test = parseInt(correctCount[i])-1;
			numberedBtns.eq(parseInt(correctCount[i])-1).addClass("correctCount");
		}
		for (var j = 0; j < incorrectCount.length; j++) {
			numberedBtns.eq(parseInt(incorrectCount[j])-1).addClass("incorrectCount");
		}
		for (var k = 0; k < skippedCount.length; k++) {
			numberedBtns.eq(parseInt(skippedCount[k])-1).addClass("skippedCount");
		}
	});
};


/*=======================================================
=== Function that calls the constructors on page load ===
=======================================================*/
$(document).bind("runestone:login-complete",function () {
    $("[data-component=timedAssessment]").each(function (index) {
        TimedList[this.id] = new Timed({"orig": this, "useRunestoneServices":eBookConfig.useRunestoneServices});
    });
});
