function onPlayerStateChange(event) {
    let rb = new RunestoneBase();
    let videoTime = event.target.getCurrentTime();
    let data = {
        'event': 'video',
        'div_id': event.target.getIframe().id
    }
    if (event.data == YT.PlayerState.PLAYING) {
        console.log("playing " + event.target.getIframe().id );
        data.act = 'play:' + videoTime;
    } else if (event.data == YT.PlayerState.ENDED) {
        console.log("ended " + event.target.getIframe().id);
        data.act = 'complete';
    } else if (event.data == YT.PlayerState.PAUSED) {
        console.log("paused at " + videoTime );
        data.act = 'pause:' + videoTime;
    }
    rb.logBookEvent(data);
  }
   
//Callback function to load youtube videos once IFrame Player loads
function onYouTubeIframeAPIReady() {
	let videolist = $(".youtube-video");
	videolist.each( function(i, video) {
        let playerVars = {}
        playerVars['start'] = $(video).data("video-start");
        if($(video).data("video-end") != -1)
        playerVars['end'] = $(video).data("video-end");
		let player = new YT.Player($(video).data("video-divid"), {
			'height': $(video).data("video-height"),
			'width': $(video).data("video-width"),
			'videoId': $(video).data("video-videoid"),
			'playerVars': playerVars,
			'events': {
				'onStateChange': onPlayerStateChange
			}
		});
	});
}


//Need to make sure the YouTube IFrame Player API is not loaded until after
// all YouTube videos are in the DOM. Add a script tag with it after document is loaded
$(function(){
   let script = document.createElement("script"); 
   script.src = 'https://www.youtube.com/player_api'; 
   document.body.appendChild(script); 
});