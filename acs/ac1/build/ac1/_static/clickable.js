/*==========================================
=======     Master clickable.js     ========
============================================
===   This file contains the JS for the  ===
===  Runestone clickable area component. ===
============================================
===              Created by              ===
===           Isaiah Mayerchak           ===
===                7/1/15                ===
==========================================*/

var CAList = {};    // Object that contains all instances of ClickableArea objects

function ClickableArea (opts) {
    if (opts) {
        this.init(opts);
    }
}

ClickableArea.prototype = new RunestoneBase();

/*=============================================
== Initialize basic ClickableArea attributes ==
=============================================*/

ClickableArea.prototype.init = function (opts) {
    RunestoneBase.apply(this, arguments);
    RunestoneBase.prototype.init.apply(this, arguments);
    var orig = opts.orig;    // entire <div> element that will be replaced by new HTML
    this.origElem = orig;
    this.divid = orig.id;
    this.useRunestoneServices = opts.useRunestoneServices;

    this.clickableArray = [];   // holds all clickable elements
    this.correctArray = [];   // holds the IDs of all correct clickable span elements, used for eval
    this.incorrectArray = [];   // holds IDs of all incorrect clickable span elements, used for eval

    //For use with Sphinx-rendered html
    this.isTable = false;
    if ($(this.origElem).data("cc") !== undefined) {
        if ($(this.origElem).is("[data-table]")) {
            this.isTable = true;
            this.ccArray = $(this.origElem).data("cc").split(";");
            this.ciArray = $(this.origElem).data("ci").split(";");
        } else {
            this.ccArray = $(this.origElem).data("cc").split(",");
            this.ciArray = $(this.origElem).data("ci").split(",");
        }
    }
    // For use in the recursive replace function
    this.clickIndex = 0;   // Index of this.clickedIndexArray that we're checking against
    this.clickableCounter = 0;  // Index of the current clickable element

    this.getQuestion();
    this.getFeedback();
    this.renderNewElements();

    this.caption="Clickable"
	this.addCaption('runestone')

};

/*===========================
== Update basic attributes ==
===========================*/

ClickableArea.prototype.getQuestion = function () {
    for (var i = 0; i < this.origElem.childNodes.length; i++) {
        if ($(this.origElem.childNodes[i]).is("[data-question]")) {
            this.question = this.origElem.childNodes[i];
            break;
        }
    }
};

ClickableArea.prototype.getFeedback = function () {
    this.feedback = "";
    for (var i = 0; i < this.origElem.childNodes.length; i++) {
        if ($(this.origElem.childNodes[i]).is("[data-feedback]")) {
            this.feedback = this.origElem.childNodes[i];
        }
    }
    if (this.feedback !== "") {  // Get the feedback element out of the container if the user has defined feedback
        $(this.feedback).remove();
        this.feedback = this.feedback.innerHTML;
    }
};

/*===========================================
====   Functions generating final HTML   ====
===========================================*/

ClickableArea.prototype.renderNewElements = function () {
    // wrapper function for generating everything
    this.containerDiv = document.createElement("div");
    this.containerDiv.appendChild(this.question);
    $(this.containerDiv).addClass(this.origElem.getAttribute("class"));

    this.newDiv = document.createElement("div");
    var newContent = $(this.origElem).html();
    while (newContent[0] === "\n") {
        newContent = newContent.slice(1);
    }
    this.newDiv.innerHTML = newContent;
    this.containerDiv.appendChild(this.newDiv);

    this.checkServer("clickableArea");
    this.createButtons();
    this.createFeedbackDiv();

    $(this.origElem).replaceWith(this.containerDiv);
};

ClickableArea.prototype.createButtons = function () {
    this.submitButton = document.createElement("button");    // Check me button
    this.submitButton.textContent = "Check Me";
    $(this.submitButton).attr({
        "class": "btn btn-success",
        "name": "do answer",
        "type": "button",
    });

    this.submitButton.onclick = function () {
        this.clickableEval(true);
    }.bind(this);

    this.containerDiv.appendChild(this.submitButton);
};

ClickableArea.prototype.createFeedbackDiv = function () {
    this.feedBackDiv = document.createElement("div");
    this.containerDiv.appendChild(document.createElement("br"));
    this.containerDiv.appendChild(this.feedBackDiv);
};

/*===================================
=== Checking/restoring from storage ===
===================================*/

ClickableArea.prototype.restoreAnswers = function (data) {
    // Restore answers from storage retrieval done in RunestoneBase or from local storage
    if (data.answer !== undefined) {   // if we got data from the server
        this.hasStoredAnswers = true;
        this.clickedIndexArray = data.answer.split(";");
    }

    if (this.ccArray === undefined) {
        this.modifyClickables(this.newDiv.childNodes);
    } else {   // For use with Sphinx-rendered HTML
        this.ccCounter = 0;
        this.ccIndex = 0;
        this.ciIndex = 0;
        if (!this.isTable) {
            this.modifyViaCC(this.newDiv.children);
        } else {
            this.modifyTableViaCC(this.newDiv.children);
        }
    }
};


