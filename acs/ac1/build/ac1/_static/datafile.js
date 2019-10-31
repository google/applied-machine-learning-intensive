/*==========================================
=======     Master datafile.js      ========
============================================
===     This file contains the JS for    ===
===   the Runestone Datafile component.  ===
============================================
===              Created by              ===
===           Isaiah Mayerchak           ===
===                6/8/15                ===
==========================================*/

var dfList = {};    // Dictionary that contains all instances of Datafile objects


function DataFile (opts) {
    if (opts) {
        this.init(opts);
    }
}

DataFile.prototype = new RunestoneBase();

/*========================================
== Initialize basic DataFile attributes ==
========================================*/
DataFile.prototype.init = function (opts) {
    RunestoneBase.apply(this, arguments);
    var orig = opts.orig;    // entire <pre> element that will be replaced by new HTML
    this.origElem = orig;
    this.divid = orig.id;
    this.dataEdit = false;
    if ($(this.origElem).data("edit") === true) {
        this.dataEdit = true;
    }
    this.displayClass = "block";     // Users can specify the non-edit component to be hidden--default is not hidden
    if ($(this.origElem).is("[data-hidden]")) {
        this.displayClass = "none";
    }
    // Users can specify numbers of rows/columns when editing is true
    this.numberOfRows = $(this.origElem).data("rows");
    this.numberOfCols = $(this.origElem).data("cols");

    if (this.dataEdit) {
        this.createTextArea();
    } else {
        this.createPre();
    }
};

/*=====================================
== Create either <pre> or <textarea> ==
==  depending on if editing is true  ==
==================================*/
DataFile.prototype.createPre = function () {     // If data edit is false
    this.preContainer = document.createElement("pre");
    this.preContainer.id = this.divid;
    $(this.preContainer).attr({"style": "display: " + this.displayClass});
    this.preContainer.innerHTML = this.origElem.innerHTML;

    $(this.origElem).replaceWith(this.preContainer);
};

DataFile.prototype.createTextArea = function () {     // If data edit is true
    this.textAreaContainer = document.createElement("textarea");
    this.textAreaContainer.id = this.divid;
    this.textAreaContainer.rows = this.numberOfRows;
    this.textAreaContainer.cols = this.numberOfCols;
    this.textAreaContainer.innerHTML = this.origElem.innerHTML;
    $(this.textAreaContainer).addClass("datafiletextfield");

    $(this.origElem).replaceWith(this.textAreaContainer);
};

/*=================================
== Find the custom HTML tags and ==
==   execute our code on them    ==
=================================*/
$(document).ready(function () {
    $("[data-component=datafile]").each(function (index) {
        dfList[this.id] = new DataFile({"orig": this});
    });

});
