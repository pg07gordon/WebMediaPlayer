/**
 * Music App Singleton MAIN
 *
 * @copyright: (C) 2017 Gordon Niemann
 * @author: Gordon Niemann {@link mailto:pg07gordon@vfs.com}
 * @version: 0.4
 *
 * @summary: Framework Singleton Class to contain a Music App
 *
 */

var Song = (function() // Song Object (for playList array)
{
	
	function SongConstructor( theTitle, songPath ) 
	{

		var self = this;
		self.title = theTitle;
		self.path = songPath;

		function update( newTitle, newPath ) 
		{
			self.title = newTitle;
			self.path = newPath;
		};
	
	};
	return SongConstructor;
	
})();


/**  ES6

class Song {
    constructor( theTitle, songPath ) {

		this.title = theTitle;
		this.path = songPath;
	}
	
	populate( newTitle, newPath ) 
	{
		this.title = newTitle;
		this.path = newPath;
	};
}
 **/

/*
* @summary: Framework Singleton Class to contain a Music App
*/

var musicPlayer = (function() 
{
	function MPlayerClass() 
	{
		// the local object contains all the private members used in this class
		var __private__ = 
		{
		    done: false,
		    gobleSizeRatio: 1,
		    playList: [],
		    customUserPlayList: [],
	        playingSongIndex: 0,
	        buzzObj: undefined,
	        nextBuzzObj:undefined,
	        preload: false,
	        playing: false,
	        looping: false,
	        random: false,
	        isMobile: false,
	        volume: 30,
	        progress : 0
		};
	
		var my = __private__;

		this.init = function() 
		{
			var m = __private__;
			
			// Mobile Detect
			if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
				    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) m.isMobile = true;
		    
		    GetLocalPlayList();
		    GetSrvPlayList();
		    buildPlayList();  
		    buildSliderGUIs();
		    buildButtonsAndHandlers();
		}
		
    	function GetLocalPlayList() // gets local song paths
    	{
    		var m = __private__;
    		var localList = [];
    		
		    //TEMP LOCAL SONG Emulation (Future for Mobile Devices)
		    localList.push(new Song('Badger Badger Badger', 'localmusic/BadgerBadgerBadger.mp3'));
		    localList.push(new Song('Hitler War', 'localmusic/Hitler_War.mp3'));
		    localList.push(new Song('Soviet Anthemr', 'localmusic/SovietAnthem.mp3'));
		    
		    m.playList = localList;
    	}

    	function GetSrvPlayList() // asks server for song URLs and builds Song Objects and pushs them to playList[]
    	{		
    		var m = __private__;
			$.post("server/mediaPlayerSrv.php", {action: "run"}).then((data) =>
			{
				var newMusicList = JSON.parse(data).musicList;
				
				newMusicList.forEach(function(element)
				{
					m.playList.push(new Song(fileNameFromURL(element), element.substr(3), 0));
				});
				
				buildPlayList();
			});
    	}
		
    	function buildPlayList() // Builds song play buttons in playlist GUI
    	{
    	    var m = __private__;
    	    
    	    $("#MusicList").html("");

    	    for (var i = 0; i < m.playList.length; i++)
    	    {
    	        $("#MusicList").append('<button id="' + m.playList[i].title.replace(/-/g, '') + '" class="SongItem">' + (i + 1) + '. ' + m.playList[i].title + '</button>');

    	        if (i != m.playList.length - 1)
    	        {
    	        	$("#MusicList").append('<button id="' + m.playList[i].title.replace(/-/g, '') + '" class="SongDown">&#9660;</button>');
    	        }
    	        
    	        if (i != 0)
	        	{
    	        	$("#MusicList").append('<button id="' + m.playList[i].title.replace(/-/g, '') + '" class="SongUp">&#9650;</button>');
	        	}
    	        
    	        $("#MusicList").append('<div class="LineBreak"></div>');
    	    }

    	    $("#SongName").html(m.playList[m.playingSongIndex].title);
    	    
    	    $('button.SongItem').on('touchstart click', function (e)
    	    {
    	        e.stopPropagation(); e.preventDefault();
    	        
    	        var titleList = [];
    	        
    	        m.playList.forEach(function(element)
    	        {
    	        	titleList.push(element.title);
    	        });
    	        
    	        var newItem2Play = titleList.indexOf($(this).attr('id')); 
    	        
    	        if (newItem2Play != -1)
	        	{
    	        	 m.playingSongIndex = newItem2Play;
    	        	 m.preload = false;
    	        	 playNewSong();
	        	}
    	    });
    	}
    	
    	function buildSliderGUIs() // Builds Circle Sliders and related callback handlers
    	{
    	    var m = __private__;

    	    $("#DurationSlider").roundSlider({
    	        radius: 300 * m.gobleSizeRatio,
    	        width: 60 * m.gobleSizeRatio,
    	        handleSize: "+0",
    	        sliderType: "min-range",
    	        showTooltip: false,
    	        value: m.progress
    	    });

    	    $("#VolSlider").roundSlider({
    	        radius: 190 * m.gobleSizeRatio,
    	        width: 30 * m.gobleSizeRatio,
    	        circleShape: "quarter-top-right",
    	        sliderType: "min-range",
    	        showTooltip: false,
    	        value: m.volume
    	    });
    	    
    	    $("#DurationSlider").on("change", function ()
    	    {
    	        if (m.buzzObj != undefined && m.playing)
	        	{
    	        	m.progress = $("input[name=DurationSlider]").val();
    	        	m.buzzObj.setPercent(m.progress);
	        	}
    	        else
	        	{
    	        	$("#DurationSlider").roundSlider("setValue", m.progress);
	        	}
    	    });

    	    $("#VolSlider").on("change", function ()
    	    {
    	        m.volume = $("input[name=VolSlider]").val();
    	        
    	        if (m.buzzObj != undefined)
	        	{
    	        	m.buzzObj.setVolume(m.volume);
	        	}
    	    });
    	    
    	    if (m.isMobile)
	    	{
    	    	$("#Return2SongList").css("visibility", "visible");
	    	}
    	}
    	
    	function buildButtonsAndHandlers()  // Builds Button and related callback handlers, also hids/loads playlist/mediaplayer on mobile
    	{
    	    var m = __private__;

    	    $('#PlayPause').on('touchstart click', function (e) {
    	        e.stopPropagation(); e.preventDefault();

    	        if (m.buzzObj != undefined)
	        	{
	    	        if (m.playing) {
	    	        	m.buzzObj.pause();
	    	            $('#PlayPause').html("&#9654;");
	    	            m.playing = false;
	    	        }
	    	        else {
	    	        	m.buzzObj.play();
	    	            $('#PlayPause').html("&#10074;&#10074;");
	    	            m.playing = true
	    	        }
	        	}
    	        else
    	        {
    	        	playNewSong();
    	        }
    	    });

    	    $('#LastSong').on('touchstart click', function (e) 
    	    {
    	        e.stopPropagation(); e.preventDefault();

    	        m.preload = false;
    	        
    	        if (m.playingSongIndex == 0) 
    	        {
    	            m.playingSongIndex = m.playList.length - 1;
    	        }
    	        else 
    	        {
    	            m.playingSongIndex = m.playingSongIndex - 1;
    	        }
    	        
    	        playNewSong();
    	    });
    	    
    	    $('#NextSong').on('touchstart click', function (e) {
    	        e.stopPropagation(); e.preventDefault();
    	        playNextSong();
    	    });

    	    $('#Loop').on('touchstart click', function (e) {
    	        e.stopPropagation(); e.preventDefault();

    	        if (m.looping)
    	        {
    	        	$(this).css('background-color', 'initial');
    	            m.looping = false;
    	        }
    	        else
    	        {
    	        	$(this).css('background-color', 'red');
    	        	$('#Random').css('background-color', 'initial');
    	            m.random = false;
    	            m.looping = true;
    	        }
    	    });

    	    $('#Random').on('touchstart click', function (e) {
    	        e.stopPropagation(); e.preventDefault();

    	        if (m.random) 
    	        {
    	        	$(this).css('background-color', 'initial');
    	            m.random = false;
    	        }
    	        else 
    	        {
    	        	$(this).css('background-color', 'red');
    	        	$('#Loop').css('background-color', 'initial');
    	            m.looping = false;
    	            m.random = true;
    	        }
    	    }); 
    	    
    	    if (m.isMobile)
	    	{
        	    $('#Return2SongList').on('touchstart click', function (e) {
        	        e.stopPropagation(); e.preventDefault();
        	        
        	        $("PlayerWindow").css("visibility", "hidden");
        	        $("SongListWindow").css("visibility", "visible");

        	    }); 
        	    
        	    $('#Return2MediaPlayer').on('touchstart click', function (e) {
        	        e.stopPropagation(); e.preventDefault();
        	        
        	        $("SongListWindow").css("visibility", "hidden");
        	        $("PlayerWindow").css("visibility", "visible");
        	    }); 
	    	}
    	}

    	function playNextSong() // Updates song index (playingSongIndex) and calls playNewSong
    	{
    	    var m = __private__;

    	    if (m.looping)
    	    {
    	    	m.preload = false;
    	    }
    	    else if (m.random)
    	    {
    	    	var lastSongIndex = m.playingSongIndex;
    	    	
    	    	m.preload = false;
    	        m.playingSongIndex = Math.floor(Math.random() * (m.playList.length));
    	        
    	        // Make sure the same song is not played twice
    	        while(m.playingSongIndex == lastSongIndex)
	        	{
    	        	m.playingSongIndex = Math.floor(Math.random() * (m.playList.length));
	        	}
    	        
    	    }
    	    else if (m.playingSongIndex == m.playList.length - 1)
    	    {
    	        m.playingSongIndex = 0;
    	    }
    	    else
    	    {
    	        m.playingSongIndex = m.playingSongIndex + 1;
    	    }

    	    playNewSong();
    	}

    	function playNewSong() // Starts up new/next/preloaded song and setups progress and timer updates
    	{
    		var m = __private__;
    		
    		if (m.buzzObj == undefined || m.nextBuzzObj == undefined)
			{
    			m.nextBuzzObj = new buzz.sound(m.playList[0].path);
    			m.buzzObj = new buzz.sound(m.playList[0].path);
			}
    		else
			{
    			m.buzzObj.stop();
			}
    		
    		if (m.preload)
			{
    			m.preload = false;
    			m.buzzObj.unbind("timeupdate");
    			m.buzzObj = m.nextBuzzObj;
			}
    		else
			{
    			m.buzzObj = new buzz.sound(m.playList[m.playingSongIndex].path);
			}
    	    
    		var doOnce = true;
    		
    	    m.buzzObj.bind("timeupdate", function ()
    	    {
    	        m.progress = buzz.toPercent(this.getTime(), this.getDuration());
    	        $("#DurationSlider").roundSlider("setValue", m.progress);
    	        $("#TimeDisplay").html(buzz.toTimer(m.buzzObj.getDuration()) + " / " + buzz.toTimer(m.buzzObj.getTime()));
    	        
    	        if (m.buzzObj.getPercent() > 50 && m.buzzObj.getPercent() < 90 && doOnce)
	        	{
    	        	doOnce = false;
    	        	
    	        	if (m.playingSongIndex + 1 >=  m.playList.length - 1)
	        		{
    	        		m.nextBuzzObj = new buzz.sound(m.playList[0].path);
	        		}
    	        	else
	        		{
    	        		preloadSong();
	        		}
	        	}
    	    });
    	    
    	    m.buzzObj.setVolume(m.volume);
    	    m.buzzObj.bind("ended", function ()
    	    {
    	        playNextSong();
    	    });
    	    
    	    m.buzzObj.play();
    	    m.progress = 0;
    	    m.playing = true;
    	    $("#DurationSlider").roundSlider("setValue", m.progress);
    	    $('#PlayPause').html("&#10074;&#10074;");
    	    $("#SongName").html(m.playList[m.playingSongIndex].title);
    	    
	   		m.playList = [];
    		
		    GetLocalPlayList();
		    GetSrvPlayList();
    	    
		    setTimeout(function() // Server Timeout
		    {
		    	 buildPlayList();
		    }, 2000);

    	}
    	
    	function preloadSong() // Download Next Song into cash and pass it to nextBuzzObj if it can be 100% played.
    	{
    		var m = __private__;

    		$.get(m.playList[m.playingSongIndex + 1].path, function(data)
    		{
    			this.sound = new buzz.sound(m.playList[m.playingSongIndex + 1].path, {preload: true});
    		    
    		    this.sound.bind("error", function(e) 
    		    {
    		        console.log("Music Error: " + this.getErrorMessage());
    		        m.nextBuzzObj = new buzz.sound(m.playList[0].path);
    		        this.unbind("error");
    		    });
    		    
    		    this.sound.bind("canplaythrough",function()
	    		{  
    		    	m.nextBuzzObj = this;
    		    	m.preload = true;
    		    	console.log("next Song Preloaded");
    		    	this.unbind("canplaythrough");
	    		});
    		});
    	}
    	
    	function fileNameFromURL(songName) // Makes readable song names from filenames
    	{
    	    songName = songName.split('/').pop();
    	    songName = songName.substr(0, songName.lastIndexOf('.')) || songName;
    	    songName = songName.replace(/-/g, ' ');
    	    songName = songName.replace(/_/g, ' ');
    	    return songName;
    	}
    	
    	function saveUserPlayListSortOrder()
    	{
    		var m = __private__;
    		m.customUserPlayList = new Array();

    		for (var i = 0; i < m.playList.length; i++)
			{
    			m.customUserPlayList[i] = i;
			}

    		m.customUserPlayList.sort(function (a,b)
    		{
    		    return m.playList[a] - m.playList[b];
    		});
    	}
    }

	return new MPlayerClass();
})();  // Run the unnamed function and assign the results to app for use.

$(document).ready( function()  // MAIN - Define the set of private methods that you want to make public and return them
{
	musicPlayer.init();
});
