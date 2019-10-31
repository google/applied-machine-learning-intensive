// .. Copyright (C) 2017 Bryan A. Jones.
//
//    This file is part of E-Book Binder.
//
//    E-Book Binder is free software: you can redistribute it and/or modify it
//    under the terms of the GNU General Public License as published by the Free
//    Software Foundation, either version 3 of the License, or (at your option)
//    any later version.
//
//    E-Book Binder is distributed in the hope that it will be useful, but WITHOUT
//    ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
//    FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more
//    details.
//
//    You should have received a copy of the GNU General Public License along
//    with E-Book Binder.  If not, see <http://www.gnu.org/licenses/>.
//
// .. highlight:: javascript
//
// **************************************************************************************
// |docname| - JavaScript functions supporting immediate feedback to in-browser questions
// **************************************************************************************

"use strict";

// Constructor
// ===========
// Object containing all instances of LP problems. (I assume there is just one per page.)
var LPList = {};

// FITB constructor
function LP(opts) {
    if (opts) {
        this.init(opts);
    }
}

LP.prototype = new RunestoneBase();

LP.prototype.init = function (opts) {
    // Properly construct the object.
    RunestoneBase.apply(this, arguments);
    RunestoneBase.prototype.init.apply(this, arguments);
    this.useRunestoneServices = opts.useRunestoneServices;
    // Store the DOM element (the input) for the "Test" button.
    this.element = opts.orig;
    this.divid = this.element.id;
    // Store the DOM element (the textarea) where compile results will be displayed.
    this.resultElement = $(this.element).siblings('textarea');
    // Store the DOM element (a span) where feedback will be displayed.
    this.feedbackElement = $(this.element).siblings('div');

    // Use a nice editor.
    var that = this;
    this.textAreas = [];
    $('.code_snippet').each(function (index, element) {
        var editor = CodeMirror.fromTextArea(element, {
            lineNumbers: true,
            mode: $(that.element).attr('data-lang'),
            indentUnit: 4,
            matchBrackets: true,
            autoMatchParens: true,
            extraKeys: {"Tab": "indentMore", "Shift-Tab": "indentLess"},
        });

        // Make the editor resizable.
        $(editor.getWrapperElement()).resizable({
            resize: function() {
                editor.setSize($(this).width(), $(this).height());
                editor.refresh();
            }
        });
        // Keep track of it.
        that.textAreas.push(editor);
    });

    this.checkServer('lp_build');

    // Handle clicks to the "Save and run" button.
    $(this.element).click(function (eventObject) {
        $(that.resultElement).val('Building...');
        $(that.feedbackElement).text('').attr('');
        // Since the Save and run button was clicked, we assume the code snippets have been changed; therefore, don't store ``correct`` or ``answer.resultString`` because they are out of date.
        let answer = { code_snippets: that.textareasToData() };
        that.setLocalStorage({
            answer: answer,
            timestamp: new Date()
        });
        that.logBookEvent({
            event: 'lp_build',
            // All values must be strings, or the resulting values on the server side come out confused.
            answer: JSON.stringify(answer),
            // Find the relative path to this web page. Slice off the leading ``/``.
            path: window.location.href.replace(eBookConfig.app, '').slice(1),
            div_id: that.divid,
        }).done(function (data) {
            // The server doesn't return the ``code_snippets``, for efficiency. Include those. If an error was returned, note that there is no ``answer`` yet.
            if (!('answer' in data)) {
                data['answer'] = {};
            }
            data['answer']['code_snippets'] = that.textareasToData();
            that.displayAnswer(data);
            that.setLocalStorage(data);
        }).fail(function () {
            $(that.feedbackElement).val('Error contacting server.').attr('class', 'alert alert-danger');
        });
    });
};


// Given a single answer, display it.
LP.prototype.displayAnswer = function(data) {
    if ('errors' in data) {
        // Display any server-side errors. If this key is present, other keys won't be.
        $(this.feedbackElement).text(data.errors.join('<br>')).attr('class', 'alert alert-danger');
    } else {
        // Display and color-code the results.
        $(this.resultElement).val(data.answer.resultString);
        if (data.correct == null) {
            $(this.feedbackElement).text('Response recorded.').attr('class', 'alert alert-success');
        } else if (data.correct >= 100) {
            $(this.feedbackElement).text('Correct. Grade: ' + data.correct + '%').attr('class', 'alert alert-success');
        } else {
            $(this.feedbackElement).text('Incorrect. Grade: ' + data.correct + '%').attr('class', 'alert alert-danger');
        }
        // Scroll to the bottom of the results.
        $(this.resultElement).scrollTop(this.resultElement[0].scrollHeight);
    }
};

// Store the contents of each textarea into an array of strings.
LP.prototype.textareasToData = function () {
    return $.map(this.textAreas, function(obj, index) {
        // See https://codemirror.net/doc/manual.html#api.
        return obj.getValue();
    });
};

// Store an array of strings in ``data.code_snippets`` into each textarea.
LP.prototype.dataToTextareas = function (data) {
    // Find all code snippet textareas.
    $(this.textAreas).each(function(index, value) {
        // Silently ignore if ``data.answer.code_snippets`` or ``data.answer.code_snippets[index]`` isn't defined.
        value.setValue((data.answer.code_snippets || "")[index] || "");
    });
};

// Restore answers from storage retrieval done in RunestoneBase.
LP.prototype.restoreAnswers = function (data) {
    this.dataToTextareas(data);
    this.displayAnswer(data);
}

LP.prototype.checkLocalStorage = function () {
    // Loads previous answers from local storage if they exist.
    if (localStorage.length > 0) {
        var key = this.localStorageKey();
        var ex = localStorage.getItem(key);
        if (ex !== null) {
            try {
                var storedData = JSON.parse(ex);
            } catch (err) {
                // error while parsing; likely due to bad value stored in storage
                console.log(err.message);
                localStorage.removeItem(key);
                return;
            }

            this.restoreAnswers(storedData);
        }
    }
};

LP.prototype.setLocalStorage = function (data) {
    localStorage.setItem(this.localStorageKey(), JSON.stringify(data));
};

// Initialization
// ==============
// Find the custom HTML tags and execute our code on them.
$(document).bind("runestone:login-complete", function () {
    $("[data-component=lp_build]").each(function (index) {
        LPList[this.id] = new LP({
            orig: this,
            useRunestoneServices: eBookConfig.useRunestoneServices,
        });
    });
});

if (typeof component_factory === 'undefined') {
    component_factory = {};
}
component_factory['lp_build'] = function (opts) {
    return new LP(opts)
};
