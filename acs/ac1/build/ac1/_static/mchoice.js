/*==========================================
========      Master mchoice.js     =========
============================================
===  This file contains the JS for the   ===
=== Runestone multiple choice component. ===
============================================
===              Created By              ===
===           Isaiah Mayerchak           ===
===                 and                  ===
===             Kirby Olson              ===
===                6/4/15                ===
==========================================*/

var mcList = {};    // Multiple Choice dictionary

// MC constructor
function MultipleChoice (opts) {
    if (opts) {
        this.init(opts);
    }
}

MultipleChoice.prototype = new RunestoneBase();

/*===================================
===     Setting MC variables      ===
===================================*/

MultipleChoice.prototype.init = function (opts) {
    RunestoneBase.apply(this, arguments);
    RunestoneBase.prototype.init.apply(this, arguments);
    var orig = opts.orig;    // entire <ul> element
    this.origElem = orig;
    this.useRunestoneServices = opts.useRunestoneServices;
    this.multipleanswers = false;
    this.divid = orig.id;
    this.caption = 'Multiple Choice'

    if ($(this.origElem).data("multipleanswers") === true) {
        this.multipleanswers = true;
    }

    this.children = this.origElem.childNodes;

    this.random = false;
    if ($(this.origElem).is("[data-random]")) {
        this.random = true;
    }

    this.correct = null;

    this.answerList = [];
    this.correctList = [];
    this.correctIndexList = [];
    this.feedbackList = [];
    this.question = null;

    this.findAnswers();
    this.findQuestion();
    this.findFeedbacks();
    this.createCorrectList();
    this.createMCForm();
    this.checkServer("mChoice");

    this.addCaption('runestone');
};

/*====================================
==== Functions parsing variables  ====
====  out of intermediate HTML    ====
====================================*/

MultipleChoice.prototype.findQuestion = function () {         // Takes full text
    var delimiter;
    for (var i = 0; i < this.origElem.childNodes.length; i++) {
        if (this.origElem.childNodes[i].nodeName === "LI") {
            delimiter = this.origElem.childNodes[i].outerHTML;
            break;
        }
    }
    var fulltext = $(this.origElem).html();
    var temp = fulltext.split(delimiter);
    this.question = temp[0];
};

MultipleChoice.prototype.findAnswers = function () {
    // Creates answer objects and pushes them to answerList
    // format: ID, Correct bool, Content (text)

    var ChildAnswerList = [];
    for (var i = 0; i < this.children.length; i++) {
        if ($(this.children[i]).is("[data-component=answer]")) {
            ChildAnswerList.push(this.children[i]);
        }
    }
    for (var j = 0; j < ChildAnswerList.length; j++) {
        var answer_id = $(ChildAnswerList[j]).attr("id");
        var is_correct = false;
        if ($(ChildAnswerList[j]).is("[data-correct]")) {    // If data-correct attribute exists, answer is correct
            is_correct = true;
        }
        var answer_text = $(ChildAnswerList[j]).html();
        var answer_object = {id: answer_id, correct: is_correct, content: answer_text};
        this.answerList.push(answer_object);
    }
};

MultipleChoice.prototype.findFeedbacks = function () {
    for (var i = 0; i < this.children.length; i++) {
        if ($(this.children[i]).is("[data-component=feedback]")) {
            this.feedbackList.push(this.children[i].innerHTML);
        }
    }
};

MultipleChoice.prototype.createCorrectList = function () {
    // Creates array that holds the ID"s of correct answers
    // Also populates an array that holds the indeces of correct answers
    for (var i = 0; i < this.answerList.length; i++) {
        if (this.answerList[i].correct) {
            this.correctList.push(this.answerList[i].id);
            this.correctIndexList.push(i);
        }
    }
};

/*===========================================
====   Functions generating final HTML   ====
===========================================*/

MultipleChoice.prototype.createMCForm = function () {
    this.renderMCContainer();
    this.renderMCForm();    // renders the form with options and buttons
    this.renderMCfeedbackDiv();

    // replaces intermediate HTML with rendered HTML
    $(this.origElem).replaceWith(this.containerDiv);
};

MultipleChoice.prototype.renderMCContainer = function () {
    this.containerDiv = document.createElement("div");
    $(this.containerDiv).html(this.question);
    $(this.containerDiv).addClass(this.origElem.getAttribute("class"));
    this.containerDiv.id = this.divid;
};

MultipleChoice.prototype.renderMCForm = function () {
    this.optsForm = document.createElement("form");
    this.optsForm.id = this.divid + "_form";
    $(this.optsForm).attr({
        "method": "get",
        "action": "",
        "onsubmit": "return false;"
    });

    // generate form options
    this.renderMCFormOpts();

    this.renderMCFormButtons();

    // Append the form to the container
    this.containerDiv.appendChild(this.optsForm);
};

