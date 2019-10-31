/*==========================================
=======      Master reveal.js       ========
============================================
===     This file contains the JS for    ===
===     the Runestone reval component.   ===
============================================
===              Created by              ===
===           Isaiah Mayerchak           ===
===               06/12/15               ===
==========================================*/
var RevealList = {};     // Dictionary that contains all instances of Reveal objects

Reveal.prototype = new RunestoneBase();

// Define Reveal object
function Reveal (opts) {
    if (opts) {
        this.init(opts);
    }
}

/*======================================
== Initialize basic Reveal attributes ==
========================================*/
Reveal.prototype.init = function (opts) {
    RunestoneBase.apply(this, arguments);
    var orig = opts.orig;     // entire <div> element that will be replaced by new HTML
    this.origElem = orig;
    this.divid = orig.id;
    this.dataModal = false;     // is a model dialog vs. inline
    if ($(this.origElem).is("[data-modal]")) {
        this.dataModal = true;
    }
    if ($(this.origElem).is("[data-instructoronly]")) {
        this.instructorOnly = true;
    } else {
        this.instructorOnly = false;
    }

    this.modalTitle = null;
    this.showtitle = null;     // Title of button that shows the concealed data
    this.hidetitle = null;
    this.origContent = $(this.origElem).html();
    this.children = [];
    this.adoptChildren();

    this.checkForTitle();

    this.getButtonTitles();

    // Delay creating instructoronly buttons until login
    if (! this.instructorOnly) {
        this.createShowButton();
        if (!this.dataModal) {
            this.createHideButton();     // Hide button is already implemented in modal dialog
        }
    }
};

/*====================================
== Get text for buttons/modal title ==
====================================*/

Reveal.prototype.adoptChildren = function () {
    for (var i = 0; i < this.origElem.childNodes.length; i++) {
        this.children.push(this.origElem.childNodes[i]);
    }
};

Reveal.prototype.getButtonTitles = function () {     // to support old functionality
    this.showtitle = $(this.origElem).data("showtitle");
    if (this.showtitle === undefined) {
        this.showtitle = "Show" // default
    }
    if (this.instructorOnly) {
        this.showtitle += " IG";
    }

    this.hidetitle = $(this.origElem).data("hidetitle");
    if (this.hidetitle === undefined) {
        this.hidetitle = "Hide";     // default
    }
};

Reveal.prototype.checkForTitle = function () {
    this.modalTitle = $(this.origElem).data("title");
    if (this.modalTitle === undefined) {
        this.modalTitle = "Message from the author";     // default
    }
};

/*============================
== Create show/hide buttons ==
============================*/
Reveal.prototype.createShowButton = function () {
    var _this = this;
    this.wrapDiv = document.createElement("div");     // wrapper div
    if (!this.dataModal) {
        this.revealDiv = document.createElement("div");     // Div that is hidden that contains content
        this.revealDiv.id = this.divid;

        // Get original content, put it inside revealDiv and replace original div with revealDiv
        //$(this.revealDiv).html(this.origContent);

        for (var i = 0; i < this.children.length; i++) {
            this.revealDiv.appendChild(this.children[i]);
        }
        $(this.revealDiv).hide();
        this.wrapDiv.appendChild(this.revealDiv);
    }

    if (this.instructorOnly) {
        $(this.revealDiv).addClass('iguide');
    }


    this.sbutt = document.createElement("button");
    $(this.sbutt).addClass("btn reveal_button");
    if (this.instructorOnly) {
        $(this.sbutt).addClass("btn-info");
    } else {
        $(this.sbutt).addClass("btn-default");
    }
    $(this.sbutt).css("margin-bottom","10px");
    this.sbutt.textContent = this.showtitle;
    this.sbutt.id = this.divid + "_show";
    if (!this.dataModal) {
        this.sbutt.onclick = function () {
            _this.showInline();
            $(this).hide();
        };
    } else {
        this.createModal();
        $(this.sbutt).attr({"data-toggle":"modal",
                        "data-target":"#" + this.divid + "_modal"});
    }
    this.wrapDiv.appendChild(this.sbutt);
    $(this.origElem).replaceWith(this.wrapDiv);
};

