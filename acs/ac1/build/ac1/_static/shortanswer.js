/*==========================================
=======    Master shortanswer.js    ========
============================================
===     This file contains the JS for    ===
=== the Runestone shortanswer component. ===
============================================
===              Created by              ===
===           Isaiah Mayerchak           ===
===                7/2/15                ===
==========================================*/

var saList = {};    // Dictionary that contains all instances of shortanswer objects


function ShortAnswer (opts) {
    if (opts) {
        this.init(opts);
    }
}

ShortAnswer.prototype = new RunestoneBase();

/*========================================
== Initialize basic ShortAnswer attributes ==
========================================*/
ShortAnswer.prototype.init = function (opts) {
    RunestoneBase.apply(this, arguments);
    RunestoneBase.prototype.init.apply(this, arguments);
    var orig = opts.orig;    // entire <p> element that will be replaced by new HTML
    this.useRunestoneServices = opts.useRunestoneServices || eBookConfig.useRunestoneServices;
    this.origElem = orig;
    this.divid = orig.id;
    this.question = this.origElem.innerHTML;

    this.optional = false;
    if ($(this.origElem).is("[data-optional]")) {
        this.optional = true;
    }

    this.renderHTML();
    this.checkServer("shortanswer");
    this.caption = "shortanswer";
    this.addCaption("runestone");
    
};

ShortAnswer.prototype.renderHTML = function() {
    this.containerDiv = document.createElement("div");
    this.containerDiv.id = this.divid;
    $(this.containerDiv).addClass(this.origElem.getAttribute("class"));
    this.newForm = document.createElement("form");
    this.newForm.id = this.divid + "_journal";
    this.newForm.name = this.newForm.id;
    this.newForm.action = "";
    this.containerDiv.appendChild(this.newForm);

    this.fieldSet = document.createElement("fieldset");
    this.newForm.appendChild(this.fieldSet);

    this.legend = document.createElement("legend");
    this.legend.innerHTML = "Short Answer";
    this.fieldSet.appendChild(this.legend);

    this.firstLegendDiv = document.createElement("div");
    this.firstLegendDiv.innerHTML = this.question;
    $(this.firstLegendDiv).addClass("journal-question");
    this.fieldSet.appendChild(this.firstLegendDiv);

    this.jInputDiv = document.createElement("div");
    this.jInputDiv.id = this.divid + "_journal_input";
    this.fieldSet.appendChild(this.jInputDiv);

    this.jOptionsDiv = document.createElement("div");
    $(this.jOptionsDiv).addClass("journal-options");
    this.jInputDiv.appendChild(this.jOptionsDiv);

    this.jLabel = document.createElement("label");
    $(this.jLabel).addClass("radio-inline");
    this.jOptionsDiv.appendChild(this.jLabel);

    this.jTextArea = document.createElement("textarea");
    this.jTextArea.id = this.divid + "_solution";
    $(this.jTextArea).attr("aria-label", "textarea");
    $(this.jTextArea).css("display:inline, width:530px");
    $(this.jTextArea).addClass("form-control");
    this.jTextArea.rows = 4;
    this.jTextArea.cols = 50;
    this.jLabel.appendChild(this.jTextArea);
    this.jTextArea.oninput = function () {
       this.feedbackDiv.innerHTML = "Your answer has not been saved yet!";
       $(this.feedbackDiv).removeClass("alert-success");
       $(this.feedbackDiv).addClass("alert alert-danger");
    }.bind(this);

    this.fieldSet.appendChild(document.createElement("br"));

    this.buttonDiv = document.createElement("div");
    this.fieldSet.appendChild(this.buttonDiv);

    this.submitButton = document.createElement("button");
    $(this.submitButton).addClass("btn btn-success");
    this.submitButton.type = "button";
    this.submitButton.textContent = "Save";
    this.submitButton.onclick = function () {
        this.submitJournal();
    }.bind(this);
    this.buttonDiv.appendChild(this.submitButton);

    // barb - removed since we aren't really giving instructor feedback here
    /* this.randomSpan = document.createElement("span");
    this.randomSpan.innerHTML = "Instructor's Feedback";
    this.fieldSet.appendChild(this.randomSpan); */

    /* this.otherOptionsDiv = document.createElement("div");
    $(this.otherOptionsDiv).css("padding-left:20px");
    $(this.otherOptionsDiv).addClass("journal-options");
    this.fieldSet.appendChild(this.otherOptionsDiv); */

    // add a feedback div to give user feedback
    this.feedbackDiv = document.createElement("div");
    //$(this.feedbackDiv).addClass("bg-info form-control");
    //$(this.feedbackDiv).css("width:530px, background-color:#eee, font-style:italic");
    $(this.feedbackDiv).css("width:530px, font-style:italic");
    this.feedbackDiv.id = this.divid + "_feedback";
    this.feedbackDiv.innerHTML = "You have not answered this question yet.";
    $(this.feedbackDiv).addClass("alert alert-danger");
    //this.otherOptionsDiv.appendChild(this.feedbackDiv);
    this.fieldSet.appendChild(this.feedbackDiv);

    //this.fieldSet.appendChild(document.createElement("br"));

    $(this.origElem).replaceWith(this.containerDiv);
};

