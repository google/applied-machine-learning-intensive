/*
__author__ = Kirby Olson
__date__ = 6/12/2015  */

var pollList = {};

Poll.prototype = new RunestoneBase();

function Poll(opts) {
    if (opts) {
        this.init(opts);
    }
}

Poll.prototype.init = function (opts) {
    RunestoneBase.apply(this, arguments);
    RunestoneBase.prototype.init.apply(this, arguments);
    var orig = opts.orig;  //entire <p> element
    this.origElem = orig;
    this.divid = orig.id;
    this.children = this.origElem.childNodes;
    this.optionList = [];
    this.optsArray = [];
    this.comment = false;
    if ($(this.origElem).is("[data-comment]")) {
        this.comment = true;
    }
    this.resultsViewer = $(orig).data('results');

    this.getQuestionText();
    this.getOptionText(); //populates optionList
    this.renderPoll();  //generates HTML
    this.checkPollStorage(); //checks localStorage to see if this poll has already been completed by this user

    this.caption="Poll"
    this.addCaption('runestone')
};

Poll.prototype.getQuestionText = function() {
    //finds the text inside the parent tag, but before the first <li> tag and sets it as the question
    var _this = this;
    var firstAnswer;
	for (var i=0; i<this.children.length; i++) {
    	if (this.children[i].tagName == "LI") {
            firstAnswer = _this.children[i];
            break;
        }
    }
    var delimiter = firstAnswer.outerHTML;
    var fulltext = $(this.origElem).html();
    var temp = fulltext.split(delimiter);
    this.question = temp[0];
};

Poll.prototype.getOptionText = function() {
    //Gets the text from each <li> tag and places it in this.optionList
    var _this = this;
    for (var i=0; i<this.children.length; i++) {
        if (_this.children[i].tagName == "LI") {
            _this.optionList.push($(_this.children[i]).text());
        }
    }
};

Poll.prototype.renderPoll = function() {
    //generates the HTML that the user interacts with
    var _this = this;
    this.containerDiv = document.createElement("div");
    this.pollForm = document.createElement("form");
    this.resultsDiv = document.createElement("div");

    this.containerDiv.id = this.divid + "_container";
    $(this.containerDiv).addClass(this.origElem.getAttribute("class"));

    $(this.pollForm).html(`<span style='font-size: Large'>${this.question}</span>`);
    $(this.pollForm).attr({
        "id":this.divid +"_form",
        "method" : "get",
        "action" : "",
        "onsubmit" : "return false;"
    });
    this.pollForm.appendChild(document.createElement("br"));
    for (var i=0; i<this.optionList.length; i++) {
        var radio = document.createElement("input");
        var tmpid = _this.divid + "_opt_" + i;
        $(radio).attr({
            "id":tmpid,
            "name":this.divid +"_group1",
            "type":"radio",
            "value":i
        });
        $(radio).click(this.submitPoll.bind(this))
        var label = document.createElement("label");
        $(label).attr("for", tmpid);
        $(label).text(this.optionList[i]);
        this.pollForm.appendChild(radio);
        this.optsArray.push(radio);
        this.pollForm.appendChild(label);
        this.pollForm.appendChild(document.createElement("br"));
    }

    if (this.comment) {
        this.renderTextField();
    }

    this.resultsDiv.id = this.divid + "_results";

    this.containerDiv.appendChild(this.pollForm);
    this.containerDiv.appendChild(this.resultsDiv);
    $(this.origElem).replaceWith(this.containerDiv);
};

Poll.prototype.renderTextField = function () {
    this.textfield = document.createElement("input");
    this.textfield.type = "text";
    $(this.textfield).addClass("form-control");
    this.textfield.style.width = "300px";
    this.textfield.name = this.divid + "_comment";
    this.textfield.placeholder = "Any comments?";
    this.pollForm.appendChild(this.textfield);
    this.pollForm.appendChild(document.createElement("br"));
};

Poll.prototype.submitPoll = function() {
    //checks the poll, sets localstorage and submits to the server
    var poll_val = null;
    for (var i = 0; i < this.optsArray.length; i++) {
        if (this.optsArray[i].checked) {
            poll_val = this.optsArray[i].value;
            break;
        }
    }
    if(poll_val ===  null)
        return;

    var comment_val = "";
    if (this.comment) {
        comment_val = this.textfield.value;
    }

    var act = "";
    if(comment_val !== "") {
       act = poll_val + ":" + comment_val;
    } else {
        act = poll_val;
    }

    var eventInfo = {"event":"poll", "act":act, "div_id":this.divid};

    // log the response to the database
    this.logBookEvent(eventInfo); // in bookfuncs.js

    // log the fact that the user has answered the poll to local storage
    localStorage.setItem(this.divid, "true");
    if (! document.getElementById(`${this.divid}_sent`)) {
        $(this.pollForm).append(`<span id=${this.divid}_sent><strong>Thanks, your response has been recorded</strong></span>`);
    } else {
        $(`#${this.divid}_sent`).html("<strong>Only Your last reponse is recorded</strong>")
    }

    // show the results of the poll
    if (this.resultsViewer === "all") {
        var data = {};
        data.div_id = this.divid;
        data.course = eBookConfig.course;
        jQuery.get(eBookConfig.ajaxURL+"getpollresults", data, this.showPollResults);
    }
}

Poll.prototype.showPollResults = function(data) {
    //displays the results returned by the server
    var results = eval(data);
    var total = results[0];
    var opt_list = results[1];
    var count_list = results[2];
    var div_id = results[3];
    var my_vote = results[4];

    // resture current users vote
    if (my_vote > -1) {
        this.optsArray[my_vote].checked = 'checked';
    }

    // show results summary if appropriate
    if (this.resultsViewer === "all" && localStorage.getItem(this.divid === "true") || eBookConfig.isInstructor ) {
        $(this.resultsDiv).html("<b>Results:</b><br><br>");

        var list = $(document.createElement("ol"));
        for(var i=0; i<opt_list.length; i++) {
            var count = count_list[i];
            var percent = (count / total) * 100;
            var text = Math.round(10*percent)/10 + "%";   // round percent to 10ths

            var html = "<li value='"+(opt_list[i]+1)+"'><div class='progress'><div class='progress-bar progress-bar-success' style=width:"+percent+"%;><span class='poll-text'>"+text+"</span></div></div></li>";
            var el = $(html);
            list.append(el);
        }
    $(this.resultsDiv).append(list);
    }
};

Poll.prototype.disableOptions = function() {

};

Poll.prototype.checkPollStorage = function() {
    //checks the localstorage to see if the poll has been completed already
    var _this = this;
    var len = localStorage.length;
    if (len > 0) { //If the poll has already been completed, show the results
        var data = {};
        data.div_id = this.divid;
        data.course = eBookConfig.course;
        jQuery.get(eBookConfig.ajaxURL+"getpollresults", data, this.showPollResults.bind(this));
    }
};


// Do not render poll data until login-complete event so we know instructor status
$(document).bind("runestone:login-complete", function () {
    $("[data-component=poll]").each(function(index) {
        pollList[this.id] = new Poll({"orig":this});
    });
});

if (typeof component_factory === 'undefined') {
    component_factory = {}
}
component_factory['poll'] = function(opts) { return new Poll(opts)}

