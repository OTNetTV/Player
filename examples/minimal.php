<!doctype html>
<html>
<head>
    
    <meta charset="utf-8">
    <title>OTNet.tv Demo</title>

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

    <link href="../dist/otnet.css" rel="stylesheet">

</head>
<body>

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      
        <a class="navbar-brand" href="#">Minimal Demo</a>
        
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

    </nav>

    <div class="container-fluid">

        <div class="mx-auto"><p></p></div>

        <div class="row">

            <div class="col-1"><p></p></div>

            <div class="col-10">
                
                <video id="videojs-player" class="video-js  vjs-16-9 vjs-default-skin" controls muted poster="https://d3edqwp3msshbp.cloudfront.net/00000109.jpg">

                    <source src="https://d3edqwp3msshbp.cloudfront.net/aladdin-web-optimised.mp4" type='video/mp4'>
                    <track kind='captions' src='https://s3bubble-tests.s3.amazonaws.com/timed.vtt' srclang='en' label='English' />
                    
                </video>

            </div>

            <div class="col-1"><p></p></div>

        </div>

        <div class="mx-auto"><p></p></div>

    </div>
    
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>

    <script src="../dist/otnet.js"></script>
    <script>

        otnet('videojs-player');
        /*var player = videojs('videojs-player',{
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

        });*/

    </script>
</body>
</html>