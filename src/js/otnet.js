function otnet(div) {

    // Create global      
    var otnet = {}; 
 
    /**
     * Build the main player 
     * @public 
     */
    otnet.video = function(options, callback) {

        // Check for video element
        if(!(div instanceof Element)){
            video = document.getElementById(div);  
        }

        // Check that the user has added the container to the document or clean up
        if (div === null) {
            console.log("ERROR: Please make sure your html div has a unique id element");
            return;
        }

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {

            if (xhr.readyState === 4){

                var obj = JSON.parse(xhr.responseText);

                console.log('obj',obj);
                otnet.videojs(obj.data);

            }

        };
        xhr.open('GET', 'http://local.prototyping.com/otnet/server/proxy.php?code=pywuhe');
        xhr.send();
     
    };

    otnet.videojs = function(data) {

    	console.log('videojs...', data);

    	if(data.content.media.length === 0){

            alert('We could not find any media please make sure you have added media to this player it will use the ref default');
            return;
        }

        var media = data.content.media.filter(function (entry) {

            entry.type = entry.mimeType;
            return entry.ref === 'default';
        
        });
        
        var player = videojs(div,{
            html5: {
                hls: {
                    overrideNative: true // NEW OVERIDE NATIVE::
                } 
            },
            inactivityTimeout: 0,
            playbackRates: [0.5, 1, 1.5, 2],      
            controlBar: {
                volumePanel: {
                    inline: false
                }
            }
        }, function(){

            console.log('Ready...');

            otnet.setTracks(data.content.tracks, this, 'captions');

            otnet.setTracks(data.content.tracks, this, 'subtitles');

            otnet.setTracks(data.content.tracks, this, 'chapters');

            //otnet.setAds(media, this);

        });

        player.addClass('vjs-otnet'); 

        player.poster(otnet.getPoster(data.images, 'landscape'));

        //data.content.media[0].type = data.content.media[0].mime_type;
        player.src(media);

    };

    otnet.getPoster = function(data, ref) {

    	var poster = data.filter(function (entry) {
                
            return entry.ref === ref;
        
        });

        if(poster.length > 0){

            return poster[0].src;

        }else{

            console.info('No Poster');
        }

        return;

    };

    otnet.setTracks = function(data, player, kind) {

    	var tracks = data.filter(function (entry) {
                
            return entry.kind === kind;
        
        });

        if(tracks.length > 0){

            for (var i = tracks.length - 1; i >= 0; i--) {
                        
                player.addRemoteTextTrack(tracks[i]);

            }

        }else{

            console.info('No ' + kind);
        }

        return;

    };

    otnet.setAds = function(media, player) {

    	// Check ads
        if(media[0]){

            if(media[0].hasOwnProperty('advertisements') && media[0].advertisements != ''){

                player.ima({
                    id: 's3bubble-video',
                    adTagUrl: media[0].advertisements 
                });

            }

        }

        return;

    };

    otnet.createCookie = function(name, value, days) {
        var expires;
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            expires = "; expires="+date.toGMTString();
        }
        else {
            expires = "";
        }
        document.cookie = name+"="+value+expires+"; path=/";
    };

    return otnet;

}