MultipleChoice.prototype.renderMCFormOpts = function () {
    // creates input DOM elements
    this.optionArray = []; // array with an object for each option containing the input and label for that option
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

        // Create the label for the input
        var label = document.createElement("label");
        // If the content begins with a ``<p>``, put the label inside of it. (Sphinx 2.0 puts all content in a ``<p>``, while Sphinx 1.8 doesn't).
        var content = this.answerList[k].content;
        var prefix = '';
        if (content.startsWith('<p>')) {
            prefix = '<p>';
            content = content.slice(3);
        }
        $(label).html(`${prefix}<input type="${input_type}" name="group1" value=${k} id=${optid}>${String.fromCharCode('A'.charCodeAt(0) + j)}. ${content}`);

        // create the object to store in optionArray
        var optObj = {
            input: $(label).find('input')[0],
            label: label
        };
        this.optionArray.push(optObj);

        // add the option to the form
        this.optsForm.appendChild(label);
        this.optsForm.appendChild(document.createElement("br"));


    }
};

MultipleChoice.prototype.renderMCFormButtons = function () {
    // submit and compare me buttons
    // Create submit button
    this.submitButton = document.createElement("button");
    this.submitButton.textContent = "Check Me";
    $(this.submitButton).attr({
        "class": "btn btn-success",
        "name": "do answer",
        "type": "button"
    });
    if (this.multipleanswers) {
        this.submitButton.addEventListener("click", function () {
            this.processMCMASubmission(true);
        }.bind(this), false);
    } else {
        this.submitButton.addEventListener("click", function (ev) {
            ev.preventDefault();
            this.processMCMFSubmission(true);
        }.bind(this), false);
    } // end else
    this.optsForm.appendChild(this.submitButton);

    // Create compare button
    if (this.useRunestoneServices) {
        this.compareButton = document.createElement("button");
        $(this.compareButton).attr({
            "class": "btn btn-default",
            "id": this.divid + "_bcomp",
            "disabled": "",
            "name": "compare"
        });
        this.compareButton.textContent = "Compare me";
        this.compareButton.addEventListener("click", function () {
            this.compareAnswers(this.divid);
        }.bind(this), false);
        this.optsForm.appendChild(this.compareButton);
    }
};

MultipleChoice.prototype.renderMCfeedbackDiv = function () {
    this.feedBackDiv = document.createElement("div");
    this.feedBackDiv.id = this.divid + "_feedback";
    this.containerDiv.appendChild(document.createElement("br"));
    this.containerDiv.appendChild(this.feedBackDiv);
};

MultipleChoice.prototype.randomizeAnswers = function () {
    // Makes the ordering of the answer choices random
    var currentIndex = this.indexArray.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = this.indexArray[currentIndex];
        this.indexArray[currentIndex] = this.indexArray[randomIndex];
        this.indexArray[randomIndex] = temporaryValue;

        var temporaryFeedback = this.feedbackList[currentIndex];
        this.feedbackList[currentIndex] = this.feedbackList[randomIndex];
        this.feedbackList[randomIndex] = temporaryFeedback;
    }
};

/*===================================
=== Checking/loading from storage ===
===================================*/

MultipleChoice.prototype.restoreAnswers = function (data) {
    // Restore answers from storage retrieval done in RunestoneBase
    // sometimes data.answer can be null
    if (!data.answer) {
        data.answer = "";
    }
    var answers = data.answer.split(",");
    for (var a = 0; a < answers.length; a++) {
        var index = answers[a];
        for (var b = 0; b < this.optionArray.length; b++) {
            if (this.optionArray[b].input.value == index) {
                $(this.optionArray[b].input).attr("checked", "true");
            }
        }
    }
    if (this.multipleanswers) {
        this.processMCMASubmission(false);
    } else {
        this.processMCMFSubmission(false);
    }
};

MultipleChoice.prototype.checkLocalStorage = function () {
    // Repopulates MCMA questions with a user's previous answers,
    // which were stored into local storage.
    if (this.graderactive) {
        return;
    }
    var len = localStorage.length;
    if (len > 0) {
        var ex = localStorage.getItem(this.localStorageKey());
        if (ex !== null) {
            try {
                var storedData = JSON.parse(ex);
                var answers = storedData.answer.split(",");
            } catch (err) {
                // error while parsing; likely due to bad value stored in storage
                console.log(err.message);
                localStorage.removeItem(this.localStorageKey());
                return;
            }
            for (var a = 0; a < answers.length; a++) {
                var index = answers[a];
                for (var b = 0; b < this.optionArray.length; b++) {
                    if (this.optionArray[b].input.value == index) {
                        $(this.optionArray[b].input).attr("checked", "true");
                    }
                }
            }
            if (this.useRunestoneServices) {
                this.enableMCComparison();
                this.getSubmittedOpts();   // to populate givenlog for logging
                if (this.multipleanswers) {
                    this.logMCMAsubmission(storedData);
                } else {
                    this.logMCMFsubmission(storedData);
                }
            }
        }
    }
};

