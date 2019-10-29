function otnet(div) {

    // Create global      
    var otnet = {}; 
 
    /**
     * Build the main player 
     * @public 
     */
    otnet.video = function(options, callback) {

        console.log('options',options); 

        console.log('div',div); 

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

                otnet.createCookie('Auth', obj.data.token);

                var hls = new Hls();
                hls.loadSource(obj.data.src);
                hls.attachMedia(video);
                hls.on(Hls.Events.MANIFEST_PARSED,function() {
                    video.play();
                });

            }

        };
        xhr.open('GET', 'ajax.php?code=pvk4q3');
        xhr.send();

        video.addEventListener('loadedmetadata',function() {
            console.log('loaded');
            this.play();
        });
     
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