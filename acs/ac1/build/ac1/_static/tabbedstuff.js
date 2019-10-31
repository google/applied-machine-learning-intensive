/*==========================================
=======    Master tabbedstuff.js    ========
============================================
===     This file contains the JS for    ===
=== the Runestone tabbedStuff component. ===
============================================
===              Created by              ===
===           Isaiah Mayerchak           ===
===               06/15/15               ===
==========================================*/

var TSList = {};    // Dictionary that contains all instances of TabbedStuff objects

TabbedStuff.prototype = new RunestoneBase();

// Define TabbedStuff object
function TabbedStuff (opts) {
    if (opts) {
        this.init(opts);
    }
}

/*===========================================
== Initialize basic TabbedStuff attributes ==
===========================================*/

TabbedStuff.prototype.init = function (opts) {
    RunestoneBase.apply(this, arguments);
    var orig = opts.orig;
    this.origElem = orig;     // entire original <div> element that will be replaced by new HTML
    this.divid = orig.id;

    this.inactive = false;
    if ($(this.origElem).is("[data-inactive]")) {
        this.inactive = true;
    }

    this.togglesList = [];     // For use in Codemirror/Disqus
    this.childTabs = [];
    this.populateChildTabs();

    this.activeTab = 0;     // default value--activeTab is the index of the tab that starts open
    this.findActiveTab();

    this.createTabContainer();

};

/*===========================================
== Update attributes of instance variables ==
==    variables according to specifications    ==
===========================================*/

TabbedStuff.prototype.populateChildTabs = function () {     // Populate this.childTabs with all child nodes that have the data-component='tab' attribute
    for (var i = 0; i < this.origElem.childNodes.length; i++) {
        if ($(this.origElem.childNodes[i]).data("component") === "tab") {
            this.childTabs.push(this.origElem.childNodes[i]);
        }
    }
};

TabbedStuff.prototype.findActiveTab = function () {     // Checks to see if user has specified a tab to be active on pageload
    for (var i = 0; i < this.childTabs.length; i++) {
        if ($(this.childTabs[i]).is("[data-active]")) {
            this.activeTab = i;
        }
    }
};

/*==========================================
== Creating/appending final HTML elements ==
==========================================*/

TabbedStuff.prototype.createTabContainer = function () {     // First create a container div
    this.replacementDiv = document.createElement("div");
    this.replacementDiv.id = this.divid;
    $(this.replacementDiv).addClass(this.origElem.getAttribute("class"));
    $(this.replacementDiv).attr({"role": "tabpanel"});

    this.tabsUL = document.createElement("ul");
    this.tabsUL.id = this.divid + "_tab";
    $(this.tabsUL).addClass("nav nav-tabs");
    $(this.tabsUL).attr({"role": "tablist"});

    this.tabContentDiv = document.createElement("div");     // Create tab content container that holds tab panes w/content
    $(this.tabContentDiv).addClass("tab-content");

    this.createTabs();     // create and append tabs to the <ul>

    this.replacementDiv.appendChild(this.tabsUL);
    this.replacementDiv.appendChild(this.tabContentDiv);

    this.addCMD();     // Adds fuctionality for Codemirror/Disqus

    $(this.origElem).replaceWith(this.replacementDiv);
};

TabbedStuff.prototype.createTabs = function () {
    // Create tabs in format <li><a><span></span></a></li> to be appended to the <ul>
    for (var i = 0; i < this.childTabs.length; i++) {
        // First create tabname and tabfriendly name that has no spaces to be used for the id
        var tabListElement = document.createElement("li");
        $(tabListElement).attr({
            "role": "presentation",
            "aria-controls": this.divid + "-" + i
        });
        // Using bootstrap tabs functionality
        var tabElement = document.createElement("a");
        $(tabElement).attr({
            "data-toggle": "tab",
            "href": "#" + this.divid + "-" + i,
            "role": "tab"
        });
        var tabTitle = document.createElement("span");     // Title of tab--what the user will see
        tabTitle.textContent = $(this.childTabs[i]).data("tabname");

        tabElement.appendChild(tabTitle);
        tabListElement.appendChild(tabElement);
        this.tabsUL.appendChild(tabListElement);

        // tabPane is what holds the contents of the tab
        var tabPaneDiv = document.createElement("div");
        tabPaneDiv.id = this.divid + "-" + i;
        $(tabPaneDiv).addClass("tab-pane");
        $(tabPaneDiv).attr({
            "role": "tabpanel"
        });
        //var tabHTML = $(this.childTabs[i]).html();
        //$(tabPaneDiv).html(tabHTML);

        tabPaneDiv.appendChild(this.childTabs[i]);

        if (!this.inactive) {
            if (this.activeTab === i) {
                $(tabListElement).addClass("active");
                $(tabPaneDiv).addClass("active");
            }
        }
        this.togglesList.push(tabElement);
        this.tabContentDiv.appendChild(tabPaneDiv);
    }
};

/*===================================
== Codemirror/Disqus functionality ==
===================================*/
TabbedStuff.prototype.addCMD = function () {
    $(this.togglesList).on("shown.bs.tab", function (e) {
        var content_div = $(e.target.attributes.href.value);
        content_div.find(".disqus_thread_link").each(function () {
            $(this).click();
        });

        content_div.find(".CodeMirror").each(function (i, el) {
            el.CodeMirror.refresh();
        });
    });
};

/*=================================
== Find the custom HTML tags and ==
==     execute our code on them        ==
=================================*/
$(document).ready(function () {
    $("[data-component=tabbedStuff]").each(function (index) {
        TSList[this.id] = new TabbedStuff({"orig": this});
    });
});
