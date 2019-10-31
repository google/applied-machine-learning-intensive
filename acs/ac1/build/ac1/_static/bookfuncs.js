/**
 *
 * User: bmiller
 * Original: 2011-04-20
 * Date: 2019-06-14
 * Time: 2:01 PM
 * This change marks the beginning of version 4.0 of the runestone components
 * Login/logout is no longer handled through javascript but rather server side.
 * Many of the components depend on the runestone:login event so we will keep that
 * for now to keep the churn fairly minimal.
 */

/*

 Copyright (C) 2011  Brad Miller  bonelake@gmail.com

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.

 */

//
// Chevron functions - Must correspond with width in runestone-custom-sphinx-bootstrap.css
//
$(function () {
	var resizeWindow = false;
    var	resizeWidth = 600;
	$(window).on('resize', function (event){
		if ($(window).width() <= resizeWidth && resizeWindow == false){
			resizeWindow = true;
			var topPrev = $("#relations-prev").clone().attr("id", "top-relations-prev");
			var topNext = $("#relations-next").clone().attr("id", "top-relations-next");
			$("#relations-prev, #relations-next").hide();
			var bottomPrev = topPrev.clone().attr("id", "bottom-relations-prev");
			var bottomNext = topNext.clone().attr("id", "bottom-relations-next");
			$("div#main-content > div").prepend(topPrev, topNext);
			$("#top-relations-prev, #top-relations-next").wrapAll("<ul id=\"top-relations-console\"></ul>");
			$("div#main-content > div").append(bottomPrev, bottomNext);
			$("#bottom-relations-prev, #bottom-relations-next").wrapAll("<ul id=\"bottom-relations-console\"></ul>");
		}
		if ($(window).width() >= resizeWidth + 1 && resizeWindow == true){
			resizeWindow = false;
			$("#top-relations-console, #bottom-relations-console").remove();
			$("#relations-prev, #relations-next").show();
		}
	}).resize();
});


//
// Page decoration functions
//

function addReadingList() {

    if (eBookConfig.readings){
        cur_path_parts = window.location.pathname.split('/');
        name = cur_path_parts[cur_path_parts.length-2] + '/' + cur_path_parts[cur_path_parts.length-1];
        position = eBookConfig.readings.indexOf(name);
        num_readings = eBookConfig.readings.length
        if (position == (eBookConfig.readings.length-1)){
            // no more readings
            l = $("<div />", {text: `Finished reading assignment. Page ${num_readings} of ${num_readings}.`});
        }
        else if(position >= 0){
            // get next name
            nxt = eBookConfig.readings[position+1];
            path_parts = cur_path_parts.slice(0,cur_path_parts.length-2 );
            path_parts.push(nxt);
            nxt_link = path_parts.join('/');
            l = $("<a />", {name : "link", class: "btn btn-lg ' + 'buttonConfirmCompletion'", href : nxt_link, text : `Continue to page ${position+2} of ${num_readings} in the reading assignment.`});
        }
        else{
            l = $("<div />", {text: "This page is not part of the last reading assignment you visited."});
        }
        $("#main-content").append(l);
    }

}


function timedRefresh() {
    timeoutPeriod = 4500000;  // 75 minutes
    $(document).bind("idle.idleTimer", function () {
        // After timeout period send the user back to the index.  This will force a login
        // if needed when they want to go to a particular page.  This may not be perfect
        // but its an easy way to make sure laptop users are properly logged in when they
        // take quizzes and save stuff.
        if (location.href.indexOf('index.html') < 0) {
            console.log("Idle timer - " + location.pathname)
            location.href = eBookConfig.app + '/default/user/login?_next=' + location.pathname;
        }
    });
    $.idleTimer(timeoutPeriod);
}

class PageProgressBar {

    constructor(actDict) {
        this.possible = 0;
        this.total = 1;
        if(actDict) {
            this.activities = actDict;
        } else {
            let activities = {'page': 0};
            $(".runestone").each(function (idx, e) {
                activities[e.firstElementChild.id] = 0;
            })
            this.activities = activities;
        }
        this.calculateProgress();
        if (window.location.pathname.match(/.*(index.html|toctree.html|Exercises.html|Glossary.html|search.html)$/i)) {
            $("#scprogresscontainer").hide();
        }
        this.renderProgress()
    }