ClickableArea.prototype.checkLocalStorage = function () {
    if (this.graderactive) {
        return;
    }
    // Gets previous answer data from local storage if it exists
    this.hasStoredAnswers = false;
    var len = localStorage.length;
    if (len > 0) {
        var ex = localStorage.getItem(this.localStorageKey());
        if (ex !== null) {
            this.hasStoredAnswers = true;
            try {
                var storageObj = JSON.parse(ex);
                this.clickedIndexArray = storageObj.answer.split(";");
            } catch (err) {
                // error while parsing; likely due to bad value stored in storage
                console.log(err.message);
                localStorage.removeItem(this.localStorageKey());
                this.hasStoredAnswers = false;
                this.restoreAnswers({});
                return;
            }
            if (this.useRunestoneServices) {
                // log answer to server
                this.givenIndexArray = [];
                for (var i = 0; i < this.clickableArray.length; i++) {
                    if ($(this.clickableArray[i]).hasClass("clickable-clicked")) {
                        this.givenIndexArray.push(i);
                    }
                }
                this.logBookEvent({"event": "clickableArea", "act": this.clickedIndexArray.join(";"), "div_id": this.divid, "correct": storageObj.correct});
            }
        }
    }
    this.restoreAnswers({});   // pass empty object
};


ClickableArea.prototype.setLocalStorage = function (data) {
    // Array of the indices of clicked elements is passed to local storage
    var answer;
    if (data.answer !== undefined) {   // If we got data from the server, we can just use that
        answer = this.clickedIndexArray.join(";");
    } else {
        this.givenIndexArray = [];
        for (var i = 0; i < this.clickableArray.length; i++) {
            if ($(this.clickableArray[i]).hasClass("clickable-clicked")) {
                this.givenIndexArray.push(i);
            }
        }
        answer = this.givenIndexArray.join(";");
    }


    var timeStamp = new Date();
    var correct = data.correct;
    var storageObject = {"answer": answer, "correct": correct, "timestamp": timeStamp};
    localStorage.setItem(this.localStorageKey(), JSON.stringify(storageObject));
};

/*==========================
=== Auxilliary functions ===
==========================*/

ClickableArea.prototype.modifyClickables = function (childNodes) {
    // Strips the data-correct/data-incorrect labels and updates the correct/incorrect arrays
    for (var i = 0; i < childNodes.length; i++) {
        if ($(childNodes[i]).is("[data-correct]") || $(childNodes[i]).is("[data-incorrect]")) {

            this.manageNewClickable(childNodes[i]);

            if ($(childNodes[i]).is("[data-correct]")) {
                $(childNodes[i]).removeAttr("data-correct");
                this.correctArray.push(childNodes[i]);
            } else {
                $(childNodes[i]).removeAttr("data-incorrect");
                this.incorrectArray.push(childNodes[i]);
            }
        }
        if (childNodes[i].childNodes.length !== 0) {
            this.modifyClickables(childNodes[i].childNodes);
        }
    }
};

ClickableArea.prototype.modifyViaCC = function (children) {
    for (var i = 0; i < children.length; i++) {
        if (children[i].children.length !== 0) {
            this.modifyViaCC(children[i].children);
        } else {
            this.ccCounter++;
            if (this.ccCounter === Math.floor(this.ccArray[this.ccIndex])) {
                this.manageNewClickable(children[i]);
                this.correctArray.push(children[i]);
                this.ccIndex++;
            } else if (this.ccCounter === Math.floor(this.ciArray[this.ciIndex])){
                this.manageNewClickable(children[i]);
                this.incorrectArray.push(children[i]);
                this.ciIndex++;
            }
        }
    }
};

