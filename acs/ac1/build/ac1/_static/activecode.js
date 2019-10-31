/**
 *
 * Created by bmiller on 3/19/15.
 */

var isMouseDown = false;
document.onmousedown = function() { isMouseDown = true };
document.onmouseup   = function() { isMouseDown = false };
var edList = {};
var allDburls = {};

ActiveCode.prototype = new RunestoneBase();
var socket, connection, doc;
var chatcodesServer = 'chat.codes';

// separate into constructor and init

function ActiveCode(opts) {
    if (opts) {
        this.init(opts);
        }
    }

ActiveCode.prototype.init = function(opts) {
    RunestoneBase.apply( this, arguments );  // call parent constructor
    RunestoneBase.prototype.init.apply(this, arguments);
    var suffStart;
    var orig = opts.orig;
    this.useRunestoneServices = opts.useRunestoneServices;
    this.python3 = opts.python3;
    this.alignVertical = opts.vertical;
    this.origElem = orig;
    this.divid = orig.id;
    this.code = $(orig).text() || "\n\n\n\n\n";
    this.language = $(orig).data('lang');
    this.timelimit = $(orig).data('timelimit');
    this.includes = $(orig).data('include');
    this.hidecode = $(orig).data('hidecode');
    this.chatcodes = $(orig).data('chatcodes');
    this.hidehistory = $(orig).data('hidehistory');
    this.tie = $(orig).data('tie')
    this.dburl = $(orig).data('dburl');
    this.runButton = null;
    this.enabledownload = $(orig).data('enabledownload');
    this.downloadButton = null;
    this.saveButton = null;
    this.loadButton = null;
    this.outerDiv = null;
    this.partner = ""
    if ((! eBookConfig.allow_pairs) || $(orig).data('nopair')) {
        this.enablePartner = false;
    } else {
        this.enablePartner = true;
    }

    this.output = null; // create pre for output
    this.graphics = null; // create div for turtle graphics
    this.codecoach = null;
    this.codelens = null;
    this.controlDiv = null;
    this.historyScrubber = null;
    this.timestamps = ["Original"];
    this.autorun = $(orig).data('autorun');

    if(this.chatcodes && eBookConfig.enable_chatcodes) {
        if(!socket) {
            socket = new WebSocket('wss://'+chatcodesServer);
        }
        if(!connection) {
            connection = new sharedb.Connection(socket);
        }
        if(!doc) {
            doc = connection.get('chatcodes', 'channels');
        }
    }

    if(this.graderactive) {
        this.hidecode = false;
    }

    if(this.includes !== undefined) {
        this.includes = this.includes.split(/\s+/);
    }

    suffStart = this.code.indexOf('====');
    if (suffStart > -1) {
        this.suffix = this.code.substring(suffStart+5);
        this.code = this.code.substring(0,suffStart);
    }

    this.history = [this.code];
    this.createEditor();
    this.createOutput();
    this.createControls();
    if ($(orig).data('caption')) {
        this.caption = $(orig).data('caption');
    } else {
        this.caption = "ActiveCode"
    }
    this.addCaption('runestone');
    this.addJSONLibrary();

    if (this.autorun) {
        $(document).ready(this.runProg.bind(this));
    }
};

ActiveCode.prototype.createEditor = function (index) {
    this.containerDiv = document.createElement('div');
    var linkdiv = document.createElement('div');
    linkdiv.id = this.divid.replace(/_/g,'-').toLowerCase();  // :ref: changes _ to - so add this as a target
    $(this.containerDiv).addClass("ac_section alert alert-warning");
    var codeDiv = document.createElement("div");
    $(codeDiv).addClass("ac_code_div col-md-12");
    this.codeDiv = codeDiv;
    this.containerDiv.id = this.divid;
    this.containerDiv.lang = this.language;
    this.outerDiv = this.containerDiv;

    $(this.origElem).replaceWith(this.containerDiv);
    if (linkdiv.id !== this.divid) {  // Don't want the 'extra' target if they match.
        this.containerDiv.appendChild(linkdiv);
    }
    this.containerDiv.appendChild(codeDiv);
    var edmode = this.containerDiv.lang;
    if (edmode === 'sql')  {
        edmode = 'text/x-sql'
    } else if (edmode === 'java') {
        edmode = 'text/x-java'
    }

    var editor = CodeMirror(codeDiv, {value: this.code, lineNumbers: true,
        mode: edmode, indentUnit: 4,
        matchBrackets: true, autoMatchParens: true,
        extraKeys: {"Tab": "indentMore", "Shift-Tab": "indentLess"}
    });

    // Make the editor resizable
    $(editor.getWrapperElement()).resizable({
        resize: function() {
            editor.setSize($(this).width(), $(this).height());
            editor.refresh();
        }
    });

    // give the user a visual cue that they have changed but not saved
    editor.on('change', (function (ev) {
        if (editor.acEditEvent == false || editor.acEditEvent === undefined) {
            // change events can come before any real changes for various reasons, some unknown
            // this avoids unneccsary log events and updates to the activity counter
            if (this.origElem.textContent === editor.getValue()) {
                return;
            }
            $(editor.getWrapperElement()).css('border-top', '2px solid #b43232');
            $(editor.getWrapperElement()).css('border-bottom', '2px solid #b43232');
            this.logBookEvent({'event': 'activecode', 'act': 'edit', 'div_id': this.divid});
        }
        editor.acEditEvent = true;
    }).bind(this));  // use bind to preserve *this* inside the on handler.

    //Solving Keyboard Trap of ActiveCode: If user use tab for navigation outside of ActiveCode, then change tab behavior in ActiveCode to enable tab user to tab out of the textarea
    $(window).keydown(function (e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 9 && $('textarea:focus').length === 0) {
            editor.setOption("extraKeys", {
                "Tab": function(cm) {
                    $(document.activeElement).closest('.tab-content').nextSibling.focus();
                },
                "Shift-Tab": function(cm) {
                    $(document.activeElement).closest('.tab-content').previousSibling.focus();
                }
            });
        }
    });

    this.editor = editor;
    if (this.hidecode) {
        $(this.codeDiv).css("display","none");
    }
};

ActiveCode.prototype.createControls = function () {
    var ctrlDiv = document.createElement("div");
    $(ctrlDiv).addClass("ac_actions");
    $(ctrlDiv).addClass("col-md-12");
    // Run
    var butt = document.createElement("button");
    $(butt).text($.i18n("msg_activecode_run_code"));
    $(butt).addClass("btn btn-success run-button");
    ctrlDiv.appendChild(butt);
    this.runButton = butt;
    $(butt).click(this.runProg.bind(this));
    $(butt).attr("type","button")

    if (this.enabledownload || eBookConfig.downloadsEnabled) {
      var butt = document.createElement("button");
      $(butt).text("Download");
      $(butt).addClass("btn save-button");
      ctrlDiv.appendChild(butt);
      this.downloadButton = butt;
      $(butt).click(this.downloadFile.bind(this, this.language));
      $(butt).attr("type","button")
    }

    if (!this.hidecode && !this.hidehistory) {
        var butt = document.createElement("button");
        $(butt).text($.i18n("msg_activecode_load_history"));
        $(butt).addClass("btn btn-default");
        $(butt).attr("type","button")
        ctrlDiv.appendChild(butt);
        this.histButton = butt;
        $(butt).click(this.addHistoryScrubber.bind(this));
        if (this.graderactive) {
            this.addHistoryScrubber(true);
        }
    }

    if ($(this.origElem).data('gradebutton') && ! this.graderactive) {
        butt = document.createElement("button");
        $(butt).addClass("ac_opt btn btn-default");
        $(butt).text($.i18n("msg_activecode_show_feedback"));
        $(butt).css("margin-left","10px");
        $(butt).attr("type","button")
        this.gradeButton = butt;
        ctrlDiv.appendChild(butt);
        $(butt).click(this.createGradeSummary.bind(this))
    }
    // Show/Hide Code
    if (this.hidecode) {
        $(this.runButton).attr('disabled', 'disabled');
        butt = document.createElement("button");
        $(butt).addClass("ac_opt btn btn-default");
        $(butt).text($.i18n("msg_activecode_show_code"));
        $(butt).css("margin-left", "10px");
        $(butt).attr("type","button")
        this.showHideButt = butt;
        ctrlDiv.appendChild(butt);
        $(butt).click( (function() {
            $(this.codeDiv).toggle();
            if (this.historyScrubber == null) {
                this.addHistoryScrubber(true);
            } else {
                $(this.historyScrubber.parentElement).toggle();
            }
            if ($(this.showHideButt).text() == $.i18n("msg_activecode_show_code")) {
                $(this.showHideButt).text($.i18n("msg_activecode_hide_code"));
            } else {
                $(this.showHideButt).text($.i18n("msg_activecode_show_code"));
            }
            if ($(this.runButton).attr('disabled')) {
                $(this.runButton).removeAttr('disabled');
            } else {
                $(this.runButton).attr('disabled', 'disabled');
            }
        }).bind(this));
    }

    // CodeLens
    if ($(this.origElem).data("codelens") && ! this.graderactive) {
        butt = document.createElement("button");
        $(butt).addClass("ac_opt btn btn-default");
        $(butt).text($.i18n("msg_activecode_show_codelens"));
        $(butt).css("margin-left", "10px");
        this.clButton = butt;
        ctrlDiv.appendChild(butt);
        $(butt).click(this.showCodelens.bind(this));
    }

    // TIE
    if(this.tie) {
        butt = document.createElement("button");
        $(butt).addClass("ac_opt btn btn-default");
        $(butt).text("Open Code Coach");
        this.tieButt = butt;
        ctrlDiv.appendChild(butt);
        $(butt).click(this.showTIE.bind(this))
    }
    // CodeCoach
    // bnm - disable code coach until it is revamped  2017-7-22
    // if (this.useRunestoneServices && $(this.origElem).data("coach")) {
    //     butt = document.createElement("button");
    //     $(butt).addClass("ac_opt btn btn-default");
    //     $(butt).text("Code Coach");
    //     $(butt).css("margin-left", "10px");
    //     this.coachButton = butt;
    //     ctrlDiv.appendChild(butt);
    //     $(butt).click(this.showCodeCoach.bind(this));
    // }

    // Audio Tour
    if ($(this.origElem).data("audio")) {
        butt = document.createElement("button");
        $(butt).addClass("ac_opt btn btn-default");
        $(butt).text($.i18n("msg_activecode_audio_tour"));
        $(butt).css("margin-left", "10px");
        this.atButton = butt;
        ctrlDiv.appendChild(butt);
        $(butt).click((function() {new AudioTour(this.divid, this.code, 1, $(this.origElem).data("audio"))}).bind(this));
    }

    if (eBookConfig.isInstructor) {
        let butt = document.createElement("button");
        $(butt).addClass("btn btn-info");
        $(butt).text("Share Code");
        $(butt).css("margin-left", "10px");
        this.shareButt = butt;
        ctrlDiv.appendChild(butt);
        $(butt).click((function() {
             let data = {
                 divid: this.divid,
                 code: this.editor.getValue(),
                 lang: this.language,
             };
             $.post('/runestone/ajax/broadcast_code.json',
                data,
                function (status) {
                    if (status.mess === 'success') {
                        alert(`Shared Code with ${status.share_count} students`);
                    } else {
                        alert("Sharing Failed");
                    }

                }, 'json');
                }).bind(this));
    }

    if (this.enablePartner) {
        var checkPartner = document.createElement("input");
        checkPartner.type = 'checkbox'
        checkPartner.id = `${this.divid}_part`
        ctrlDiv.appendChild(checkPartner);
        var plabel = document.createElement('label');
        plabel.for = `${this.divid}_part`;
        $(plabel).text("Pair?");
        ctrlDiv.appendChild(plabel);
        $(checkPartner).click((function () {
            if (this.partner) {
                this.partner = false;
                $(partnerTextBox).hide()
                this.partner = ''
                partnerTextBox.value = ''
                $(plabel).text("Pair?");
            } else {
                let didAgree = localStorage.getItem("partnerAgree")
                if( ! didAgree) {
                    didAgree = confirm("Pair Programming should only be used with the consent of your instructor." +
                      "Your partner must be a registered member of the class and have agreed to pair with you." +
                      "By clicking OK you certify that both of these conditions have been met."
                      );
                    if (didAgree) {
                        localStorage.setItem("partnerAgree", "true");
                    } else {
                        return;
                    }
                }
                this.partner = true;
                $(plabel).text('with: ');
                $(partnerTextBox).show();
            }
        }).bind(this))
        var partnerTextBox = document.createElement("input")
        partnerTextBox.type = 'text'
        ctrlDiv.appendChild(partnerTextBox);
        $(partnerTextBox).hide()
        $(partnerTextBox).change((function () {
            this.partner = partnerTextBox.value;
        }).bind(this))
    }

    if(this.chatcodes && eBookConfig.enable_chatcodes) {
        var chatBar = document.createElement("div");
        var channels = document.createElement("span");
        var topic = window.location.host+'-'+this.divid;
        ctrlDiv.appendChild(chatBar);
        $(chatBar).text("Chat: ");
        $(chatBar).append(channels);
        butt = document.createElement("a");
        $(butt).addClass("ac_opt btn btn-default");
        $(butt).text("Create Channel");
        $(butt).css("margin-left","10px");
        $(butt).attr("type","button")
        $(butt).attr("target","_blank")
        $(butt).attr("href", 'http://'+chatcodesServer+"/new?"+$.param({
            topic: window.location.host+'-'+this.divid,
            code: this.editor.getValue(),
            lang: 'Python'
        }));
        this.chatButton = butt;
        chatBar.appendChild(butt);
        var updateChatCodesChannels = function() {
            var data = doc.data;
            var i = 1;
            $(channels).html('');
            data['channels'].forEach(function(channel) {
                if(!channel.archived && topic === channel.topic) {
                    var link = $('<a />');
                    var href = 'http://'+chatcodesServer+"/"+channel.channelName;
                    link.attr({
                        'href': href,
                        'target': '_blank'
                    });
                    link.text(' ' + channel.channelName + '('+i+') ');
                    $(channels).append(link);
                    i++;
                }
            });
            if(i===1) {
                $(channels).text('(no active converstations on this problem)');
            }
        };
        doc.subscribe(updateChatCodesChannels);
        doc.on('op', updateChatCodesChannels);
    }


    $(this.outerDiv).prepend(ctrlDiv);
    this.controlDiv = ctrlDiv;

};

