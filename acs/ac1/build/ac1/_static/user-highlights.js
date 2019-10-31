/*global variable declarations*/
var urlList;
var extendType;
var rsb = new RunestoneBase();

function getCompletions() {
// Get the completion status
    if ((window.location.href).match(/(index.html|toctree.html|genindex.html|navhelp.html|toc.html|assignments.html|Exercises.html)/)) {
        return;
    }

    var currentPathname = window.location.pathname;
    if (currentPathname.indexOf("?") !== -1) {
        currentPathname = currentPathname.substring(0, currentPathname.lastIndexOf("?"));
    }
    var data = {lastPageUrl: currentPathname};
    jQuery.ajax({url: eBookConfig.ajaxURL + 'getCompletionStatus', data: data, async: false}).done(function (data) {
        if (data != "None") {
            var completionData = $.parseJSON(data);
            var completionClass, completionMsg;
            if (completionData[0].completionStatus == 1) {
                completionClass = "buttonConfirmCompletion";
                completionMsg = "<i class='glyphicon glyphicon-ok'></i> Completed. Well Done!";
            }
            else {
                completionClass = "buttonAskCompletion";
                completionMsg = "Mark as Completed";
            }
            $("#main-content").append('<div style="text-align:center"><button class="btn btn-lg ' + completionClass + '" id="completionButton">' + completionMsg + '</button></div>');
        }
    });
}

function showLastPositionBanner() {
    var lastPositionVal = $.getUrlVar('lastPosition');
    if (typeof lastPositionVal !== "undefined") {
        $("body").append('<img src="../_static/last-point.png" style="position:absolute; padding-top:55px; left: 10px; top: ' + parseInt(lastPositionVal) + 'px;"/>');
        $("html, body").animate({scrollTop: parseInt(lastPositionVal)}, 1000);
    }
}

function addNavigationAndCompletionButtons() {
    if ((window.location.href).match(/(index.html|genindex.html|navhelp.html|toc.html|assignments.html|Exercises.html|toctree.html)/)) {
        return;
    }
    var navLinkBgRightHiddenPosition = -$("#navLinkBgRight").outerWidth() - 5;
    var navLinkBgRightHalfOpen;
    var navLinkBgRightFullOpen = 0;

    if ($("#completionButton").hasClass("buttonAskCompletion")) {
        navLinkBgRightHalfOpen = navLinkBgRightHiddenPosition + 70;
    }
    else if ($("#completionButton").hasClass("buttonConfirmCompletion")) {
        navLinkBgRightHalfOpen = 0;
    }
    var relationsNextIconInitialPosition = $("#relations-next").css("right");
    var relationsNextIconNewPosition = -(navLinkBgRightHiddenPosition + 35);

    $("#navLinkBgRight").css("right", navLinkBgRightHiddenPosition).show();
    var navBgShown = false;
    $(window).scroll(function () {
        if ($(window).scrollTop() + $(window).height() == $(document).height()) {
            $("#navLinkBgRight").animate(
                {"right": navLinkBgRightHalfOpen}, 200
            );
            $("#navLinkBgLeft").animate(
                {"left": "0px"}, 200
            );
            if ($("#completionButton").hasClass("buttonConfirmCompletion")) {
                $("#relations-next").animate({"right": relationsNextIconNewPosition}, 200);
            }
            navBgShown = true;
        }
        else if (navBgShown) {
            $("#navLinkBgRight").animate(
                {"right": navLinkBgRightHiddenPosition}, 200
            );
            $("#navLinkBgLeft").animate(
                {"left": "-65px"}, 200
            );
            $("#relations-next").animate({"right": relationsNextIconInitialPosition});
            navBgShown = false;
        }
    });

    var completionFlag = 0;
    if ($("#completionButton").hasClass("buttonAskCompletion")) {
        completionFlag = 0;
    } else {
        completionFlag = 1;
    }
    $("#completionButton").on("click", function () {
        if ($(this).hasClass("buttonAskCompletion")) {
            $(this).removeClass("buttonAskCompletion")
                .addClass("buttonConfirmCompletion")
                .html("<i class='glyphicon glyphicon-ok'></i> Completed. Well Done!");
            $("#navLinkBgRight").animate({"right": navLinkBgRightFullOpen});
            $("#relations-next").animate({"right": relationsNextIconNewPosition});
            navLinkBgRightHalfOpen = 0;
            completionFlag = 1;
        }
        else if ($(this).hasClass("buttonConfirmCompletion")) {
            $(this).removeClass("buttonConfirmCompletion")
                .addClass("buttonAskCompletion")
                .html("Mark as Completed");
            navLinkBgRightHalfOpen = navLinkBgRightHiddenPosition + 70;
            $("#navLinkBgRight").animate({"right": navLinkBgRightHalfOpen});
            $("#relations-next").animate({"right": relationsNextIconInitialPosition});
            completionFlag = 0;
        }
        processPageState(completionFlag);
    });

    $(window).on('beforeunload', function (e) {
        if (completionFlag == 0) {
            processPageState(completionFlag);
        }
    });

}

