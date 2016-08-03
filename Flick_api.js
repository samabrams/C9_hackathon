var flickrKey = '4291af049e7b51ff411bc39565109ce6';
var flickrSecret = '08d3df2f4f1d7f62';
var requiredKeys = ['farm', 'server', 'id', 'secret'];
var avatarArea = null;
var photoArray = [];

function validateAvatarUrl(photoObject) {
    var valid = true;
    var r_keys = requiredKeys.length;
    for (var i = 0; i < r_keys; i++) {
        console.log('testing ' + requiredKeys[i], photoObject.hasOwnProperty(requiredKeys[i]));
        if (!photoObject.hasOwnProperty(requiredKeys[i])) {
            return false;
        }
    }
    return true;
}
function avatarUrlCreate(photoObject) {
    if (validateAvatarUrl(photoObject)) {
        return 'https://farm' + photoObject.farm + '.staticflickr.com/' + photoObject.server + '/' + photoObject.id + '_' + photoObject.secret + '_s.jpg';
    } else {
        return false;
    }
}
function loadAvatarData(person) {
    $.ajax({
        url: 'https://api.flickr.com/services/rest?method=flickr.photos.search&api_key=' + flickrKey + '&format=json&nojsoncallback=1&text=' + person,
        dataType: 'json',
        cache: false,
        crossDomain: true,
        success: function (response) {
            console.log('test', response);
            avatarArea = $('.avatarDiv');
            photoArray = response.photos.photo;
            for (var i = 0; i < 5; i++) {
                var randomNumber = Math.floor(Math.random() * photoArray.length);
                var url = avatarUrlCreate(photoArray[randomNumber]);
                console.log('url: ', url);
                if (!url) {
                    console.log('invalid url');
                    break;
                }
                var img = $('<img>', {
                    src: url
                });
                avatarArea.append(img);
            }
       }
     })
}


$(document).ready(function () {
        loadAvatarData('people');
});