MultipleChoice.prototype.setLocalStorage = function (data) {
    var timeStamp = new Date();
    var storageObj = {"answer": data.answer, "timestamp": timeStamp, "correct": data.correct};
    localStorage.setItem(this.localStorageKey(), JSON.stringify(storageObj));
};

/*===============================
=== Processing MC Submissions ===
===============================*/

MultipleChoice.prototype.processMCMASubmission = function (logFlag) {
    // Called when the submit button is clicked
    this.getSubmittedOpts();   // make sure this.givenArray is populated
    this.scoreMCMASubmission();
    this.setLocalStorage({"correct": (this.correct ? "T" : "F"), "answer": this.givenArray.join(",")});
    if (logFlag) {
        var answer = this.givenArray.join(",");
        this.logMCMAsubmission({"answer": answer, "correct": this.correct});
    }
    this.renderMCMAFeedBack();
    if (this.useRunestoneServices) {
        this.enableMCComparison();
    }
};

MultipleChoice.prototype.getSubmittedOpts = function () {
    var given;
    this.singlefeedback = ""; // Used for MCMF questions
    this.feedbackString = ""; // Used for MCMA questions
    this.givenArray = [];
    this.givenlog = "";
    var buttonObjs = this.optsForm.elements.group1;
    for (var i = 0; i < buttonObjs.length; i++) {
        if (buttonObjs[i].checked) {
            given = buttonObjs[i].value;
            this.givenArray.push(given);
            this.feedbackString += '<li value="' + (i + 1) + '">' + this.feedbackList[i] + "</li>";
            this.givenlog += given + ",";
            this.singlefeedback = this.feedbackList[i];
        }
    }
    this.givenArray.sort();
};

MultipleChoice.prototype.scoreMCMASubmission = function () {
    this.correctCount = 0;
    var correctIndex = 0;
    var givenIndex = 0;
    while (correctIndex < this.correctIndexList.length && givenIndex < this.givenArray.length) {
        if (this.givenArray[givenIndex] < this.correctIndexList[correctIndex]) {
            givenIndex++;
        } else if (this.givenArray[givenIndex] == this.correctIndexList[correctIndex]) {
            this.correctCount++;
            givenIndex++;
            correctIndex++;
        } else {
            correctIndex++;
        }
    }
    var numGiven = this.givenArray.length;
    var numCorrect = this.correctCount;
    var numNeeded = this.correctList.length;
    this.correct = (numCorrect === numNeeded) && (numNeeded === numGiven);
};



MultipleChoice.prototype.logMCMAsubmission = function (data) {
    var answer = data.answer;
    var correct = data.correct;
    var logAnswer = "answer:" + answer + ":" + (correct == "T" ? "correct" : "no");
    this.logBookEvent({"event": "mChoice", "act": logAnswer, "answer":answer, "correct": correct, "div_id": this.divid});
};


MultipleChoice.prototype.renderMCMAFeedBack = function () {
    var answerStr = "answers";
    var numGiven = this.givenArray.length;
    if (numGiven === 1) {
        answerStr = "answer";
    }
    var numCorrect = this.correctCount;
    var numNeeded = this.correctList.length;
    var feedbackText = this.feedbackString;

    if (this.correct) {
        $(this.feedBackDiv).html('✔️ <ol type="A">' + feedbackText + "</ul>");
        $(this.feedBackDiv).attr("class", "alert alert-info");
    } else {
        $(this.feedBackDiv).html("✖️ " + "You gave " + numGiven +
            " " + answerStr + " and got " + numCorrect + " correct of " +
            numNeeded + ' needed.<ol type="A">' + feedbackText + "</ul>");
        $(this.feedBackDiv).attr("class", "alert alert-danger");
    }
};

MultipleChoice.prototype.processMCMFSubmission = function (logFlag) {
    // Called when the submit button is clicked
    this.getSubmittedOpts();   // make sure this.givenArray is populated
    this.scoreMCMFSubmission();
    this.setLocalStorage({"correct": (this.correct ? "T" : "F"), "answer": this.givenArray.join(",")});
    if (logFlag) {
        this.logMCMFsubmission();
    }
    this.renderMCMFFeedback(this.givenArray[0] == this.correctIndexList[0], this.singlefeedback);
    if (this.useRunestoneServices) {
        this.enableMCComparison();
    }
};