ActiveCode.prototype.enableSaveLoad = function () {
    $(this.runButton).text($.i18n("msg_activecode_save_run"));
};

// Activecode -- If the code has not changed wrt the scrubber position value then don't save the code or reposition the scrubber
//  -- still call runlog, but add a parameter to not save the code
// add an initial load history button
// if there is no edit then there is no append   to_save (True/False)

ActiveCode.prototype.addHistoryScrubber = function (pos_last) {

    var data = {acid: this.divid};
    var deferred = jQuery.Deferred();

    if (this.sid !== undefined) {
        data['sid'] = this.sid;
    }
    console.log("before get hist");
    var helper = function() {
        console.log("making a new scrubber");
        var scrubberDiv = document.createElement("div");
        $(scrubberDiv).css("display","inline-block");
        $(scrubberDiv).css("margin-left","10px");
        $(scrubberDiv).css("margin-right","10px");
        $(scrubberDiv).css({"min-width": "200px",
            "max-width": "300px"});
        var scrubber = document.createElement("div");
        this.timestampP = document.createElement("span");
        this.slideit = function() {
            this.editor.setValue(this.history[$(scrubber).slider("value")]);
            var curVal = this.timestamps[$(scrubber).slider("value")];
            let pos = $(scrubber).slider("value");
            let outOf = this.history.length;
            $(this.timestampP).text(`${curVal} - ${pos+1} of ${outOf}`);
            this.logBookEvent({'event': 'activecode', 'act': 'slide:'+curVal, 'div_id': this.divid})
        };
        $(scrubber).slider({
            max: this.history.length-1,
            value: this.history.length-1,
        });
        $(scrubber).css('margin','10px');
        $(scrubber).on("slide",this.slideit.bind(this));
        $(scrubber).on("slidechange",this.slideit.bind(this));
        scrubberDiv.appendChild(scrubber);
        scrubberDiv.appendChild(this.timestampP);
        // If there is a deadline set then position the scrubber at the last submission
        // prior to the deadline
        if (this.deadline) {
            let i = 0;
            let done = false;
            while (i < this.history.length && ! done) {
                if ((new Date(this.timestamps[i])) > this.deadline) {
                    done = true;
                } else {
                    i += 1
                }
            }
            i = i - 1;
            scrubber.value = Math.max(i,0);
            this.editor.setValue(this.history[scrubber.value]);
            $(scrubber).slider('value', scrubber.value);
        }
        else if (pos_last) {
            scrubber.value = this.history.length-1;
            this.editor.setValue(this.history[scrubber.value]);
        } else {
            scrubber.value = 0;
        }
        let pos = $(scrubber).slider("value");
        let outOf = this.history.length;
        let ts = this.timestamps[$(scrubber).slider("value")];
        $(this.timestampP).text(`${ts} - ${pos+1} of ${outOf}`);
        $(this.histButton).remove();
        this.histButton = null;
        this.historyScrubber = scrubber;
        $(scrubberDiv).insertAfter(this.runButton);
        deferred.resolve();
    }.bind(this)
    if (eBookConfig.practice_mode){
        helper();
        }
    else{
        jQuery.getJSON(eBookConfig.ajaxURL + 'gethist.json', data, function(data, status, whatever) {
            if (data.history !== undefined) {
                this.history = this.history.concat(data.history);
                for (t in data.timestamps) {
                    this.timestamps.push( (new Date(data.timestamps[t])).toLocaleString() )
                }
            }
        }.bind(this))
            .always(helper); // For an explanation, please look at https://stackoverflow.com/questions/336859/var-functionname-function-vs-function-functionname
        }
    return deferred;
};


ActiveCode.prototype.createOutput = function () {
    // Create a parent div with two elements:  pre for standard output and a div
    // to hold turtle graphics output.  We use a div in case the turtle changes from
    // using a canvas to using some other element like svg in the future.
    var outDiv = document.createElement("div");
    $(outDiv).addClass("ac_output col-md-12");
    this.outDiv = outDiv;
    this.output = document.createElement('pre');
    this.output.id = this.divid+'_stdout';
    $(this.output).css("visibility","hidden");

    this.graphics = document.createElement('div');
    this.graphics.id = this.divid + "_graphics";
    $(this.graphics).addClass("ac-canvas");
    // This bit of magic adds an event which waits for a canvas child to be created on our
    // newly created div.  When a canvas child is added we add a new class so that the visible
    // canvas can be styled in CSS.  Which a the moment means just adding a border.
    $(this.graphics).on("DOMNodeInserted", 'canvas', (function(e) {
        $(this.graphics).addClass("visible-ac-canvas");
    }).bind(this));

    var clearDiv = document.createElement("div");
    $(clearDiv).css("clear","both");  // needed to make parent div resize properly
    this.outerDiv.appendChild(clearDiv);

    outDiv.appendChild(this.output);
    outDiv.appendChild(this.graphics);
    this.outerDiv.appendChild(outDiv);


    var lensDiv = document.createElement("div");
    $(lensDiv).addClass("col-md-12");
    $(lensDiv).css("display","none");
    this.codelens = lensDiv;
    this.outerDiv.appendChild(lensDiv);

    var coachDiv = document.createElement("div");
    $(coachDiv).addClass("col-md-12");
    $(coachDiv).css("display","none");
    this.codecoach = coachDiv;
    this.outerDiv.appendChild(coachDiv);


    var clearDiv = document.createElement("div");
    $(clearDiv).css("clear","both");  // needed to make parent div resize properly
    this.outerDiv.appendChild(clearDiv);

};

ActiveCode.prototype.disableSaveLoad = function() {
    $(this.saveButton).addClass('disabled');
    $(this.saveButton).attr('title','Login to save your code');
    $(this.loadButton).addClass('disabled');
    $(this.loadButton).attr('title','Login to load your code');
};

var languageExtensions = { python:     'py',
                           html:       'html',
                           javascript: 'js',
                           java:       'java',
                           python2:    'py',
                           python3:    'py',
                           cpp:        'cpp',
                           c:          'c'};

ActiveCode.prototype.downloadFile = function (lang) {
  var fnb = this.divid;
  var d = new Date();
  var fileName = fnb + '_' + d.toJSON()
                              .substring(0,10) // reverse date format
                              .split('-')
                              .join('') + '.' + languageExtensions[lang];
  var code = this.editor.getValue();

  if ('Blob' in window) {
      var textToWrite = code.replace(/\n/g, '\r\n');
      var textFileAsBlob = new Blob([textToWrite], { type: 'text/plain' });

      if ('msSaveOrOpenBlob' in navigator) {
        navigator.msSaveOrOpenBlob(textFileAsBlob, fileName);
      } else {
        var downloadLink = document.createElement('a');
        downloadLink.download = fileName;
        downloadLink.innerHTML = 'Download File';
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.style.display = 'none';
        document.body.appendChild(downloadLink);
        downloadLink.click();
      }
  } else {
    alert('Your browser does not support the HTML5 Blob.');
  }
};




ActiveCode.prototype.loadEditor = function () {
    var loadEditor = (function (data, status, whatever) {
        // function called when contents of database are returned successfully
        var res = eval(data)[0];
        if (res.source) {
            this.editor.setValue(res.source);
            setTimeout(function() {
                this.editor.refresh();
            }.bind(this),500);
            $(this.loadButton).tooltip({'placement': 'bottom',
                             'title': $.i18n("msg_activecode_loaded_code"),
                             'trigger': 'manual'
                            });
        } else {
            $(this.loadButton).tooltip({'placement': 'bottom',
                             'title': $.i18n("msg_activecode_no_saved_code"),
                             'trigger': 'manual'
                            });
        }
        $(this.loadButton).tooltip('show');
        setTimeout(function () {
            $(this.loadButton).tooltip('destroy')
        }.bind(this), 4000);
    }).bind(this);

    var data = {acid: this.divid};
    if (this.sid !== undefined) {
        data['sid'] = this.sid;
    }
    // This function needs to be chainable for when we want to do things like run the activecode
    // immediately after loading the previous input (such as in a timed exam)
    var dfd = jQuery.Deferred();
    this.logBookEvent({'event': 'activecode', 'act': 'load', 'div_id': this.divid}); // Log the run event
    jQuery.get(eBookConfig.ajaxURL + 'getprog', data, loadEditor).done(function () {dfd.resolve();});
    return dfd;

};