ClickableArea.prototype.modifyTableViaCC = function (children) {
    // table version of modifyViaCC
    var tComponentArr = [];
    for (var i = 0; i < children.length; i++) {
        if (children[i].nodeName === "TABLE") {
            var tmp = children[i];
            for (var j = 0; j < tmp.children.length; j++) {
                if (tmp.children[j].nodeName === "THEAD") {
                    tComponentArr.push(tmp.children[j]);
                } else if (tmp.children[j].nodeName === "TBODY") {
                    tComponentArr.push(tmp.children[j]);
                } else if (tmp.children[j].nodeName === "TFOOT") {
                    tComponentArr.push(tmp.children[j]);
                }
            }
        }
    }
    for (var t = 0; t < tComponentArr.length; t++) {
        for (var i = 0; i < tComponentArr[t].children.length; i++) {
            this.ccCounter++;
            // First check if the entire row needs to be clickable
            if (this.ccIndex < this.ccArray.length && this.ccCounter === Math.floor(this.ccArray[this.ccIndex].split(",")[0]) && Math.floor(this.ccArray[this.ccIndex].split(",")[1]) === 0) {
                this.manageNewClickable(tComponentArr[t].children[i]);
                this.correctArray.push(tComponentArr[t].children[i]);
                this.ccIndex++;
            } else if (this.ciIndex < this.ciArray.length && this.ccCounter === Math.floor(this.ciArray[this.ciIndex].split(",")[0]) && Math.floor(this.ciArray[this.ciIndex].split(",")[1]) === 0) {
                this.manageNewClickable(tComponentArr[t].children[i]);
                this.incorrectArray.push(tComponentArr[t].children[i]);
                this.ciIndex++;
            } else {
                // If not, check the individual data cells
                for (var j = 0; j < tComponentArr[t].children[i].children.length; j++) {
                    var tmp = j + 1;
                    if (this.ccIndex < this.ccArray.length && tmp === Math.floor(this.ccArray[this.ccIndex].split(",")[1]) && this.ccCounter === Math.floor(this.ccArray[this.ccIndex].split(",")[0])) {
                        this.manageNewClickable(tComponentArr[t].children[i].children[j]);
                        this.correctArray.push(tComponentArr[t].children[i].children[j]);
                        this.ccIndex++;
                    } else if (this.ciIndex < this.ciArray.length && tmp === Math.floor(this.ciArray[this.ciIndex].split(",")[1]) && this.ccCounter === Math.floor(this.ciArray[this.ciIndex].split(",")[0])) {
                        this.manageNewClickable(tComponentArr[t].children[i].children[j]);
                        this.incorrectArray.push(tComponentArr[t].children[i].children[j]);
                        this.ciIndex++;
                    }
                }
            }
        }
    }
};

ClickableArea.prototype.manageNewClickable = function (clickable) {
    // adds the "clickable" functionality
    $(clickable).addClass("clickable");

    if (this.hasStoredAnswers) {   // Check if the element we're about to append to the pre was in local storage as clicked via its index
        if (this.clickedIndexArray[this.clickIndex].toString() === this.clickableCounter.toString()) {
            $(clickable).addClass("clickable-clicked");
            this.clickIndex++;
            if (this.clickIndex === this.clickedIndexArray.length) {   // Stop doing this if the index array is used up
                this.hasStoredAnswers = false;
            }
        }
    }
    clickable.onclick = function () {
        if ($(this).hasClass("clickable-clicked")) {
            $(this).removeClass("clickable-clicked");
            $(this).removeClass("clickable-incorrect");
        } else {
            $(this).addClass("clickable-clicked");
        }
    };
    this.clickableArray.push(clickable);
    this.clickableCounter++;
};

/*======================================
== Evaluation and displaying feedback ==
======================================*/

ClickableArea.prototype.clickableEval = function (logFlag) {
    // Evaluation is done by iterating over the correct/incorrect arrays and checking by class
    this.correct = true;
    this.correctNum = 0;
    this.incorrectNum = 0;
    for (var i = 0; i < this.correctArray.length; i++) {
        if (!$(this.correctArray[i]).hasClass("clickable-clicked")) {
            this.correct = false;
        } else {
            this.correctNum++;
        }
    }
    for (var i = 0; i < this.incorrectArray.length; i++) {
        if ($(this.incorrectArray[i]).hasClass("clickable-clicked")) {
            $(this.incorrectArray[i]).addClass("clickable-incorrect");
            this.correct = false;
            this.incorrectNum++;
        } else {
            $(this.incorrectArray[i]).removeClass("clickable-incorrect");
        }
    }
    this.setLocalStorage({"correct": (this.correct ? "T" : "F")});
    if (logFlag) {   // Sometimes we don't want to log the answer; for example, on reload of timed exam questions
        this.logBookEvent({"event": "clickableArea", "act": this.givenIndexArray.join(";"), "div_id": this.divid, "correct": (this.correct ? "T" : "F")});
    }
    this.renderFeedback();
};

ClickableArea.prototype.renderFeedback = function () {

    if (this.correct) {
        $(this.feedBackDiv).html("You are Correct!");
        $(this.feedBackDiv).attr("class", "alert alert-info");

    } else {
        $(this.feedBackDiv).html("Incorrect. You clicked on " + this.correctNum + " of the " + this.correctArray.length.toString() + " correct elements and " + this.incorrectNum + " of the " + this.incorrectArray.length.toString() + " incorrect elements. " + this.feedback);

        $(this.feedBackDiv).attr("class", "alert alert-danger");
    }
};

/*=================================
== Find the custom HTML tags and ==
==   execute our code on them    ==
=================================*/
$(document).bind("runestone:login-complete", function () {
    $("[data-component=clickablearea]").each(function (index) {
        if ($(this).closest('[data-component=timedAssessment]').length == 0) { // If this element exists within a timed component, don't render it here
            CAList[this.id] = new ClickableArea({"orig": this, "useRunestoneServices":eBookConfig.useRunestoneServices});
        }
    });
});

if (typeof component_factory === 'undefined') {
    component_factory = {}
}
component_factory['clickablearea'] = function(opts) { return new ClickableArea(opts)}
