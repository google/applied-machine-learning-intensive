function TimedShortAnswer (opts) {
    if (opts) {
        this.timedInit(opts);
    }
}
TimedShortAnswer.prototype = new ShortAnswer();

TimedShortAnswer.prototype.timedInit = function (opts) {
    this.init(opts);
    this.renderTimedIcon(this.containerDiv);
    this.hideButtons();
};


TimedShortAnswer.prototype.hideButtons = function () {
    $(this.submitButton).hide();

};

TimedShortAnswer.prototype.renderTimedIcon = function (component) {
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

TimedShortAnswer.prototype.checkCorrectTimed = function () {
    return "I";   // we ignore this in the grading
};

TimedShortAnswer.prototype.hideFeedback = function () {
    $(this.feedbackDiv).hide();
};

TimedShortAnswer.prototype.processTimedSubmission = function () {
    // Disable input & evaluate component
    this.submitJournal();
    this.jTextArea.disabled = true;
};