ActiveCode.prototype.createGradeSummary = function () {
    // get grade and comments for this assignment
    // get summary of all grades for this student
    // display grades in modal window
    var showGradeSummary = function (data, status, whatever) {
        var report = eval(data)[0];
        // check for report['message']
        if (report) {
            if (report['version'] == 2){
                // new version; would be better to embed this in HTML for the activecode
                var body = "<h4>Grade Report</h4>" +
                       "<p>This question: " + report['grade'] + " out of " + report['max'] + "</p>" +
                       "<p>" + report['comment'] + "</p>"
            }
            else{
                var body = "<h4>Grade Report</h4>" +
                       "<p>This assignment: " + report['grade'] + "</p>" +
                       "<p>" + report['comment'] + "</p>" +
                       "<p>Number of graded assignments: " + report['count'] + "</p>" +
                       "<p>Average score: " +  report['avg'] + "</p>"
            }

        } else {
            body = "<h4>The server did not return any grade information</h4>";
        }
        var html = '<div class="modal fade">' +
            '  <div class="modal-dialog compare-modal">' +
            '    <div class="modal-content">' +
            '      <div class="modal-header">' +
            '        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
            '        <h4 class="modal-title">Assignment Feedback</h4>' +
            '      </div>' +
            '      <div class="modal-body">' +
            body +
            '      </div>' +
            '    </div>' +
            '  </div>' +
            '</div>';

        var el = $(html);
        el.modal();
    };
    var data = {'div_id': this.divid};
    jQuery.get(eBookConfig.ajaxURL + 'getassignmentgrade', data, showGradeSummary);
};

ActiveCode.prototype.hideCodelens = function (button, div_id) {
    this.codelens.style.display = 'none'
};

ActiveCode.prototype.showCodelens = function () {

    if (this.codelens.style.display == 'none') {
        this.codelens.style.display = 'block';
        this.clButton.innerText = $.i18n("msg_activecode_hide_codelens");
    } else {
        this.codelens.style.display = "none";
        this.clButton.innerText = $.i18n("msg_activecode_show_in_codelens");
        return;
    }

    var cl = this.codelens.firstChild;
    if (cl) {
        this.codelens.removeChild(cl)
    }
    var code = this.buildProg(false);
    var myVars = {};
    myVars.code = code;
    myVars.origin = "opt-frontend.js";
    myVars.cumulative = false;
    myVars.heapPrimitives = false;
    myVars.drawParentPointers = false;
    myVars.textReferences = false;
    myVars.showOnlyOutputs = false;
    myVars.rawInputLstJSON = JSON.stringify([]);
    if (this.language == 'python') {
        if (this.python3) {
            myVars.py = 3;
        } else {
            myVars.py = 2;
        }
    } else if (this.langauge == 'javascript') {
        myVars.py = 'js'
    } else {
        myVars.py = this.language;
    }

    myVars.curInstr = 0;
    myVars.codeDivWidth = 350;
    myVars.codeDivHeight = 400;
    var srcURL = '//pythontutor.com/iframe-embed.html';
    var embedUrlStr = $.param.fragment(srcURL, myVars, 2 /* clobber all */);
    var myIframe = document.createElement('iframe');
    myIframe.setAttribute("id", this.divid + '_codelens');
    myIframe.setAttribute("width", "800");
    myIframe.setAttribute("height", "500");
    myIframe.setAttribute("style", "display:block");
    myIframe.style.background = '#fff';
    //myIframe.setAttribute("src",srcURL)
    myIframe.src = embedUrlStr;
    this.codelens.appendChild(myIframe);
    this.logBookEvent({
        'event': 'codelens',
        'act': 'view',
        'div_id': this.divid
    });

};

// <iframe id="%(divid)s_codelens" width="800" height="500" style="display:block"src="#">
// </iframe>


ActiveCode.prototype.showCodeCoach = function () {
    var myIframe;
    var srcURL;
    var cl;
    var div_id = this.divid;
    if (this.codecoach === null) {
        this.codecoach = document.createElement("div");
        this.codecoach.style.display = 'block'
    }

    cl = this.codecoach.firstChild;
    if (cl) {
        this.codecoach.removeChild(cl)
    }

    srcURL = eBookConfig.app + '/admin/diffviewer?divid=' + div_id;
    myIframe = document.createElement('iframe');
    myIframe.setAttribute("id", div_id + '_coach');
    myIframe.setAttribute("width", "800px");
    myIframe.setAttribute("height", "500px");
    myIframe.setAttribute("style", "display:block");
    myIframe.style.background = '#fff';
    myIframe.style.width = "100%";
    myIframe.src = srcURL;
    this.codecoach.appendChild(myIframe);
    $(this.codecoach).show();
    this.logBookEvent({
        'event': 'coach',
        'act': 'view',
        'div_id': this.divid
    });
};

ActiveCode.prototype.showTIE = function() {
    var tieDiv = document.createElement("div");
    $(this.tieButt).attr("disabled","disabled");
    $(tieDiv).addClass("tie-container");
    $(tieDiv).data("tie-id", this.divid)
    var ifm = document.createElement('iframe')
    $(ifm).addClass("tie-frame")
    ifm.src = `https://tech-interview-exercises.appspot.com/client/question.html?qid=${this.tie}`

    setIframeDimensions = function() {
        $('.tie-container').css('width', $('.tie-container').parent().width());
    //    $('.tie-frame').css('width', $('.tie-frame').parent().width() - 120);
    };
    ifm.onload = setIframeDimensions;

    $(function() {
        $(window).resize(setIframeDimensions);
      });

    window.addEventListener('message', (function(evt) {
        if (evt.origin != 'https://tech-interview-exercises.appspot.com') {
          return;
        }
        // Handle the event accordingly.
        // evt.data contains the code
        this.logRunEvent({
            'div_id': this.divid,
            'code': JSON.parse(evt.data),
            'lang': this.language,
            'errinfo': 'TIEresult',
            'to_save': true,
            'prefix': this.pretext,
            'suffix': this.suffix
        });
      }).bind(this), false)

    this.logBookEvent({'event': 'tie', 'act': 'open', 'div_id': this.divid});
    tieDiv.appendChild(ifm)
    this.outerDiv.appendChild(tieDiv)
}

ActiveCode.prototype.toggleEditorVisibility = function () {

};

ActiveCode.prototype.addErrorMessage = function (err) {
    // Add the error message
    var errHead = $('<h3>').html('Error');
    this.eContainer = this.outerDiv.appendChild(document.createElement('div'));
    this.eContainer.className = 'error alert alert-danger';
    this.eContainer.id = this.divid + '_errinfo';
    this.eContainer.appendChild(errHead[0]);
    var errText = this.eContainer.appendChild(document.createElement('pre'));

    // But, adjust the line numbers.  If the line number is <= pretextLines then it is in included code
    // if it is greater than the number of included lines but less than the pretext + current editor then it is in the student code.
    // adjust the line number we display by eliminating the pre-included code.
    if (err.traceback.length >= 1) {
        errorLine = err.traceback[0].lineno;
        if (errorLine <= this.pretextLines){
            errText.innerHTML = "An error occurred in the hidden, included code. Sorry we can't give you a more helpful error message";
            return;
        }
        else if (errorLine > (this.progLines + this.pretextLines)) {
            errText.innerHTML = "An error occurred after the end of your code. One possible reason is that you have an unclosed parenthesis or string. Another possibility is that there is an error in the hidden test code.";
            return;
        }
        else {
            if (this.pretextLines > 0) {
                err.traceback[0].lineno = err.traceback[0].lineno - this.pretextLines + 1;
            }
        }
    }
    var errString = err.toString();
    var to = errString.indexOf(":");
    var errName = errString.substring(0, to);
    errText.innerHTML = errString;
    $(this.eContainer).append('<h3>Description</h3>');
    var errDesc = this.eContainer.appendChild(document.createElement('p'));
    errDesc.innerHTML = errorText[errName];
    $(this.eContainer).append('<h3>To Fix</h3>');
    var errFix = this.eContainer.appendChild(document.createElement('p'));
    errFix.innerHTML = errorText[errName + 'Fix'];
    var moreInfo = '../ErrorHelp/' + errName.toLowerCase() + '.html';
    //console.log("Runtime Error: " + err.toString());
};



var errorText = {};

errorText.ParseError = $.i18n("msg_sctivecode_parse_error");
errorText.ParseErrorFix = $.i18n( "msg_sctivecode_parse_error_fix");
errorText.TypeError = $.i18n("msg_activecode_type_error");
errorText.TypeErrorFix = $.i18n("msg_activecode_type_error_fix");
errorText.NameError = $.i18n("msg_activecode_name_error");
errorText.NameErrorFix = $.i18n("msg_activecode_name_error_fix");
errorText.ValueError = $.i18n("msg_activecode_value_error");
errorText.ValueErrorFix = $.i18n("msg_activecode_value_error_fix");
errorText.AttributeError = $.i18n("msg_activecode_attribute_error");
errorText.AttributeErrorFix = $.i18n("msg_activecode_attribute_error_fix");
errorText.TokenError = $.i18n("msg_activecode_token_error");
errorText.TokenErrorFix =  $.i18n("msg_activecode_token_error_fix");
errorText.TimeLimitError = $.i18n("msg_activecode_time_limit_error");
errorText.TimeLimitErrorFix = $.i18n("msg_activecode_time_limit_error_fix");
errorText.Error = $.i18n("msg_activecode_general_error");
errorText.ErrorFix = $.i18n("msg_activecode_general_error_fix");
errorText.SyntaxError = $.i18n("msg_activecode_syntax_error");
errorText.SyntaxErrorFix = $.i18n("msg_activecode_syntax_error_fix");
errorText.IndexError = $.i18n("msg_activecode_index_error");
errorText.IndexErrorFix = $.i18n("msg_activecode_index_error_fix");
errorText.URIError = $.i18n("msg_activecode_uri_error");
errorText.URIErrorFix = $.i18n("msg_activecode_uri_error_fix");
errorText.ImportError = $.i18n("msg_activecode_import_error");
errorText.ImportErrorFix = $.i18n("msg_activecode_import_error_fix");
errorText.ReferenceError = $.i18n("msg_activecode_reference_error");
errorText.ReferenceErrorFix = $.i18n("msg_activecode_reference_error_fix");
errorText.ZeroDivisionError = $.i18n("msg_activecode_zero_division_error");
errorText.ZeroDivisionErrorFix = $.i18n("msg_activecode_zero_division_error_fix");
errorText.RangeError = $.i18n("msg_activecode_range_error");
errorText.RangeErrorFix = $.i18n("msg_activecode_range_error_fix");
errorText.InternalError = $.i18n("msg_activecode_internal_error");
errorText.InternalErrorFix = $.i18n("msg_activecode_internal_error_fix");
errorText.IndentationError = $.i18n("msg_activecode_indentation_error");
errorText.IndentationErrorFix = $.i18n("msg_activecode_indentation_error_fix");
errorText.NotImplementedError = $.i18n("msg_activecode_not_implemented_error");
errorText.NotImplementedErrorFix = $.i18n("msg_activecode_not_implemented_error_fix");
errorText.KeyError = $.i18n("msg_activecode_key_error");
errorText.KeyErrorFix = $.i18n("msg_activecode_key_error_fix");

ActiveCode.prototype.addJSONLibrary = function () {
    var jsonExternalLibInfo = {
            path : eBookConfig.app + '/static/' + eBookConfig.course + '/_static/json.sk-master/__init__.js',
            dependencies : [
                eBookConfig.app + '/static/' + eBookConfig.course + '/_static/json.sk-master/stringify.js'
            ]
        };
    if (Sk.externalLibraries) {
        Sk.externalLibraries.json = jsonExternalLibInfo;
    } else {
        Sk.externalLibraries = {
            json: jsonExternalLibInfo
        };
    }
};

ActiveCode.prototype.setTimeLimit = function (timer) {
    var timelimit = this.timelimit;
    if (timer !== undefined ) {
        timelimit = timer
    }
    // set execLimit in milliseconds  -- for student projects set this to
    // 25 seconds -- just less than Chrome's own timer.
    if (this.code.indexOf('ontimer') > -1 ||
        this.code.indexOf('onclick') > -1 ||
        this.code.indexOf('onkey') > -1  ||
        this.code.indexOf('setDelay') > -1 ) {
        Sk.execLimit = null;
    } else {
        if (timelimit === "off") {
            Sk.execLimit = null;
        } else if (timelimit) {
            Sk.execLimit = timelimit;
        } else {
            Sk.execLimit = 25000;
        }
    }

};