Reveal.prototype.createHideButton = function () {
    var _this = this;
    this.hbutt = document.createElement("button");
    $(this.hbutt).hide();
    this.hbutt.textContent = this.hidetitle;
    this.hbutt.className = "btn btn-default reveal_button";
    $(this.hbutt).css("margin-bottom","10px");

    this.hbutt.id = this.divid + "_hide";
    this.hbutt.onclick = function () {
        _this.hideInline();
        $(this).hide();
    };
    this.wrapDiv.appendChild(this.hbutt);

};

Reveal.prototype.createInstructorButtons = function () {
    this.createShowButton();
    if (!this.dataModal) {
        this.createHideButton();
    }
}

/*=================
=== Modal logic ===
=================*/
Reveal.prototype.createModal = function () {     // Displays popup dialog modal window
    this.modalContainerDiv = document.createElement("div");
    $(this.modalContainerDiv).addClass("modal fade");
    this.modalContainerDiv.id = this.divid + "_modal";
    $(this.modalContainerDiv).attr("role", "dialog");
    document.body.appendChild(this.modalContainerDiv);

    this.modalDialogDiv = document.createElement("div");
    $(this.modalDialogDiv).addClass("modal-dialog");
    this.modalContainerDiv.appendChild(this.modalDialogDiv);

    this.modalContentDiv = document.createElement("div");
    $(this.modalContentDiv).addClass("modal-content");
    this.modalDialogDiv.appendChild(this.modalContentDiv);

    this.modalHeaderDiv = document.createElement("div");
    $(this.modalHeaderDiv).addClass("modal-header");
    this.modalContentDiv.appendChild(this.modalHeaderDiv);

    this.modalButton = document.createElement("button");
    this.modalButton.type = "button";
    $(this.modalButton).addClass("close");
    $(this.modalButton).attr({"aria-hidden":"true",
                            "data-dismiss":"modal"});
    this.modalButton.innerHTML = "&times";
    this.modalHeaderDiv.appendChild(this.modalButton);

    this.modalTitleE = document.createElement("h4");
    $(this.modalTitleE).addClass("modal-title");
    this.modalTitleE.innerHTML = this.modalTitle;
    this.modalHeaderDiv.appendChild(this.modalTitleE);

    this.modalBody = document.createElement("div");
    $(this.modalBody).addClass("modal-body");
    for (var i = 0; i < this.children.length; i++) {
        this.modalBody.appendChild(this.children[i]);
    }
    this.modalContentDiv.appendChild(this.modalBody);




    /*var html = "<div class='modal fade'>" +
                "    <div class='modal-dialog compare-modal'>" +
                "        <div class='modal-content'>" +
                "            <div class='modal-header'>" +
                "                <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>" +
                "                <h4 class='modal-title'>" + this.modalTitle + "</h4>" +
                "            </div>" +
                "            <div class='modal-body'>" +
                this.origContent +
                "            </div>" +
                "        </div>" +
                "    </div>" +
                "</div>";*/
    //var el = $(this.modalContainerDiv);
    //el.modal();
};

/*==================
=== Inline logic ===
==================*/
Reveal.prototype.showInline = function () {     // Displays inline version of reveal
    $(this.revealDiv).show();
    $(this.hbutt).show();
    $(this.revealDiv).find(".CodeMirror").each(function (i, el) {el.CodeMirror.refresh(); });

};

Reveal.prototype.hideInline = function () {
    $(this.revealDiv).hide();
    $(this.sbutt).show();
};

/*=================================
== Find the custom HTML tags and ==
==     execute our code on them        ==
=================================*/

$(document).bind("runestone:login-complete",function () {
    $("[data-component=reveal]").each(function (index) {
        RevealList[this.id] = new Reveal({"orig": this});
    });
    if (eBookConfig.isInstructor) {
        for (const divid of Object.keys(RevealList)) {
            if (RevealList[divid].instructorOnly) {
                RevealList[divid].createInstructorButtons();
            }
        }
    }
});