MultipleChoice.prototype.scoreMCMFSubmission = function () {
    if (this.givenArray[0] == this.correctIndexList[0]) {
        this.correct = true;
    } else if (this.givenArray[0] != null) { // if given is null then the question wasn"t answered and should be counted as skipped
        this.correct = false;
    }
};



MultipleChoice.prototype.logMCMFsubmission = function () {
    var answer = this.givenArray[0];
    var correct = (this.givenArray[0] == this.correctIndexList[0] ? "T" : "F");
    var logAnswer = "answer:" + answer + ":" + (correct == "T" ? "correct" : "no");  // backward compatible
    this.logBookEvent({"event": "mChoice", "act": logAnswer, "answer": answer, "correct": correct, "div_id": this.divid});
};

MultipleChoice.prototype.renderMCMFFeedback = function (correct, feedbackText) {
    if (correct) {
        $(this.feedBackDiv).html("✔️ " + feedbackText);
        $(this.feedBackDiv).attr("class", "alert alert-info"); // use blue for better red/green blue color blindness
    } else {
        if (feedbackText == null) {
            feedbackText = "";
        }
        $(this.feedBackDiv).html("✖️ " + feedbackText);
        $(this.feedBackDiv).attr("class", "alert alert-danger");
    }
};

MultipleChoice.prototype.enableMCComparison = function () {
    this.compareButton.disabled = false;
};

MultipleChoice.prototype.instructorMchoiceModal = function (data) {
    // data.reslist -- student and their answers
    // data.answerDict    -- answers and count
    // data.correct - correct answer
    var res = "<table><tr><th>Student</th><th>Answer(s)</th></tr>";
    for (var i in data) {
        res += "<tr><td>" + data[i][0] + "</td><td>" + data[i][1] + "</td></tr>";
    }
    res += "</table>";
    return res;
};

MultipleChoice.prototype.compareModal = function (data, status, whatever) {
    var datadict = eval(data)[0];
    var answers = datadict.answerDict;
    var misc = datadict.misc;
    var kl = Object.keys(answers).sort();

    var body = "<table>";
    body += "<tr><th>Answer</th><th>Percent</th></tr>";

    var theClass = "";
    for (var k in kl) {
        if (kl[k] === misc.correct) {
            theClass = "success";
        } else {
            theClass = "info";
        }

        body += "<tr><td>" + kl[k] + "</td><td class='compare-me-progress'>";
        var pct = answers[kl[k]] + "%";
        body += "<div class='progress'>";
        body += "    <div class='progress-bar progress-bar-" + theClass + "' style='width:" + pct + ";'>" + pct;
        body += "    </div>";
        body += "</div></td></tr>";
    }
    body += "</table>";

    if (misc["yourpct"] !== "unavailable") {
        body += "<br /><p>You have " + misc["yourpct"] + "% correct for all questions</p>";
    }

    if (datadict.reslist !== undefined) {
        body += this.instructorMchoiceModal(datadict.reslist);
    }

    var html = "<div class='modal fade'>" +
        "    <div class='modal-dialog compare-modal'>" +
        "        <div class='modal-content'>" +
        "            <div class='modal-header'>" +
        "                <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>" +
        "                <h4 class='modal-title'>Distribution of Answers</h4>" +
        "            </div>" +
        "            <div class='modal-body'>" +
        body +
        "            </div>" +
        "        </div>" +
        "    </div>" +
        "</div>";

    var el = $(html);
    el.modal();
};

MultipleChoice.prototype.compareAnswers = function () {
    var data = {};
    data.div_id = this.divid;
    data.course = eBookConfig.course;
    jQuery.get(eBookConfig.ajaxURL + "getaggregateresults", data, this.compareModal.bind(this));
};

/*=================================
== Find the custom HTML tags and ==
==   execute our code on them    ==
=================================*/
$(document).bind("runestone:login-complete", function () {
    $("[data-component=multiplechoice]").each(function (index) {    // MC
        var opts = {"orig": this, 'useRunestoneServices':eBookConfig.useRunestoneServices};
        if ($(this).closest('[data-component=timedAssessment]').length == 0) { // If this element exists within a timed component, don't render it here
            mcList[this.id] = new MultipleChoice(opts);
        }
    });
});

if (typeof component_factory === 'undefined') {
    component_factory = {}
}
component_factory['multiplechoice'] = function(opts) { return new MultipleChoice(opts)}
