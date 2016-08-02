var songArray = [];
var iWant = {
    feel: 'dinner time'
};
var backgroundSong = $('#audio');

function playPause() {
    var audio = document.getElementById("audio");
    if (audio.paused) {
        audio.play();
        $('#playIcon').removeClass();
        $('#playIcon').addClass('glyphicon glyphicon-pause');

    } else {
        audio.pause();
        $('#playIcon').removeClass();
        $('#playIcon').addClass('glyphicon glyphicon-play');
    }
}

function listenAjax() {
    //calls query with music as only criteria first

    $.ajax({
        url: 'https://api.spotify.com/v1/search',
        data: {
            q: iWant.feel,
            type: 'track'
        },

        success: function (response) {
            console.log('spotify', response);

            for (i = 0; i < response.tracks.items.length; i++) {

                var tracks = response.tracks.items[i];

                var song = {
                    audio: tracks.preview_url
                };
                songArray.push(song);
                console.log(songArray[0]);
            }
            $('#audio').attr('src', songArray[0].audio);

        }

    });
}

$(document).ready(function(){
    $('#ajax_button').click(listenAjax);
    $('#playButton').click(playPause)

});