ActiveCode.prototype.builtinRead = function (x) {
        if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
            throw $.i18n("msg_activecode_file_not_found",x);
        return Sk.builtinFiles["files"][x];
};

ActiveCode.prototype.fileReader = function(divid) {
    let elem = document.getElementById(divid);
    let data = ""
    let result = ""
    if (elem == null && Sk.builtinFiles.files.hasOwnProperty(divid)) {
        return Sk.builtinFiles["files"][divid];
    } else {
        // try remote file unless it ends with .js or .py -- otherwise we'll ask the server for all
        // kinds of modules that we are trying to import
        if ( ! (divid.endsWith('.js') || divid.endsWith('.py')) ) {
            $.ajax({async: false,
                    url: `/runestone/ajax/get_datafile?course_id=${eBookConfig.course}&acid=${divid}`,
                    success: function(data) {
                        result = JSON.parse(data).data;
                        },
                    error: function(err) {
                        result = null;
                        }})
            if (result) {
                return result
            }
        }
    }
    if (elem == null && result === null) {
        throw new Sk.builtin.IOError($.i18n("msg_activecode_no_file_or_dir",divid));
    } else {
        if (elem.nodeName.toLowerCase() == "textarea") {
            data = elem.value;
        } else {
            data = elem.textContent;
        }
    }
    return data;
}

ActiveCode.prototype.outputfun = function(text) {
    // bnm python 3
    pyStr = function(x) {
        if (x instanceof Array) {
            return '[' + x.join(", ") + ']';
        } else {
            return x
        }
    };

    var x = text;
    if (! this.python3 ) {
        if (x.charAt(0) == '(') {
            x = x.slice(1, -1);
            x = '[' + x + ']';
            try {
                var xl = eval(x);
                xl = xl.map(pyStr);
                x = xl.join(' ');
            } catch (err) {
            }
        }
    }
    $(this.output).css("visibility","visible");
    text = x;
    text = text.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br/>");
        $(this.output).append(text);
    };

ActiveCode.prototype.filewriter = function(fobj, bytes) {
    let filecomponent = document.getElementById(fobj.name);
    if (! filecomponent) {
        let container = document.createElement('div')
        $(container).addClass('runestone')
        let tab = document.createElement('div');
        $(tab).addClass('datafile_caption');
        tab.innerHTML = `Data file: <code>${fobj.name}</code>`;
        filecomponent = document.createElement('textarea')
        filecomponent.rows = 10;
        filecomponent.cols = 50;
        filecomponent.id = fobj.name;
        $(filecomponent).css('margin-bottom','5px');
        $(filecomponent).addClass('ac_output');
        container.appendChild(tab);
        container.appendChild(filecomponent);
        this.outerDiv.appendChild(container)
    } else {
        if (fobj.pos$ == 0) {
            $(filecomponent).val("")
        }
    }

    let current = $(filecomponent).val()
    current = current + bytes.v;
    $(filecomponent).val(current);
    $(filecomponent).css('display', 'block');
    fobj.pos$ = current.length;

    return current.length;
}

ActiveCode.prototype.getIncludedCode = function(divid) {
    var wresult;
    if(edList[divid]) {
        return edList[divid].editor.getValue();
    } else {
        wresult = $.ajax({
            async: false,
            url: `/runestone/ajax/get_datafile?course_id=${eBookConfig.course}&acid=${divid}`,
            success: function(data) {
                result = JSON.parse(data).data;
                },
            error: function(err) {
                result = null;
            }})

        return result;
    }
}


ActiveCode.prototype.buildProg = function(useSuffix) {
    // assemble code from prefix, suffix, and editor for running.
    var pretext;
    var prog = this.editor.getValue() + "\n";
    this.pretext = "";
    this.pretextLines = 0
    this.progLines = prog.match(/\n/g).length + 1

    if (this.includes !== undefined) {
        // iterate over the includes, in-order prepending to prog

        pretext = "";
        for (var x=0; x < this.includes.length; x++) {
            let iCode = this.getIncludedCode(this.includes[x]);
            pretext = pretext + iCode + "\n";
        }
        this.pretext = pretext;
        if(this.pretext) {
            this.pretextLines = (this.pretext.match(/\n/g) || '').length
        }
        prog = pretext + prog
    }

    if(useSuffix && this.suffix) {
        prog = prog + this.suffix;
}

    return prog;
};

ActiveCode.prototype.manage_scrubber = function (scrubber_dfd, history_dfd, saveCode) {
    if (this.historyScrubber === null && !this.autorun) {
        scrubber_dfd = this.addHistoryScrubber();
    } else {
        scrubber_dfd = jQuery.Deferred();
        scrubber_dfd.resolve();
    }

    history_dfd = jQuery.Deferred();
    scrubber_dfd.done((function () {
        if (this.historyScrubber && (this.history[$(this.historyScrubber).slider("value")] != this.editor.getValue())) {
            saveCode = "True";
            this.history.push(this.editor.getValue());
            this.timestamps.push((new Date()).toLocaleString());
            $(this.historyScrubber).slider("option", "max", this.history.length - 1);
            $(this.historyScrubber).slider("option", "value", this.history.length - 1);
            this.slideit();
        } else {
            saveCode = "False";
        }

        if (this.historyScrubber == null) {
            saveCode = "False";
        }
        history_dfd.resolve();
    }).bind(this))
        .fail(function () {
            console.log("Scrubber deferred failed - this should not happen");
            history_dfd.resolve();
        });
    return {history_dfd: history_dfd, saveCode: saveCode};
};