function decorateTableOfContents() {
    if ((window.location.href).toLowerCase().indexOf("toc.html") != -1 ||
        (window.location.href).toLowerCase().indexOf("index.html") != -1) {
        jQuery.get(eBookConfig.ajaxURL + 'getAllCompletionStatus', function (data) {
            if (data != "None") {
                subChapterList = $.parseJSON(data);

                var allSubChapterURLs = $("#main-content div li a");
                $.each(subChapterList, function (index, item) {
                    for (var s = 0; s < allSubChapterURLs.length; s++) {
                        if (allSubChapterURLs[s].href.indexOf(item.chapterName + "/" + item.subChapterName) != -1) {
                            if (item.completionStatus == 1) {
                                $(allSubChapterURLs[s].parentElement).addClass("completed").append('<span class="infoTextCompleted">- Completed this topic on ' + item.endDate + "</span>").children().first().hover(
                                    function () {
                                        $(this).next(".infoTextCompleted").show();
                                    }, function () {
                                        $(this).next(".infoTextCompleted").hide()
                                    }
                                );
                            } else if (item.completionStatus == 0) {
                                $(allSubChapterURLs[s].parentElement).addClass("active").append('<span class="infoTextActive">Last read this topic on ' + item.endDate + "</span>").children().first().hover(
                                    function () {
                                        $(this).next(".infoTextActive").show();
                                    }, function () {
                                        $(this).next(".infoTextActive").hide()
                                    }
                                );
                            }
                        }
                    }
                });

            }
        });
        data = {course: eBookConfig.course};
        jQuery.get(eBookConfig.ajaxURL + 'getlastpage', data, function (data) {
            if (data != "None") {
                lastPageData = $.parseJSON(data);
                if (lastPageData[0].lastPageChapter != null) {
                    $("#continue-reading").show().html('<div id="jump-to-chapter" class="alert alert-info" ><strong>You were Last Reading:</strong> ' + lastPageData[0].lastPageChapter + ((lastPageData[0].lastPageSubchapter) ? ' &gt; ' + lastPageData[0].lastPageSubchapter : "") + ' <a href="' + lastPageData[0].lastPageUrl + '?lastPosition=' + lastPageData[0].lastPageScrollLocation + '">Continue Reading</a></div>');
                }
            }
        });

    }
}

function enableCompletions() {

    getCompletions();
    showLastPositionBanner();
    addNavigationAndCompletionButtons();
    decorateTableOfContents();
}

// call enable user highlights after login
$(document).bind("runestone:login",enableCompletions);



function processPageState(completionFlag) {
    /*Log last page visited*/
    var currentPathname = window.location.pathname;
	if (currentPathname.indexOf("?") !== -1) {
		currentPathname = currentPathname.substring(0, currentPathname.lastIndexOf("?"));
	}
    var data = {
        lastPageUrl: currentPathname,
        lastPageScrollLocation: $(window).scrollTop(),
        completionFlag: completionFlag,
        course: eBookConfig.course
    };
    $(document).ajaxError(function (e, jqhxr, settings, exception) {
        console.log("Request Failed for " + settings.url)
    });
    jQuery.ajax({url: eBookConfig.ajaxURL + 'updatelastpage', data: data, async: false});
}

$.extend({
    getUrlVars: function () {
        var vars = [], hash;
        var hashes = window.location.search.slice(window.location.search.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    },
    getUrlVar: function (name) {
        return $.getUrlVars()[name];
    }
});