ShortAnswer.prototype.submitJournal = function () {
    var value = $("#"+this.divid+"_solution").val();


    this.setLocalStorage({answer: value, timestamp: new Date()})
    this.logBookEvent({'event': 'shortanswer', 'act': value, 'div_id': this.divid});
    this.feedbackDiv.innerHTML = "Your answer has been saved.";
    $(this.feedbackDiv).removeClass("alert-danger");
    $(this.feedbackDiv).addClass("alert alert-success");
};

ShortAnswer.prototype.setLocalStorage = function(data) {
    if (! this.graderactive ) {
        let key = this.localStorageKey()
        localStorage.setItem(key, JSON.stringify(data));
    }
};

ShortAnswer.prototype.checkLocalStorage = function () {
    // Repopulates the short answer text
    // which was stored into local storage.
    if (this.graderactive) {
        return;
    }

    var len = localStorage.length;
    if (len > 0) {
        var ex = localStorage.getItem(this.localStorageKey());
        if (ex !== null) {
            try {
                var storedData = JSON.parse(ex);
                var answer = storedData.answer;
            } catch (err) {
                // error while parsing; likely due to bad value stored in storage
                console.log(err.message);
                localStorage.removeItem(this.localStorageKey());
                return;
            }
            let solution = $("#" + this.divid + "_solution");
            solution.text(answer);
            this.feedbackDiv.innerHTML = "Your current saved answer is shown above.";
            $(this.feedbackDiv).removeClass("alert-danger");
            $(this.feedbackDiv).addClass("alert alert-success");

        }
    }
};

ShortAnswer.prototype.restoreAnswers = function (data) {
    // Restore answers from storage retrieval done in RunestoneBase
    // sometimes data.answer can be null
    if (!data.answer) {
        data.answer = "";
    }

    let solution = $("#" + this.divid + "_solution");
    solution.text(data.answer);
    this.feedbackDiv.innerHTML = "Your current saved answer is shown above.";
    $(this.feedbackDiv).removeClass("alert-danger");
    $(this.feedbackDiv).addClass("alert alert-success");


};

/*=================================
== Find the custom HTML tags and ==
==   execute our code on them    ==
=================================*/
$(document).ready(function () {
    $("[data-component=shortanswer]").each(function (index) {
        if ($(this).closest('[data-component=timedAssessment]').length == 0) { // If this element exists within a timed component, don't render it here
            saList[this.id] = new ShortAnswer({"orig": this, 'useRunestoneServices': eBookConfig.useRunestoneServices});
        }
    });

});

if (typeof component_factory === 'undefined') {
    component_factory = {}
}
component_factory['shortanswer'] = function(opts) { return new ShortAnswer(opts)}