ActiveCode.prototype.runProg = function () {
    var prog = this.buildProg(true);
    var saveCode = "True";
    var scrubber_dfd, history_dfd, skulpt_run_dfd;
    $(this.output).text('');

    $(this.eContainer).remove();
    if (this.codelens) {
        this.codelens.style.display = 'none';
    }
    if (this.clButton) {
        this.clButton.innerText = $.i18n("msg_activecode_show_in_codelens");
    }
    Sk.configure({
        output: this.outputfun.bind(this),
        read: this.fileReader,
        filewrite: this.filewriter.bind(this),
        __future__: Sk.python3,
        nonreadopen : true,
//        python3: this.python3,
        imageProxy: 'http://image.runestone.academy:8080/320x',
        inputfunTakesPrompt: true,
        jsonpSites : ['https://itunes.apple.com'],
    });
    Sk.divid = this.divid;
    this.setTimeLimit();
    (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = this.graphics;
    Sk.canvas = this.graphics.id; //todo: get rid of this here and in image
    $(this.runButton).attr('disabled', 'disabled');
    $(this.historyScrubber).off("slidechange");
    $(this.historyScrubber).slider("disable");
    $(this.outDiv).show({duration: 700, queue: false});

    var __ret = this.manage_scrubber(scrubber_dfd, history_dfd, saveCode);
    history_dfd = __ret.history_dfd;
    saveCode = __ret.saveCode;


    skulpt_run_dfd = Sk.misceval.asyncToPromise(function () {

        return Sk.importMainWithBody("<stdin>", false, prog, true);
    });

    // Make sure that the history scrubber is fully initialized AND the code has been run
    // before we start logging stuff.
    var self = this;

    Promise.all([skulpt_run_dfd, history_dfd]).then((function (mod) { // success
            $(this.runButton).removeAttr('disabled');
            if (this.slideit) {
                $(this.historyScrubber).on("slidechange", this.slideit.bind(this));
            }
            $(this.historyScrubber).slider("enable");
            this.logRunEvent({
                'div_id': this.divid,
                'code': this.editor.getValue(),
                'lang': this.language,
                'errinfo': 'success',
                'to_save': saveCode,
                'prefix': this.pretext,
                'suffix': this.suffix,
                'partner': this.partner
            }); // Log the run event
        }).bind(this),
        (function (err) {  // fail
            history_dfd.done(function () {
                $(self.runButton).removeAttr('disabled');
                $(self.historyScrubber).on("slidechange", self.slideit.bind(self));
                $(self.historyScrubber).slider("enable");
                self.logRunEvent({
                    'div_id': self.divid,
                    'code': self.editor.getValue(),
                    'lang': this.langauge,
                    'errinfo': err.toString(),
                    'to_save': saveCode,
                    'prefix': self.pretext,
                    'suffix': self.suffix,
                    'partner': this.partner,
                }); // Log the run event
                self.addErrorMessage(err)
            });
        }));

    if (typeof(allVisualizers) != "undefined") {
        $.each(allVisualizers, function (i, e) {
            e.redrawConnectors();
        });
    }

};




JSActiveCode.prototype = new ActiveCode();

function JSActiveCode(opts) {
    if (opts) {
        this.init(opts)
        }
    }

JSActiveCode.prototype.init = function(opts) {
    ActiveCode.prototype.init.apply(this,arguments)
    };

JSActiveCode.prototype.outputfun = function (a) {
    $(this.output).css("visibility","visible");
    var str = "[";
    if (typeof(a) == "object" && a.length) {
        for (var i = 0; i < a.length; i++)
            if (typeof(a[i]) == "object" && a[i].length) {
                str += (i == 0 ? "" : " ") + "[";
                for (var j = 0; j < a[i].length; j++)
                    str += a[i][j] + (j == a[i].length - 1 ?
                    "]" + (i == a.length - 1 ? "]" : ",") + "\n" : ", ");
            } else str += a[i] + (i == a.length - 1 ? "]" : ", ");
        } else {
    try {
            str = JSON.stringify(a);
    } catch (e) {
            str = a;
    }
    }
    return str;
};

JSActiveCode.prototype.runProg = function() {
    var _this = this;
    var prog = this.buildProg(true);
    var einfo;
    var scrubber_dfd, history_dfd;
    var saveCode = "True";


    var write = function(str) {
        _this.output.innerHTML += _this.outputfun(str);
    };

    var writeln = function(str) {
        if (!str) str="";
        _this.output.innerHTML += _this.outputfun(str)+"<br />";
            };

    var __ret = this.manage_scrubber(scrubber_dfd, history_dfd, saveCode);
    history_dfd = __ret.history_dfd;
    saveCode = __ret.saveCode;

    $(this.eContainer).remove();
    $(this.output).text('');
    $(this.outDiv).show({duration:700,queue:false});

    try {
        eval(prog)
        einfo = "success";
    } catch(e) {
        this.addErrorMessage(e);
        einfo = e;
    }

    this.logRunEvent({
    'div_id': this.divid,
    'code': this.editor.getValue(),
    'errinfo': einfo,
    'lang': this.language,
    'to_save': saveCode,
    'prefix': this.pretext,
    'suffix': this.suffix,
    'partner': this.partner
    }); // Log the run event


};

HTMLActiveCode.prototype = new ActiveCode();

function HTMLActiveCode (opts) {
    if (opts) {
        this.init(opts);
    }
}

HTMLActiveCode.prototype.runProg = function () {
    var prog = this.buildProg(true);
    var scrubber_dfd, history_dfd, saveCode;
    var saveCode = "True"
    var __ret = this.manage_scrubber(scrubber_dfd, history_dfd, saveCode);
    history_dfd = __ret.history_dfd;
    saveCode = __ret.saveCode;

//    $('#'+myDiv+'_iframe').remove();
//    $('#'+myDiv+'_htmlout').show();
//    $('#'+myDiv+'_htmlout').append('<iframe class="activehtml" id="' + myDiv + '_iframe" srcdoc="' +
//        prog.replace(/"/g,"'") + '">' + '</iframe>');
    $(this.output).text('');
    if (! this.alignVertical ) {
        $(this.codeDiv).switchClass("col-md-12", "col-md-6", {duration: 500, queue: false});
    }
    $(this.outDiv).show({duration:700,queue:false});
    prog = "<script type=text/javascript>window.onerror = function(msg,url,line) {alert(msg+' on line: '+line);};</script>" + prog;
    this.output.srcdoc = prog;

    this.logRunEvent({
    'div_id': this.divid,
    'code': this.editor.getValue(),
    'errinfo': 'success',
    'to_save': saveCode,
    'prefix': this.pretext,
    'suffix': this.suffix,
    'lang': this.language,
    'partner': this.partner
    }); // Log the run event


};

HTMLActiveCode.prototype.init = function(opts) {
    opts.alignVertical = true;
    ActiveCode.prototype.init.apply(this,arguments);
    this.code = $('<textarea />').html(this.origElem.innerHTML).text();
    $(this.runButton).text('Render');
    this.editor.setValue(this.code);
};

HTMLActiveCode.prototype.createOutput = function () {
    this.alignVertical = true;
    var outDiv = document.createElement("div");
    $(outDiv).addClass("ac_output");
    if(this.alignVertical) {
        $(outDiv).addClass("col-md-12");
    } else {
        $(outDiv).addClass("col-md-5");
    }
    this.outDiv = outDiv;
    this.output = document.createElement('iframe');
    $(this.output).css("background-color","white");
    $(this.output).css("position","relative");
    $(this.output).css("height","400px");
    $(this.output).css("width","100%");
    outDiv.appendChild(this.output);
    this.outerDiv.appendChild(outDiv);

    var clearDiv = document.createElement("div");
    $(clearDiv).css("clear","both");  // needed to make parent div resize properly
    this.outerDiv.appendChild(clearDiv);

};

HTMLActiveCode.prototype.enableSaveLoad = function () {
    $(this.runButton).text($.i18n("msg_activecode_render"));
};



String.prototype.replaceAll = function (target, replacement) {
    return this.split(target).join(replacement);
};

AudioTour.prototype = new RunestoneBase();

// function to display the audio tours
function AudioTour (divid, code, bnum, audio_text) {
    this.audio_tour = null;
    this.audio_code = null;
    this.windowcode = null;
    this.first_audio = null;
    this.prev_audio = null;
    this.pause_audio = null;
    this.next_audio = null;
    this.last_audio = null;
    this.status = null;
    this.stop_button = null;
    this.tourButtons = [];
    this.elem = null; // current audio element playing
    this.currIndex = null; // current index
    this.len = null; // current length of audio files for tour
    this.buttonCount = null; // number of audio tour buttons
    this.aname = null; // the audio file name
    this.ahash = null; // hash of the audio file name to the lines to highlight
    this.theDivid = null; // div id
    this.afile = null; // file name for audio
    this.playing = false; // flag to say if playing or not
    this.tourName = "";
    // Replacing has been done here to make sure special characters in the code are displayed correctly
    code = code.replaceAll("*doubleq*", "\"");
    code = code.replaceAll("*singleq*", "'");
    code = code.replaceAll("*open*", "(");
    code = code.replaceAll("*close*", ")");
    code = code.replaceAll("*nline*", "<br/>");
    var codeArray = code.split("\n");
    var audio_hash = [];
    var bval = [];
    var atype = audio_text.replaceAll("*doubleq*", "\"");
    var audio_type = atype.split("*atype*");
    for (var i = 0; i < audio_type.length - 1; i++) {
        audio_hash[i] = audio_type[i];
        var aword = audio_type[i].split(";");
        bval.push(aword[0]);
    }
    var first = "<pre><div id='" + divid + "_l1'>" + "1.   " + codeArray[0] + "</div>";
    var num_lines = codeArray.length;
    for (var i = 1; i < num_lines; i++) {
        if (i < 9) {
            first = first + "<div id='" + divid + "_l" + (i + 1) + "'>" + (i + 1) + ".   " + codeArray[i] + "</div>";
        }
        else if (i < 99) {
            first = first + "<div id='" + divid + "_l" + (i + 1) + "'>" + (i + 1) + ".  " + codeArray[i] + "</div>";
        }
        else {
            first = first + "<div id='" + divid + "_l" + (i + 1) + "'>" + (i + 1) + ". " + codeArray[i] + "</div>";
        }
    }
    first = first + "</pre>";

    //laying out the HTML content

    var bcount = 0;

    for (var i = 0; i < audio_type.length - 1; i++) {
        var newButton = document.createElement("button");
        newButton.className = "btn btn-success";
        newButton.innerHTML = bval[i].replace(/\"/g,"");
        this.tourButtons.push(newButton);
        bcount++;
    }
    this.audio_tour = document.createElement("div");
    this.audio_tour.align = "center";

    this.audio_code = document.createElement("p");

    this.windowcode = document.createElement("div");
    this.windowcode.align = "left";
    $(this.windowcode).html(first);

    this.first_audio = document.createElement("button");
    this.prev_audio = document.createElement("button");
    this.pause_audio = document.createElement("button");
    this.next_audio = document.createElement("button");
    this.last_audio = document.createElement("button");

    this.first_audio.className = "btn-default glyphicon glyphicon-fast-backward";
    this.prev_audio.className = "btn-default glyphicon glyphicon-step-backward";
    this.pause_audio.className = "btn-default glyphicon glyphicon-pause";
    this.next_audio.className = "btn-default glyphicon glyphicon-step-forward";
    this.last_audio.className = "btn-default glyphicon glyphicon-fast-forward";

    this.first_audio.setAttribute("style", "height: 22px; width: 25px; border-radius: 4px; margin-right:2px;");
    this.prev_audio.setAttribute("style", "height: 22px; width: 25px; border-radius: 4px; margin-right:2px;");
    this.pause_audio.setAttribute("style", "height: 22px; width: 25px; border-radius: 4px; margin-right:2px;");
    this.next_audio.setAttribute("style", "height: 22px; width: 25px; border-radius: 4px; margin-right:2px;");
    this.last_audio.setAttribute("style", "height: 22px; width: 25px; border-radius: 4px; margin-right:2px;");

    this.first_audio.name = "first_audio";
    this.prev_audio.name = "prev_audio";
    this.pause_audio.name = "pause_audio";
    this.next_audio.name = "next_audio";
    this.last_audio.name = "last_audio";

    this.first_audio.title = "Play first audio in tour";
    this.prev_audio.title = "Play previous audio in tour";
    this.pause_audio.title = "Pause current audio";
    this.next_audio.title = "Play next audio in tour";
    this.last_audio.title = "Play last audio in tour";

    this.first_audio.setAttribute("aria-label", "Play first audio in tour");
    this.prev_audio.setAttribute("aria-label", "Play previous audio in tour");
    this.pause_audio.setAttribute("aria-label", "Pause audio");
    this.next_audio.setAttribute("aria-label", "Play next audio in tour");
    this.last_audio.setAttribute("aria-label", "Play last audio in tour");

    this.first_audio.disabled = true;
    this.prev_audio.disabled = true;
    this.pause_audio.disabled = true;
    this.next_audio.disabled = true;
    this.last_audio.disabled = true;

    this.status = document.createElement("div");
    this.status.className = "alert alert-info";
    this.status.setAttribute("style", "display: none;");

    this.stop_button = document.createElement("button");
    this.stop_button.className = "btn btn-default";
    this.stop_button.innerHTML = "Stop tour";

    $(this.audio_tour).append(this.audio_code, this.windowcode, document.createElement("br"), this.first_audio, this.prev_audio, this.pause_audio, this.next_audio, this.last_audio, document.createElement("br"), this.status, document.createElement("br"), this.tourButtons, this.stop_button);
    $("#"+divid+" .ac_code_div").append(this.audio_tour);
    $("#"+divid+" .ac_code_div").css("width", "50%");
    $('#'+divid+' .CodeMirror.cm-s-default.ui-resizable').hide();
    $('#'+divid+' .ac_opt.btn.btn-default:last-child').hide();

    $(this.stop_button).click( (function () {
        if (this.playing) {
            this.elem.pause();
        }
        //log change to db
        this.logBookEvent({'event': 'Audio', 'act': 'closeWindow', 'div_id': divid});
        $(this.audio_tour).remove();
        $('#'+divid+' .CodeMirror.cm-s-default.ui-resizable').show();
        $('#'+divid+' .ac_opt.btn.btn-default:last-child').show();
        $("#"+divid+" .ac_code_div").css("width", "");
    }).bind(this));

    $(this.tourButtons[0]).click((function () {
        this.tour(divid, audio_hash[0], bcount);
    }).bind(this));
    $(this.tourButtons[1]).click((function () {
        this.tour(divid, audio_hash[1], bcount);
    }).bind(this));
    $(this.tourButtons[2]).click((function () {
        this.tour(divid, audio_hash[2], bcount);
    }).bind(this));
    $(this.tourButtons[3]).click((function () {
        this.tour(divid, audio_hash[3], bcount);
    }).bind(this));
    $(this.tourButtons[4]).click((function () {
        this.tour(divid, audio_hash[4], bcount);
    }).bind(this));

    // handle the click to go to the next audio
    $(this.first_audio).click((function () {
        this.firstAudio();
    }).bind(this));

    // handle the click to go to the next audio
    $(this.prev_audio).click((function () {
        this.prevAudio();
    }).bind(this));

    // handle the click to pause or play the audio
    $(this.pause_audio).click((function () {
        this.pauseAndPlayAudio(divid);
    }).bind(this));

    // handle the click to go to the next audio
    $(this.next_audio).click((function () {
        this.nextAudio();
    }).bind(this));

    // handle the click to go to the next audio
    $(this.last_audio).click((function () {
        this.lastAudio();
    }).bind(this));

    // make the image buttons look disabled
    $(this.first_audio).css('opacity', 0.25);
    $(this.prev_audio).css('opacity', 0.25);
    $(this.pause_audio).css('opacity', 0.25);
    $(this.next_audio).css('opacity', 0.25);
    $(this.last_audio).css('opacity', 0.25);
}

AudioTour.prototype.tour = function (divid, audio_type, bcount) {
    // set globals
    this.buttonCount = bcount;
    this.theDivid = divid;

    this.status.setAttribute("style", "display: inline-block; margin-top: 7px; margin-bottom: 3px;");

    // enable prev, pause/play and next buttons and make visible
    $(this.first_audio).removeAttr('disabled');
    $(this.prev_audio).removeAttr('disabled');
    $(this.pause_audio).removeAttr('disabled');
    $(this.next_audio).removeAttr('disabled');
    $(this.last_audio).removeAttr('disabled');

    $(this.first_audio).css('opacity', 1.0);
    $(this.prev_audio).css('opacity', 1.0);
    $(this.pause_audio).css('opacity', 1.0);
    $(this.next_audio).css('opacity', 1.0);
    $(this.last_audio).css('opacity', 1.0);

    // disable tour buttons
    for (var i = 0; i < bcount; i++)
        $(this.tourButtons[i]).attr('disabled', 'disabled');

    var atype = audio_type.split(";");
    var name = atype[0].replaceAll("\"", " ");
    this.tourName = name;
    $(this.status).html($.i18n("msg_activecode_starting", name));

    //log tour type to db
    this.logBookEvent({'event': 'Audio', 'act': name, 'div_id': divid});

    var max = atype.length;
    var str = "";
    this.ahash = [];
    this.aname = [];
    for (i = 1; i < max - 1; i++) {
        var temp = atype[i].split(":");
        var temp_line = temp[0];
        var temp_aname = temp[1];

        var akey = temp_aname.substring(1, temp_aname.length);
        var lnums = temp_line.substring(1, temp_line.length);

        //alert("akey:"+akey+"lnum:"+lnums);

        // str+="<audio id="+akey+" preload='auto'><source src='http://ice-web.cc.gatech.edu/ce21/audio/"+
        // akey+".mp3' type='audio/mpeg'><source src='http://ice-web.cc.gatech.edu/ce21/audio/"+akey+
        // ".ogg' type='audio/ogg'>Your browser does not support the audio tag</audio>";

        var dir = "http://media.interactivepython.org/" + eBookConfig.basecourse.toLowerCase() + "/audio/";
        //var dir = "../_static/audio/"
        str += "<audio id=" + akey + " preload='auto' >";
        str += "<source src='" + dir + akey + ".wav' type='audio/wav'>";
        str += "<source src='" + dir + akey + ".mp3' type='audio/mpeg'>";
        str += "<source src='" + dir + akey + ".wav' type='audio/wav'>";
        str += "<source src='" + dir + akey + ".mp3' type='audio/mpeg'>";
        str +=  "<br />Your browser does not support the audio tag</audio>";
        this.ahash[akey] = lnums;
        this.aname.push(akey);
    }
    $(this.audio_code).html(str);
    this.len = this.aname.length; // set the number of audio file in the tour

    this.currIndex = 0;
    this.playCurrIndexAudio();
};

AudioTour.prototype.handlePlaying = function() {
    this.elem.pause();
    // unbind current ended
    $('#' + this.afile).unbind('ended');
    // unhighlight the prev lines
    this.unhighlightLines(this.theDivid, this.ahash[this.aname[this.currIndex]]);
};

AudioTour.prototype.firstAudio = function () {

    // if audio is this.playing handle it
    this.handlePlaying();

    //log change to db
    this.logBookEvent({'event': 'Audio', 'act': 'first', 'div_id': this.theDivid});


    // move to the first audio
    this.currIndex = 0;

    // start at the first audio
    this.playCurrIndexAudio();

};

AudioTour.prototype.prevAudio = function () {

    // if there is a previous audio
    if (this.currIndex > 0) {

        // if audio is this.playing handle it
        this.handlePlaying();

        //log change to db
        this.logBookEvent({'event': 'Audio', 'act': 'prev', 'div_id': this.theDivid});


        // move to previous to the current (but the current index has moved to the next)
        this.currIndex = this.currIndex - 1;

        // start at the prev audio
        this.playCurrIndexAudio();
    }

};

AudioTour.prototype.nextAudio = function () {

    // if audio is this.playing handle it
    this.handlePlaying();

    //log change to db
    this.logBookEvent({'event': 'Audio', 'act': 'next', 'div_id': this.theDivid});

    // if not at the end
    if (this.currIndex < (this.len - 1)) {
        // start at the next audio
        this.currIndex = this.currIndex + 1;
        this.playCurrIndexAudio();
    }
    else if (this.currIndex == (this.len - 1)) {
        this.handleTourEnd();
    }
};

AudioTour.prototype.lastAudio = function () {

    // if audio is this.playing handle it
    this.handlePlaying();

    //log change to db
    this.logBookEvent({'event': 'Audio', 'act': 'last', 'div_id': this.theDivid});

    // move to the last audio
    this.currIndex = this.len - 1;

    // start at last
    this.playCurrIndexAudio();

};

// play the audio at the current index
AudioTour.prototype.playCurrIndexAudio = function () {

    // set this.playing to false
    this.playing = false;

    // play the current audio and highlight the lines
    this.playaudio(this.currIndex, this.aname, this.theDivid, this.ahash);

};

// handle the end of the tour
AudioTour.prototype.handleTourEnd = function () {
    $(this.status).html("The " + this.tourName + " has ended.");
    this.pause_audio.className = "btn-default glyphicon glyphicon-pause";
    this.pause_audio.title = "Pause audio";
    this.pause_audio.setAttribute("aria-label", "Pause audio");

    $(this.first_audio).attr('disabled', 'disabled');
    $(this.prev_audio).attr('disabled', 'disabled');
    $(this.pause_audio).attr('disabled', 'disabled');
    $(this.next_audio).attr('disabled', 'disabled');
    $(this.last_audio).attr('disabled', 'disabled');

    $(this.first_audio).css('opacity', 0.25);
    $(this.prev_audio).css('opacity', 0.25);
    $(this.pause_audio).css('opacity', 0.25);
    $(this.next_audio).css('opacity', 0.25);
    $(this.last_audio).css('opacity', 0.25);

    // enable the tour buttons
    for (var j = 0; j < this.buttonCount; j++)
        $(this.tourButtons[j]).removeAttr('disabled');
};

// only call this one after the first time
AudioTour.prototype.outerAudio = function () {

    // unbind ended
    $('#' + this.afile).unbind('ended');

    // set this.playing to false
    this.playing = false;

    // unhighlight previous lines from the last audio
    this.unhighlightLines(this.theDivid, this.ahash[this.aname[this.currIndex]]);

    // increment the this.currIndex to point to the next one
    this.currIndex++;

    // if the end of the tour reset the buttons
    if (this.currIndex == this.len) {
        this.handleTourEnd();
    }

    // else not done yet so play the next audio
    else {

        // play the audio at the current index
        this.playCurrIndexAudio();
    }
};

// play the audio now that it is ready
AudioTour.prototype.playWhenReady = function (afile, divid, ahash) {
    // unbind current
    $('#' + afile).unbind('canplaythrough');
    this.elem.currentTime = 0;
    this.playing = true;
    //console.log("in playWhenReady " + elem.duration);
    this.highlightLines(divid, ahash[afile]);
    if (this.pause_audio.className === "btn-default glyphicon glyphicon-pause") {
        $(this.status).html($.i18n("msg_activecode_playing", this.tourName));
        $('#' + afile).bind('ended', (function () {
        this.outerAudio();
        }).bind(this));
        this.elem.play();
    }
    else {
        $('#' + afile).bind('ended', (function () {
        this.outerAudio();
        }).bind(this));
    }
};


// play the audio at the specified index i and set the duration and highlight the lines
AudioTour.prototype.playaudio = function (i, aname, divid, ahash) {
    this.afile = aname[i];
    this.elem = document.getElementById(this.afile);

    // if this isn't ready to play yet - no duration yet then wait
    //console.log("in playaudio " + elem.duration);
    if (isNaN(this.elem.duration) || this.elem.duration == 0) {
        // set the status
        $(this.status).html($.i18n("msg_activecode_loading_audio"));
        $('#' + this.afile).bind('canplaythrough', (function () {
            this.playWhenReady(this.afile, divid, ahash);
        }).bind(this));
    }
    // otherwise it is ready so play it
    else {
        this.playWhenReady(this.afile, divid, ahash);
    }
};

// pause if this.playing and play if paused
AudioTour.prototype.pauseAndPlayAudio = function (divid) {
    var btn = this.pause_audio;

    // if paused and clicked then continue from current
    if (this.elem.paused) {
        // calcualte the time left to play in milliseconds
        counter = (this.elem.duration - this.elem.currentTime) * 1000;
        this.elem.play(); // start the audio from current spot
        this.pause_audio.className = "btn-default glyphicon glyphicon-pause";
        this.pause_audio.title = $.i18n("msg_activecode_pause_current_audio");
        this.pause_audio.setAttribute("aria-label", $.i18n("msg_activecode_pause_audio"));
        $(this.status).html($.i18n("msg_activecode_playing", this.tourName));
        //log change to db
        this.logBookEvent({'event': 'Audio', 'act': 'play', 'div_id': this.theDivid});
    }

    // if audio was this.playing pause it
    else if (this.playing) {
        this.elem.pause(); // pause the audio
        this.pause_audio.className = "btn-default glyphicon glyphicon-play";
        this.pause_audio.title = $.i18n("msg_activecode_play_paused_audio");
        this.pause_audio.setAttribute("aria-label", $.i18n("msg_activecode_play_paused_audio"));
        $(this.status).html($.i18n("msg_activecode_audio_paused", this.tourName));
        //log change to db
        this.logBookEvent({'event': 'Audio', 'act': 'pause', 'div_id': this.theDivid});
    }

};

// process the lines
AudioTour.prototype.processLines = function (divid, lnum, color) {
    var comma = lnum.split(",");

    if (comma.length > 1) {
        for (i = 0; i < comma.length; i++) {
            this.setBackgroundForLines(divid, comma[i], color);
        }
    }
    else {
        this.setBackgroundForLines(divid, lnum, color);
    }
};

// unhighlight the lines - set the background back to transparent
AudioTour.prototype.unhighlightLines = function (divid, lnum) {
    this.processLines(divid, lnum, 'transparent');
};

// highlight the lines - set the background to a yellow color
AudioTour.prototype.highlightLines = function (divid, lnum) {
    this.processLines(divid, lnum, '#ffff99');
};

// set the background to the passed color
AudioTour.prototype.setBackgroundForLines = function (divid, lnum, color) {
    var hyphen = lnum.split("-");

    // if a range of lines
    if (hyphen.length > 1) {
        var start = parseInt(hyphen[0]);
        var end = parseInt(hyphen[1]) + 1;
        for (var k = start; k < end; k++) {
            //alert(k);
            var str = "#" + divid + "_l" + k;
            if ($(str).text() != "") {
                $(str).css('background-color', color);
            }
            //$(str).effect("highlight",{},(dur*1000)+4500);
        }
    }
    else {
        //alert(lnum);
        var str = "#" + divid + "_l" + lnum;
        $(str).css('background-color', color);
        //$(str).effect("highlight",{},(dur*1000)+4500);
    }
};


LiveCode.prototype = new ActiveCode();

function LiveCode(opts) {
    if (opts) {
        this.init(opts)
        }
    }
function unescapeHtml(safe) {
    if (safe) {
        return safe.replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#x27;/g, "'");
    }
}
LiveCode.prototype.init = function(opts) {
    ActiveCode.prototype.init.apply(this,arguments);

    var orig = opts.orig;
    this.stdin = $(orig).data('stdin');
    this.datafile = $(orig).data('datafile');
    this.sourcefile = $(orig).data('sourcefile');
    this.compileargs = unescapeHtml($(orig).data('compileargs'));
    this.linkargs = unescapeHtml($(orig).data('linkargs'));
    this.runargs = unescapeHtml($(orig).data('runargs'));
    this.interpreterargs = unescapeHtml($(orig).data('interpreterargs'));
    this.API_KEY = "67033pV7eUUvqo07OJDIV8UZ049aLEK1";
    this.USE_API_KEY = true;

    this.JOBE_SERVER = eBookConfig.jobehost || eBookConfig.host;
    this.resource = eBookConfig.proxyuri_runs ||  '/runestone/proxy/jobeRun';
    this.jobePutFiles = eBookConfig.proxyuri_files || '/runestone/proxy/jobePushFile/';
    this.jobeCheckFiles = eBookConfig.proxyuri_files || '/runestone/proxy/jobeCheckFile/';
    // TODO:  should add a proper put/check in pavement.tmpl as this is misleading and will break on runestone

    this.div2id = {};
    if (this.stdin) {
        this.createInputElement();
    }
    this.createErrorOutput();
    };

LiveCode.prototype.outputfun = function (a) {};

LiveCode.prototype.createInputElement = function () {

    var label = document.createElement('label');
    label.for = this.divid + "_stdin";
    $(label).text($.i18n("msg_activecode_input_prg"));
    var input = document.createElement('input');
    input.id = this.divid + "_stdin";
    input.type = "text";
    input.size = "35";
    input.value = this.stdin;
    this.outerDiv.appendChild(label);
    this.outerDiv.appendChild(input);
    this.stdin_el = input;
};

LiveCode.prototype.createErrorOutput = function () {

};

/**
 * Note:
 * In order to check for supplemental files in java and deal with asynchronicity
 * I split the original runProg into two functions: runProg and runProg_callback
 */
LiveCode.prototype.runProg = function() {
    var stdin;
    var scrubber_dfd, history_dfd;
    var saveCode = "True";
    var sfilemap = {java: '', cpp: 'test.cpp', c: 'test.c', python3: 'test.py', python2: 'test.py'};
    var source = this.editor.getValue();
    source = this.buildProg(true);

    var __ret = this.manage_scrubber(scrubber_dfd, history_dfd, saveCode);
    history_dfd = __ret.history_dfd;
    saveCode = __ret.saveCode;

    var paramlist = ['compileargs','linkargs','runargs','interpreterargs'];
    var paramobj = {}
    for (param of paramlist) {
        if (this[param]) {
            paramobj[param] = eval(this[param]); // needs a list
        }
    }

    if (this.stdin) {
        stdin = $(this.stdin_el).val();
    }

    if (! this.sourcefile ) {
        this.sourcefile = sfilemap[this.language];
    }

    $(this.output).html($.i18n("msg_activecode_compiling_running"));

    var files = [];
    if (this.datafile != undefined) {
        var ids = this.datafile.split(",");
        for (var i = 0; i < ids.length; i++) {
            file = document.getElementById(ids[i].trim());
            if (file === null || file === undefined) {
                // console.log("No file with given id");
            } else if (file.className === "javaFiles") {
                files = files.concat(this.parseJavaClasses(file.textContent));
            } else if (file.className === "image") {
                var fileName = file.id;
                var extension = fileName.substring(fileName.indexOf('.') + 1);
                var base64 = file.toDataURL('image/' + extension);
                base64 = base64.substring(base64.indexOf(',') + 1);
                files.push({name: fileName, content: base64});
            } else {
                // if no className or un recognized className it is treated as an individual file
                // this could be any type of file, .txt, .java, .csv, etc
                files.push({name: file.id, content: file.textContent});
            }
        }
    }

    runspec = {
            language_id: this.language,
            sourcecode: source,
            parameters: paramobj,
            sourcefilename: this.sourcefile
    };

    if (stdin) {
        runspec.input = stdin
    }


    if(files.length === 0) {
        data = JSON.stringify({'run_spec': runspec});
        this.runProg_callback(data);
    } else {
        runspec['file_list'] = [];
        var promises = [];
        var instance = this;
        //todo: Not sure why this is loaded like this. It could be loaded once.
        $.getScript('https://cdn.rawgit.com/killmenot/webtoolkit.md5/master/md5.js', function()
        {
            for(var i = 0; i < files.length; i++) {
                var fileName = files[i].name;
                var fileContent = files[i].content;
                instance.div2id[fileName] = "runestone" + MD5(fileName + fileContent);
                runspec['file_list'].push([instance.div2id[fileName], fileName]);
                promises.push(new Promise((resolve, reject) => {
                     instance.checkFile(files[i], resolve, reject);
                }));
            }
            data = JSON.stringify({'run_spec': runspec});
            this.div2id = instance.div2id;
            Promise.all(promises).then(function() {
                // console.log("All files on Server");
                instance.runProg_callback(data);
            }).catch(function(err) {
                // console.log("Error: " + err);
            });
        });
    }

}
LiveCode.prototype.runProg_callback = function(data) {

        var xhr, stdin;
        var runspec = {};
        var scrubber_dfd, history_dfd;
        var host, source, editor;
        var saveCode = "True";
        var sfilemap = {java: '', cpp: 'test.cpp', c: 'test.c', python3: 'test.py', python2: 'test.py'};
        source = this.editor.getValue();

        xhr = new XMLHttpRequest();

        host = this.JOBE_SERVER + this.resource;

        var odiv = this.output;
        $(this.runButton).attr('disabled', 'disabled');
        $(this.outDiv).show({duration:700,queue:false});
        $(this.errDiv).remove();
        $(this.output).css("visibility","visible");

        xhr.open("POST", host, true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.setRequestHeader('X-API-KEY', this.API_KEY);

        xhr.onload = (function () {
            var logresult;
            $(this.runButton).removeAttr('disabled');
            try {
                var result = JSON.parse(xhr.responseText);
            } catch (e) {
                result = {};
                result.outcome = -1;
            }

            if (result.outcome === 15) {
                logresult = 'success';
            } else {
                logresult = result.outcome;
            }
            this.logRunEvent({'div_id': this.divid,
                 'code': source,
                 'errinfo': logresult,
                 'to_save':saveCode,
                 'lang': this.language,
                 'event':'livecode',
                 'partner': this.partner,
                });
            switch (result.outcome) {
                case 15:
                    $(odiv).html(result.stdout.replace(/\n/g, "<br>"));
                    break;
                case 11: // compiler error
                    $(odiv).html($.i18n("msg_activecode_were_compiling_err"));
                    this.addJobeErrorMessage(result.cmpinfo);
                    break;
                case 12:  // run time error
                    $(odiv).html(result.stdout.replace(/\n/g, "<br>"));
                    if (result.stderr) {
                        this.addJobeErrorMessage(result.stderr);
                    }
                    break;
                case 13:  // time limit
                    $(odiv).html(result.stdout.replace(/\n/g, "<br>"));
                    this.addJobeErrorMessage($.i18n("msg_activecode_time_limit_exc"));
                    break;
                default:
                    if(result.stderr){
                        $(odiv).html(result.stderr.replace(/\n/g, "<br>"));
                    } else {
                        this.addJobeErrorMessage($.i18n("msg_activecode_server_err", xhr.status, xhr.statusText));
                    }
            }
            // todo: handle server busy and timeout errors too
        }).bind(this);

        ///$("#" + divid + "_errinfo").remove();

        xhr.onerror = (function () {
            this.addJobeErrorMessage($.i18n("msg_activecode_server_comm_err"));
            $(this.runButton).removeAttr('disabled');
        }).bind(this);

        xhr.send(data);

    };
LiveCode.prototype.addJobeErrorMessage = function (err) {
        var errHead = $('<h3>').html('Error');
        var eContainer = this.outerDiv.appendChild(document.createElement('div'));
        this.errDiv = eContainer;
        eContainer.className = 'error alert alert-danger';
        eContainer.id = this.divid + '_errinfo';
        eContainer.appendChild(errHead[0]);
        var errText = eContainer.appendChild(document.createElement('pre'));
        errText.innerHTML = err;
    };


/**
 * Checks to see if file is on server
 * Places it on server if it is not on server
 * @param  {object{name, contents}} file    File to place on server
 * @param  {function} resolve promise resolve function
 * @param  {function} reject  promise reject function
 */
LiveCode.prototype.checkFile = function(file, resolve, reject) {
    var file_id = this.div2id[file.name];
    var resource = this.jobeCheckFiles + file_id;
    var host = this.JOBE_SERVER + resource;

    var xhr = new XMLHttpRequest();
    xhr.open("HEAD", host, true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.setRequestHeader('Accept', 'text/plain');
    xhr.setRequestHeader('X-API-KEY', this.API_KEY);

    xhr.onerror = function () {
        // console.log("error sending file" + xhr.responseText);
    };

    xhr.onload = (function () {
        switch(xhr.status) {
            case 208:
            case 404:
                // console.log("File not on Server");
                this.pushDataFile(file, resolve, reject);
                break;
            case 400:
                // console.log("Bad Request");
                reject();
                break;
            case 204:
                // console.log("File already on Server");
                resolve();
                break;
            default:
                //console.log("This case should never happen");
                reject();
            }
    }).bind(this);

    xhr.send();

};
/**
 * Places a file on a server
 */
LiveCode.prototype.pushDataFile = function (file, resolve, reject) {

    var fileName = file.name;
    var extension = fileName.substring(fileName.indexOf('.') + 1);

    var file_id = this.div2id[fileName];
    var contents = file.content;

    // File types being uploaded that come in already in base64 format
    var extensions = ['jar', 'zip', 'png', 'jpg', 'jpeg'];
    var contentsb64;

    if (extensions.indexOf(extension) === -1) {
        contentsb64 = btoa(contents);
    } else {
        contentsb64 = contents;
    }

    var data = JSON.stringify({ 'file_contents' : contentsb64 });

    var resource = this.jobePutFiles + file_id;
    var host = this.JOBE_SERVER + resource;

    var xhr = new XMLHttpRequest();
    xhr.open("PUT", host, true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.setRequestHeader('Accept', 'text/plain');

    xhr.setRequestHeader('X-API-KEY', this.API_KEY);

    xhr.onload = (function () {
        switch(xhr.status) {
            case 403:
                // console.log("Forbidden");
                reject();
                break;
            case 400:
                // console.log("Bad Request");
                reject();
                break;
            case 204:
                //console.log("successfully sent file " + xhr.responseText);
                //console.log("File " + fileName +", " + file_id +" placed on server");
                resolve();
                break;
            default:
                // console.log("This case should never happen");
                reject();
            }
    }).bind(this);

    xhr.onerror = function () {
        // console.log("error sending file" + xhr.responseText);
        reject();
    };

    xhr.send(data);

};

/**
 * Seperates text into multiple .java files
 * @param  {String} text String with muliple java classes needed to be seperated
 * @return {array of objects}  .name gives the name of the java file with .java extension
 *                   .content gives the contents of the file
 */
 LiveCode.prototype.parseJavaClasses = function(text) {

     text = text.trim();

     var found = false;
     var stack = 0;
     var startIndex = 0;
     var classes = [];
     var importIndex = 0;

     var endOfLastCommentBeforeClassBegins = 0;

     for(var i = 0; i < text.length; i++) {

         var char = text.charAt(i);
         if(char === '/') {
             i++;
             if(text.charAt(i) === '/') {
                 i++;
                 while(text.charAt(i) !== '\n' && i < text.length) {
                     i++;
                 }
                 if(!found) {
                     endOfLastCommentBeforeClassBegins = i;
                 }
             } else if(text.charAt(i) == '*') {
                 i++;
                 while((text.charAt(i) !== '*' || text.charAt(i+1) !== '/') && i + 1 < text.length) {
                     i++;
                 }
                 if(!found) {
                     endOfLastCommentBeforeClassBegins = i;
                 }
             }

         } else if(char === '"') {

             i++;
             while(text.charAt(i) !== '"' && i < text.length) {
                 i++;
             }
         } else if(char === '\'') {
             while(text.charAt(i) !== '\'' && i < text.length) {
                 i++;
             }
         } else if(char === '(') {
             var pCount = 1;
             i++;
         	while(pCount > 0 && i < text.length){
                if(text.charAt(i) === '(') {
                    pCount++;
                } else if(text.charAt(i) === ')') {
                    pCount--;
                }
                 i++;
             }
         }


         if(!found && text.charAt(i) === '{') {
             startIndex = i;
             found = true;
             stack = 1;
         } else if(found) {
             if(text.charAt(i) === '{') {
                 stack++;
             }
             if(text.charAt(i) === '}') {
                 stack--;
             }
         }
         if(found && stack === 0) {
             endIndex = i+1;

             var words = text.substring(endOfLastCommentBeforeClassBegins, startIndex).trim().split(" ");
             var className = "";
             for (var w = 0; w < words.length; w++) {
                 className = words[w];
                 if(words[w] === "extends" || words[w] === "implements") {
                     className = words[w-1];
                     w = words.length;
                 }
             }
             className = className.trim() + ".java";

             classes.push({name: className, content: text.substring(importIndex, endIndex)});
             found = false;
             importIndex = endIndex;
             endOfLastCommentBeforeClassBegins = endIndex;
         }

     }
     return classes;
 }

 //
 // SQL
 //

 SQLActiveCode.prototype = new ActiveCode();

 function SQLActiveCode(opts) {
     if (opts) {
         this.init(opts)
         }
     }

SQLActiveCode.prototype.init = function(opts) {

    ActiveCode.prototype.init.apply(this,arguments);

    if (eBookConfig.useRunestoneServices) {
        var fnprefix = '/runestone/books/published/' + eBookConfig.basecourse + '/_static';
    } else {
        var fnprefix = '/_static';
    }
    this.config = {
        locateFile: filename => `${fnprefix}/${filename}`
    }

    var self = this;

    initSqlJs(this.config).then(function (SQL) {
    // set up call to load database asynchronously if given
        if (self.dburl) {
            if (! self.dburl.startsWith("http")) {
                self.dburl = window.location.protocol + '//' + window.location.host + self.dburl;
            }
            $(self.runButton).attr('disabled','disabled')
            if (! (self.dburl in allDburls)) {
                allDburls[self.dburl] = {status: 'loading', xWaitFor: jQuery.Deferred() };
            } else {
                if (allDburls[self.dburl].status == 'loading') {
                    allDburls[self.dburl].xWaitFor.done(function() {
                        self.db = new SQL.Database(allDburls[self.dburl].db);
                        $(self.runButton).removeAttr('disabled')
                    });
                    return;
                }
                self.db = new SQL.Database(allDburls[self.dburl].db);
                $(self.runButton).removeAttr('disabled')
                return;
            }
            var xhr = new XMLHttpRequest();

            // For example: https://github.com/lerocha/chinook-database/raw/master/ChinookDatabase/DataSources/Chinook_Sqlite.sqlite
            xhr.open('GET', self.dburl, true);
            xhr.responseType = 'arraybuffer';

            xhr.onload = e => {
                var uInt8Array = new Uint8Array(xhr.response);
                self.db = new SQL.Database(uInt8Array);
                $(self.runButton).removeAttr('disabled')
                allDburls[self.dburl].db = uInt8Array;
                allDburls[self.dburl].status = 'ready';
                allDburls[self.dburl].xWaitFor.resolve();
                // contents is now [{columns:['col1','col2',...], values:[[first row], [second row], ...]}]
                };
            xhr.send();
        } else {
            self.db = new SQL.Database();
        }
    });
};


SQLActiveCode.prototype.runProg = function()  {
    var result_mess = "success"
    var scrubber_dfd, history_dfd, saveCode
    // Clear any old results
    saveCode = "True"
    let divid = this.divid+'_sql_out';
    let respDiv = document.getElementById(divid);
    if (respDiv) {
        respDiv.parentElement.removeChild(respDiv)
    }
    $(this.output).text("")
    // Run this query
    let query = this.buildProg(false);  // false --> Do not include suffix
    if (! this.db ) {
        $(this.output).text(`Error: Database not initialized! DBURL: ${this.dburl}`)
        return;
    }
    try {
        var res = this.db.exec(query);
    } catch(error) {
        result_mess = error.toString();
        $(this.output).text(error);
        $(this.outDiv).show();
    }
    this.logRunEvent({
        'div_id': this.divid,
        'code': this.editor.getValue(),
        'lang': this.language,
        'errinfo': result_mess,
        'to_save': saveCode,
        'prefix': this.pretext,
        'suffix': this.suffix,
        'partner': this.partner
    }); // Log the run event

    var __ret = this.manage_scrubber(scrubber_dfd, history_dfd, saveCode);
    history_dfd = __ret.history_dfd;
    saveCode = __ret.saveCode;

    history_dfd.then(function() {
        if (this.slideit) {
            $(this.historyScrubber).on("slidechange", this.slideit.bind(this));
        }
        $(this.historyScrubber).slider("enable");
    });

    if (result_mess != "success") {
        return;
    }
    // Create a nice table to show the result of the query
    if (res[0].values.length > 100) {
        $(this.output).text("Result set is longer than 100 rows limiting output to first 100")
    }
    let table = createTable(res[0]);
    respDiv = document.createElement('div')
    respDiv.id = divid;
    $(respDiv).addClass('table-responsive-md')
    $(respDiv).css('max-height', '500px')
    $(respDiv).css('overflow', 'scroll')
    this.outDiv.appendChild(respDiv)
    respDiv.appendChild(table)
    $(this.outDiv).show()

    // Now handle autograding
    if (this.suffix) {
        result = this.autograde(res[0]);
        $(this.output).text(result);
    }

}

SQLActiveCode.prototype.autograde = function(result_table) {
    tests = this.suffix.split(/\n/);
    this.passed = 0;
    this.failed = 0;
    // Tests should be of the form
    // assert row,col oper value for example
    // assert 4,4 == 3
    result = ""
    tests = tests.filter(function(s) {
        return s.indexOf('assert') > -1
    })
    for (let test of tests) {
        let wlist = test.split(/\s+/);
        wlist.shift();
        loc = wlist.shift()
        oper = wlist.shift();
        expected = wlist.join(' ');
        [row,col] = loc.split(',');
        result += this.testOneAssert(row, col, oper, expected, result_table);
        result += "\n"
    }
    pct = 100 * this.passed / (this.passed + this.failed);
    pct = pct.toLocaleString(undefined, { maximumFractionDigits: 2});
    result += `You passed ${this.passed} out of ${this.passed+this.failed} tests for ${pct}%`
    this.logBookEvent({event: 'unittest',
                       div_id: this.divid,
                       course: eBookConfig.course,
                       act: `percent:${pct}:passed:${this.passed}:failed:${this.failed}`
                    });
    return result;
}

SQLActiveCode.prototype.testOneAssert = function(row, col, oper, expected, result_table) {
    let actual  = result_table.values[row][col]
    const operators = {
        "==" : function (operand1, operand2) {
            return operand1 == operand2;
        },
        "!=" : function (operand1, operand2) {
            return operand1 != operand2;
        },
        ">" : function (operand1, operand2) {
            return operand1 > operand2;
        },
        "<" : function (operand1, operand2) {
            return operand1 > operand2;
        }
    };

    res = operators[oper](actual, expected)
    if (res) {
        output = `Pass: ${actual} ${oper} ${expected} in row ${row} column ${result_table.columns[col]}`;
        this.passed++;
    } else {
        output = `Failed ${actual} ${oper} ${expected} in row ${row} column ${result_table.columns[col]}`;
        this.failed++
    }
    return output;
}


function createTable(tableData) {
    var table = document.createElement('table');
    var head = document.createElement('thead');
    var tableBody = document.createElement('tbody');
    var theads = document.createElement('tr')

    tableData.columns.forEach(function(colData) {
        let th = document.createElement('th');
        th.appendChild(document.createTextNode(colData));
        theads.appendChild(th);
    });
    table.appendChild(head);
    head.appendChild(theads);
    tableData.values.slice(0,100).forEach(function(rowData) {
      var row = document.createElement('tr');

      rowData.forEach(function(cellData) {
        var cell = document.createElement('td');
        cell.appendChild(document.createTextNode(cellData));
        row.appendChild(cell);
      });

      tableBody.appendChild(row);
    });

    table.appendChild(tableBody);
    $(table).css('background', 'white');
    $(table).addClass('table-striped table-light thead-dark')
    return table;
  }


//
// ActiveCode Factory Class
//

ACFactory = {};

ACFactory.createActiveCode = function (orig, lang, addopts) {
    var opts = {'orig' : orig, 'useRunestoneServices': eBookConfig.useRunestoneServices, 'python3' : eBookConfig.python3 };
    if (addopts) {
        for (var attrname in addopts) {
            opts[attrname] = addopts[attrname];
        }
    }
    if (lang === "javascript") {
        return new JSActiveCode(opts);
    } else if (lang === 'htmlmixed') {
        return new HTMLActiveCode(opts);
    } else if (lang === 'sql') {
        return new SQLActiveCode(opts);
    } else if (['java', 'cpp', 'c', 'python3', 'python2'].indexOf(lang) > -1) {
        return new LiveCode(opts);
    } else {   // default is python
        return new ActiveCode(opts);
    }

};


// used by web2py controller(s)
ACFactory.addActiveCodeToDiv = function(outerdivid, acdivid, sid, initialcode, language) {
    var  thepre, newac;

    var acdiv = document.getElementById(acdivid);
    $(acdiv).empty();
    thepre = document.createElement("textarea");
    thepre['data-component'] = "activecode";
    thepre.id = outerdivid;
    $(thepre).data('lang', language);
    $(acdiv).append(thepre);
    var opts = {'orig' : thepre, 'useRunestoneServices': true };
    var addopts = {'sid': sid, 'graderactive':true};
    if(language === 'htmlmixed') {
        addopts['vertical'] = true;
    }
    newac = ACFactory.createActiveCode(thepre,language,addopts);
    var savediv = newac.divid;
    newac.divid = savediv;
    newac.editor.setSize(500,300);
    setTimeout(function() {
            newac.editor.refresh();
        },500);

};

ACFactory.createActiveCodeFromOpts = function(opts) {
    return ACFactory.createActiveCode(opts.orig, opts.lang, opts)
}

ACFactory.createScratchActivecode = function() {
    /* set up the scratch Activecode editor in the search menu */
    // use the URL to assign a divid - each page should have a unique Activecode block id.
    // Remove everything from the URL but the course and page name
    // todo:  this could probably be eliminated and simply moved to the template file
    var divid = eBookConfig.course + "_scratch_ac";
    divid = divid.replace(/[#.]/g,''); // in case book title has characters that will mess up our selectors
    eBookConfig.scratchDiv = divid;
    var lang = eBookConfig.acDefaultLanguage ? eBookConfig.acDefaultLanguage : 'python'
    // generate the HTML
    var html = '<div id="ac_modal_' + divid + '" class="modal fade">' +
        '  <div class="modal-dialog scratch-ac-modal">' +
        '    <div class="modal-content">' +
        '      <div class="modal-header">' +
        '        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
        '        <h4 class="modal-title">Scratch ActiveCode</h4>' +
        '      </div> ' +
        '      <div class="modal-body">' +
        '      <textarea data-component="activecode" data-codelens="true" id="' + divid + '" data-lang="'+ lang +'">' +
        '\n' +
        '\n' +
        '\n' +
        '      </textarea>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>';
    var el = $(html);
    $('body').append(el);

    el.on('shown.bs.modal show.bs.modal', function () {
        el.find('.CodeMirror').each(function (i, e) {
            e.CodeMirror.refresh();
            e.CodeMirror.focus();
        });
    });

    //$(document).bind('keypress', '\\', function(evt) {
    //    ACFactory.toggleScratchActivecode();
    //    return false;
    //});
};


ACFactory.toggleScratchActivecode = function () {
    var divid = "ac_modal_" + eBookConfig.scratchDiv;
    var div = $("#" + divid);

    $(`#${eBookConfig.scratchDiv}`).removeClass('ac_section');
    div.modal('toggle');

};


//
// Page Initialization
//

$(document).ready(function() {
    ACFactory.createScratchActivecode();
    $('[data-component=activecode]').each( function(index ) {
        if ($(this).closest('[data-component=timedAssessment]').length == 0 ) {   // If this element exists within a timed component, don't render it here
            edList[this.id] = ACFactory.createActiveCode(this, $(this).data('lang'));
        }
    });
    if (loggedout) {
        for (k in edList) {
            edList[k].disableSaveLoad();
        }
    } else {
        for (k in edList) {
            edList[k].enableSaveLoad();
        }
    }

});

if (typeof component_factory === 'undefined') {
    component_factory = {}
}
component_factory['activecode'] = ACFactory.createActiveCodeFromOpts;


// This seems a bit hacky and possibly brittle, but its hard to know how long it will take to
// figure out the login/logout status of the user.  Sometimes its immediate, and sometimes its
// long.  So to be safe we'll do it both ways..
var loggedout;
$(document).bind("runestone:logout",function() { loggedout=true;});
$(document).bind("runestone:logout",function() {
    for (k in edList) {
        if (edList.hasOwnProperty(k)) {
            edList[k].disableSaveLoad();
        }
    }
});
