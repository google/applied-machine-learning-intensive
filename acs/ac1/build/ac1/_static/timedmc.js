function TimedMC (opts) {
    if (opts) {
        this.timedinit(opts);
    }
}

TimedMC.prototype = new MultipleChoice();

TimedMC.prototype.timedinit = function (opts) {
    this.init(opts); // Construct the MC object
    this.renderTimedIcon(this.MCContainer);
    this.hideButtons(); // Don't show per-question buttons in a timed assessment
};

TimedMC.prototype.renderTimedIcon = function (component) {
    // renders the clock icon on timed components.    The component parameter
    // is the element that the icon should be appended to.
    var timeIconDiv = document.createElement("div");
    var timeIcon = document.createElement("img");
    $(timeIcon).attr({
        "src": "../_static/clock.png",
        "style": "width:15px;height:15px"
    });
    timeIconDiv.className = "timeTip";
    timeIconDiv.title = "";
    timeIconDiv.appendChild(timeIcon);
    $(component).prepend(timeIconDiv);
};

TimedMC.prototype.hideButtons = function () {
    //Just hiding the buttons doesn't prevent submitting the form when entering is clicked
    //We need to completely disable the buttons
    $(this.submitButton).attr("disabled","true");
    $(this.submitButton).hide();
    $(this.compareButton).hide();
};

TimedMC.prototype.renderMCMAFeedBack = function () {
    this.feedbackTimedMC();
};

TimedMC.prototype.renderMCMFFeedback = function (whatever, whateverr) {
    this.feedbackTimedMC();
};

TimedMC.prototype.feedbackTimedMC = function () {
    for (var i = 0; i < this.indexArray.length; i++) {
        var tmpindex = this.indexArray[i];
        $(this.feedBackEachArray[i]).text(this.feedbackList[i]);
        var tmpid = this.answerList[tmpindex].id;
        if (this.correctList.indexOf(tmpid) >= 0) {
            this.feedBackEachArray[i].classList.add("alert", "alert-success");
        } else {
            this.feedBackEachArray[i].classList.add("alert", "alert-danger");
        }
    }
};

TimedMC.prototype.renderMCFormOpts = function () {
    this.optionArray = []; // array with an object for each option containing the input and label for that option
    this.feedBackEachArray = [];
    var input_type = "radio";
    if (this.multipleanswers) {
        input_type = "checkbox";
    }
    // this.indexArray is used to index through the answers
    // it is just 0-n normally, but the order is shuffled if the random option is present
    this.indexArray = [];
    for (var i = 0; i < this.answerList.length; i++) {
        this.indexArray.push(i);
    }

    if (this.random) {
        this.randomizeAnswers();
    }

    for (var j = 0; j < this.answerList.length; j++) {
        var k = this.indexArray[j];
        var optid = this.divid + "_opt_" + k;

        // Create the input
        var input = document.createElement("input");
        input.type = input_type;
        input.name = "group1";
        input.value = String(k);
        input.id = optid;

        // Create the label for the input
        var label = document.createElement("label");
        var labelspan = document.createElement("span");
        label.appendChild(input);
        label.appendChild(labelspan);
        $(labelspan).html(String.fromCharCode(65 + j) + '. ' + this.answerList[k].content);


        // create the object to store in optionArray
        var optObj = {
            input: input,
            label: label
        };
        this.optionArray.push(optObj);

        // add the option to the form
        this.optsForm.appendChild(label);
        this.optsForm.appendChild(document.createElement("br"));

        var feedBackEach = document.createElement("div");
        feedBackEach.id = this.divid + "_eachFeedback_" + k;
        feedBackEach.classList.add("eachFeedback");
        this.feedBackEachArray.push(feedBackEach);
        this.optsForm.appendChild(feedBackEach);
    }
};
TimedMC.prototype.checkCorrectTimedMCMA = function () {
    if (this.correctCount === this.correctList.length && this.correctList.length === this.givenArray.length) {
        this.correct = true;
    } else if (this.givenArray.length !== 0) {
        this.correct = false;
    } else {   // question was skipped
        this.correct = null;
    }
    switch (this.correct) {
        case (true):
            return "T";
        case (false):
            return "F";
        default:
            return null;
    }
};

TimedMC.prototype.checkCorrectTimedMCMF = function () {
    // Returns if the question was correct, incorrect, or skipped (return null in the last case)
    switch (this.correct) {
        case (true):
            return "T";
        case (false):
            return "F";
        default:
            return null;
    }
};

TimedMC.prototype.checkCorrectTimed = function () {
    if (this.multipleanswers) {
        return this.checkCorrectTimedMCMA();
    } else {
        return this.checkCorrectTimedMCMF();
    }
};

TimedMC.prototype.hideFeedback = function () {
    for (var i = 0; i < this.feedBackEachArray.length; i++) {
        $(this.feedBackEachArray[i]).hide();
    }
};

TimedMC.prototype.processTimedSubmission = function (logFlag) {
    // Disable input, then evaluate component
    for (var i = 0; i < this.optionArray.length; i++) {
        this.optionArray[i]["input"].disabled = true;
    }
    if (this.multipleanswers) {
        this.processMCMASubmission(logFlag);
    } else {
        this.processMCMFSubmission(logFlag);
    }
};
