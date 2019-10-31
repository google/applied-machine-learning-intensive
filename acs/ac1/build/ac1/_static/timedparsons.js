function TimedParsons (opts) {
	if (opts) {
		this.timedInit(opts);
	}
}

TimedParsons.prototype = new Parsons();

TimedParsons.prototype.timedInit = function (opts) {
	this.init(opts);
};

TimedParsons.prototype.checkCorrectTimed = function () {
	return this.correct ? "T" : "F";
};

TimedParsons.prototype.hideFeedback = function () {
	$(this.messageDiv).hide();
};

TimedParsons.prototype.processTimedSubmission = function (logFlag) {
	if (logFlag) {
		this.setLocalStorage();
	}
	this.correct = this.grader.grade() == "correct";
	this.disable();
};