    calculateProgress() {
        for (let k in this.activities) {
            if (k !== undefined) {
                this.possible++;
                if (this.activities[k] > 0) {
                    this.total++;
                }
            }
        }
    }


    renderProgress() {
        let value = 0;
        $("#scprogresstotal").text(this.total);
        $("#scprogressposs").text(this.possible);
        try {
            value = 100 * this.total / this.possible;
        } catch(e) {
            value = 0;
        }
        $( "#subchapterprogress" ).progressbar({
            value: value
        });
    }

    updateProgress(div_id) {
        this.activities[div_id]++;
        // Only update the progress bar on the first interaction with an object.
        if (this.activities[div_id] === 1) {
            this.total++;
            let val = 100 * this.total / this.possible;
            $("#scprogresstotal").text(this.total);
            $("#scprogressposs").text(this.possible);
            $("#subchapterprogress").progressbar("option","value", val);
            if (val == 100.0 && $("#completionButton").text().toLowerCase() === "mark as completed") {
                $("#completionButton").click();
            }
        }
    }

}

pageProgressTracker = {};

function handlePageSetup() {

    if (eBookConfig.useRunestoneServices) {
        jQuery.get(eBookConfig.ajaxURL + 'set_tz_offset', {
            timezoneoffset: (new Date()).getTimezoneOffset()/60
        });
    }

    if (eBookConfig.isLoggedIn) {
        mess = `username: ${eBookConfig.username}`
        if (! eBookConfig.isInstructor) {
            $("#ip_dropdown_link").remove()
        }
        $(document).trigger("runestone:login")
        addReadingList();
        // timedRefresh() ??
    } else {
        mess = 'Not logged in'
        $(document).trigger("runestone:logout")
    }
    $(".loggedinuser").html(mess);

    pageProgressTracker = new PageProgressBar(eBookConfig.activities);
    notifyRunestoneComponents();
}


function setupNavbarLoggedIn() {
    $('#profilelink').show();
    $('#passwordlink').show();
    $('#registerlink').hide();
    $('li.loginout').html('<a href="' + eBookConfig.app + '/default/user/logout">Log Out</a>')
}
$(document).bind("runestone:login", setupNavbarLoggedIn);

function setupNavbarLoggedOut() {
    console.log("setup navbar for logged out");
    $('#registerlink').show();
    $('#profilelink').hide();
    $('#passwordlink').hide();
    $('#ip_dropdown_link').hide();
    $('li.loginout').html('<a href="' + eBookConfig.app + '/default/user/login">Login</a>')
    $(".footer").html('user not logged in');
}
$(document).bind("runestone:logout",setupNavbarLoggedOut);


function notifyRunestoneComponents() {
	// Runestone components wait until login process is over to load components because of storage issues
	$(document).trigger("runestone:login-complete");
	if (typeof $pjQ !== 'undefined')
		$pjQ(document).trigger("runestone:login-complete");   // for parsons components which are using a different version of jQuery
}


// initialize stuff
$(document).ready(function() {
    if (eBookConfig ) {
        handlePageSetup();
    } else {
        if (typeof eBookConfig === 'undefined') {
            console.log("eBookConfig is not defined.  This page must not be set up for Runestone");
        }
    }
});

// misc stuff
// todo:  This could be further distributed but making a video.js file just for one function seems dumb.
$(document).ready(function() {
  // add the video play button overlay image
  $(".video-play-overlay").each(function() {
    $(this).css('background-image', "url(\'{{pathto('_static/play_overlay_icon.png', 1)}}\')")
    });

  // This function is needed to allow the dropdown search bar to work;
  // The default behaviour is that the dropdown menu closes when something in
  // it (like the search bar) is clicked
  $(function() {
    // Fix input element click problem
    $('.dropdown input, .dropdown label').click(function(e) {
      e.stopPropagation();
      });
  });
});
