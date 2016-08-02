/**
 * Created by rosemariegonzales on 8/2/16.
 */
//Google Places API Key = "AIzaSyAJNuVmM9d3LzG36sdU2hJAEJPuYWH5DY0"

//Adds Google Logo to the page as required by Google when using Google API
function poweredByGoogle(){
    var googleLogoDiv = $('<div>');
    var googleLogo = $('<img>').attr('src','images/powered_by_google_on_white.png');
    googleLogoDiv.append(googleLogo);
    $('footer').append(googleLogoDiv);
}

var googleMap;
var googleService;
var infowindow;
var googleQueryValue = 'museum';//variable to store player choices; required parameter to search in Google Maps

//Initialize Google Map
function initializeMap() {
    var losAngeles = {lat: 34.0522, lng: -118.2437};//sets the lattitude and longtitude for Los Angeles

    googleMap = new google.maps.Map(document.getElementById('map'), {
        center: losAngeles,
        zoom: 17
    });
}
googleService = new google.maps.places.PlacesService(map);
service.textSearch({
    location: losAngeles,
    radius: 1000,
    query: 'museum'
}, processResults);

function processResults(results, status, pagination) {
    if (status !== google.maps.places.PlacesServiceStatus.OK) {
        return;
    } else {
        createMarkers(results);

        if (pagination.hasNextPage) {
            var moreButton = document.getElementById('more');

            moreButton.disabled = false;

            moreButton.addEventListener('click', function () {
                moreButton.disabled = true;
                pagination.nextPage();
            });
        }
    }
}

// function callback(results, status) {
//     if (status ==  google.maps.places.PlacesServiceStatus.OK){
//         console.log(results);
//         for (var i = 0; i < results.length; i++) {
//             var place = results[i];
//             createMarker(results[i]);
//         }
//     }
//     else{
//         console.log('callback error');
//     }
//     console.log('callback function called')
// }

function createMarkers(places) {
    var bounds = new google.maps.LatLngBounds();
    var placesList = document.getElementById('places');

    for (var i = 0, place; place = places[i]; i++) {
        var image = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
        };

        var marker = new google.maps.Marker({
            map: map,
            icon: image,
            title: place.name,
            position: place.geometry.location
        });

        placesList.innerHTML += '<li>' + place.name + '</li>';

        bounds.extend(place.geometry.location);
    }
    map.fitBounds(bounds);
}

$(document).ready(function(){
    initializeMap();
});
