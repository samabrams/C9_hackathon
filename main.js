/**
 * Created by rosemariegonzales on 8/2/16.
 */

var mainTextDivBottom;
var option1OuterLabelDiv, option2OuterLabelDiv, option1InnerLabelDiv, option2InnerLabelDiv;
var question, option1, option2, option1ChosenText, option2ChosenText;
var googleMap;//variable used to create Google Maps object
var googleService;//variable used to create new Google Service object
var losAngeles = {lat: 34.0522, lng: -118.2437};//sets the lattitude and longtitude for Los Angeles
var nextFunction;
var place;//stores the randomly picked object from results generated by the googleTextSearch function
var placeName;
var placeNameDiv;
var placeImageURL;
var placeImage;
var placeDiv;
var songArray = [];
var typeOfSong = "aint too proud";
var userAvatar;

//Initialize Google Map and sets the location to the city of Los Angeles
function initializeMap() {
    googleMap = new google.maps.Map(document.getElementById('map'), {
        center: losAngeles,
        zoom: 17
    });
}

//Google Text Search Function - based on a string search
function googleTextSearch(googleQueryValue) {
    googleService = new google.maps.places.PlacesService(googleMap);
    googleService.textSearch({
        location: losAngeles,
        radius: 1000,
        query: googleQueryValue
    }, processResults);

}

//Function to call in order to process results from the googleTextSearch function
//Images and html elements displayed as player's options/choices are dynamically created from this function
function processResults(results, status) {
    if (status !== google.maps.places.PlacesServiceStatus.OK) {
        return;
    } else {
        //Randomly pick a place from the results based on player's choice
        var resultsIndex = Math.floor(Math.random() * results.length);
        place = results[resultsIndex];
        placeName = place.name;
        placeNameDiv = $('<div>').addClass('innerTextDiv innerTextDivSmall col-xs-10');
        placeNameDiv.append("<p>").text(placeName);
        placeImageURL = place.photos[0].getUrl({'maxWidth': 500, 'maxHeight': 500});
        placeImage = $('<img>').attr('src', placeImageURL);
        placeDiv = $('<div>').addClass('optionDiv col-xs-4');
        placeDiv.append(placeImage, placeNameDiv);
        $('.mainContent').append(placeDiv);
        $(placeDiv).click(function () {
            if ($(this).is('.optionDiv:last-child')) {
                //handle second option clicked
                $('.optionChosen').text(option2ChosenText);
                $('#chosenOptionModal').modal();
            }
            else {
                //handle first option clicked
                $('.optionChosen').text(option1ChosenText);
                $('#chosenOptionModal').modal();
            }
        });
        console.log('results array: ', results);
        console.log('results array length: ', results.length);
        console.log('random place: ', place.name);
        console.log(placeName, placeImageURL);
    }
}

//Adds Google Logo to the page as required by Google when using Google API
function poweredByGoogle() {
    var googleLogoDiv = $('<div>');
    var googleLogo = $('<img>').attr('src', 'images/powered_by_google_on_white.png');
    googleLogoDiv.append(googleLogo);
    $('body').append(googleLogoDiv);
}
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
            q: typeOfSong,
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
            playPause();
        }

    });
}
function clearMainContent() {
    $('.mainContent > *').remove();


}
function avatarClicked() {
    userAvatar = $(this);
    $('.assignedAvatar').removeClass("assignedAvatar");
    userAvatar.addClass('assignedAvatar');
}
function buildTemplate(avatar, userName) {
    avatar.removeClass();
    avatar.addClass('userAvatarDiv col-xs-1');
    avatar.children().addClass('avatarImage');
    var avatarDiv = $('<div class="userAvatar">');
    var userName = $('<p id="userName">').html(userName);
    avatarDiv.append(avatar);
    avatar.append(userName);
    $('#header').append(avatarDiv);
    mainTextDivBottom = $('<div>').addClass('outerTextDiv outerTextDivLarge col-xs-12');
    mainTextDivTop = $('<div>').addClass('innerTextDiv innerTextDivLarge col-xs-11');
    $(mainTextDivBottom).append(mainTextDivTop);
    option1OuterLabelDiv = $('<div>').addClass('outerLabelDiv col-xs-4');
    option1InnerLabelDiv = $('<div>').addClass('innerLabelDiv col-xs-10');
    option1OuterLabelDiv.append(option1InnerLabelDiv);
    option2OuterLabelDiv = $('<div>').addClass('outerLabelDiv col-xs-4');
    option2InnerLabelDiv = $('<div>').addClass('innerLabelDiv col-xs-10');
    option2OuterLabelDiv.append(option2InnerLabelDiv);
    $('.mainContent').append(mainTextDivBottom, option1OuterLabelDiv, option2OuterLabelDiv);
    $(option1OuterLabelDiv).click(function () {
        //handle first option clicked
        $('.optionChosen').text(option1ChosenText);
        $('#chosenOptionModal').modal();
    });
    $(option2OuterLabelDiv).click(function () {
        //handle second option clicked
        $('.optionChosen').text(option2ChosenText);
        $('#chosenOptionModal').modal();
    });
}
function clearOptionDivs() {
    $('.optionDiv').remove();
}
function breakfastTime() {
    clearOptionDivs();
    question = $('<h2>').text('You wake up to the light of California sunshine pouring through your hotel window. You’re hungry. Breakfast?').addClass('question');
    option1 = 'Pancakes';
    option2 = 'Eggs';
    option2ChosenText = 'It’s LA, you figure, so you go with the Huevos Rancheros. They’re good. You think they’re better than they are at home, but you wonder if you’re just telling yourself that.';
    option1ChosenText = 'Pancakes, yes! Not very LA, maybe, and sure, there are a hundred places back home with pancakes at least as good, but they’re comforting all the same. You feel like you’ve got your bearings in California now. You’re ready for the day.';
    $(mainTextDivTop).append(question);
    $(option1InnerLabelDiv).text(option1);
    $(option2InnerLabelDiv).text(option2);
    googleTextSearch('pancakes');
    googleTextSearch('breakfast eggs');
    nextFunction = morningActivity;
}
function morningActivity() {
    clearOptionDivs();
    question.text('Your stomach is full, and the local establishments are starting to open. Where to?');
    option2 = 'Museum';
    option1 = 'Art Gallery';
    option2ChosenText = 'The museum is pretty empty. You beat the crowd, it seems. You have a nice time perusing the artifacts without the pressure to move on quickly.';
    option1ChosenText = 'LA artists are doing things a little differently, you decide. You’re not sure if you get it. But there’s not much of a crowd yet, so you get to take your time pondering.';
    $(option1InnerLabelDiv).text(option1);
    $(option2InnerLabelDiv).text(option2);
    googleTextSearch('museum');
    googleTextSearch('art gallery');
    nextFunction = morningBeverage;
}
function morningBeverage() {
    question = 'Breakfast, check. ' + variableTBD + ', check. But now you’re starting to feel the dry heat of a Southern California summer. What kind of refreshment are you craving?';
    option1 = 'Juice at ';
    option2 = 'Long Island Iced Tea at ';
    option1ChosenText = 'You go for a nice juice blend. Something with oranges and, weirdly, avocados. When in Rome, right? The girl behind the counter keeps coughing into her hand, though. Gross.';
    option2ChosenText = 'You’re liking California, but you think you might like it a little more if you were a lot drunker. You grab a Long Island Iced Tea for a quick jump start, and you meet a sweaty, conversational man. You enjoy the conversation well enough, but you kinda can’t stop thinking about how sweaty he is. You’re not sure it’s normal.';
}
function lunchTime() {
    question = 'You’re a little ' + variableTBD + ' now, and it’s woken your appetite. Which California classic do you want for lunch?';
    option1 = 'Tacos at ';
    option2 = 'In-N-Out';
    option1ChosenText = 'Ok, you get it. Every part of this taco is the best you’ve ever had. How is this the same price as Taco Bell? Not to mention, the line wasn’t even that bad!';
    option2ChosenText = 'You order as many things as you can remember from the Secret Menu. You feel like a local. You thought it’d be jam packed for a summer lunch, but you get through the drive thru in 15 minutes or so. You’re starting to think you picked the perfect time to visit.';
}
function afternoonActivity() {
    question = 'Lunch has made you a little sleepy, so you’re ready for a leisurely afternoon. Where should you go?';
    option1 = '';
    option2 = '';
    option1ChosenText = 'Again, no one is really in the park, but this time you can’t blame them. It’s so damn hot. What are you doing outside right now? Are you stupid? Do you hate yourself? You find a bench and have some existential sweating time';
    option2ChosenText = 'You’d heard great things about this little bookstore, but it seems like you’re the only one who heard great things. You get to scour its shelves by your lonesome, and you stay well away from the clerk, who’s visibly sick. He seems fine with that. He hardly moves the whole time you’re there.';
}
function dinnerTime() {
    question = 'The day’s activities have led you to a natural conclusion: you need noodles. But which kind?';
    option1 = 'Thai at ';
    option2 = 'Italian at ';
    option1ChosenText = 'There are people here this time, but they don’t seem that into the food. They poke at it occasionally, but they spend most of their time leaning against the wall beside their tables.';
    option2ChosenText = 'Another sparse crowd. You wonder what’s going on, but you decide that Italian is probably just a weird choice for LA. The noodles are solid though. You’re satisfied.';
}
function afterDinnerDrinks() {
    question = 'Okay, this is what it’s all about. Time to experience the LA nightlife. Drinks first, but beer or liquor?';
    option1 = 'Beer at  ';
    option2 = 'Cocktails at ';
    option1ChosenText = 'You drink five or six or eight or ten beers over the course of a couple of hours, and you decide the other three dudes in the bar are your best friends.';
    option2ChosenText = 'There are only a few people at the bar, but you strike up a conversation with one of them, and it goes… okay. But as you both get drunker, it seems more and like you’re fighting. Doesn’t seem like you’ll be taking this one back to the hotel.';
}
function nightClub() {
    question = variableTBD + 'Which club feels like your style';
    optionChosenText = 'This club really feels like the one. You’re feeling great about your chances.';
}
function choosePartner() {
    question = 'Your confidence is soaring. You feel like you have your pick of anyone in the club. Who do you try your hand with?';
    option1ChosenText = 'He’s really picking up what you’re putting down. He’s sweating a lot, but hey, sometimes that’s what happens when you dance. You decide to bring him back to the hotel.';
    option2ChosenText = 'Your moves are working. You love it. She loves it. She’s not saying a lot, but she does agree to go back to your hotel. It’s cool, you like quiet girls.';
}
function waterOrMedicine() {
    question = 'You’re back at the hotel. Things start to pick up, but your partner needs to take a break. (She/he) lies down on your couch. (She/he) really doesn’t seem to be feeling well. How do you help?';
    option1 = 'Get water from the kitchen';
    option2 = 'Get medicine from the bathroom';
    optionChosenText = 'You come back from the ' + variableTBD + '. Your couch is empty. Lame. They could’ve just told you if they weren’t into it.';
}
function respondToZombie() {
    question = 'You open the door to your hotel room just to check, and there ' + variableTBD + ' is, facing away from you, a little hunched, breathing heavily. You place a concerned hand on ' + variableTBD + ' shoulder, and ' + variableTBD + ' turns around. ' + variableTBD + ' looks way different. You wonder how drunk you really were. You ask how ' + variableTBD + ' feeling, but ' + variableTBD + ' answer isn’t in English. It doesn’t even really seem human. You don’t know what’s happening, but you’re scared, really scared. How do you handle it?';
    option1 = 'Try to run';
    option2 = 'Shit yourself';
    option1ChosenText = 'You try to run, but where do you run? ' + variableTBD + ' in the doorway, and you’re on the 5th floor. You try to rush past ' + variableTBD + ', and you make a nice move, but as you pull away, you feel the tail of your shirt pull against you. You turn your head, and ' + variableTBD + ' pulls you toward ' + variableTBD + '. You didn’t realize ' + variableTBD + ' was so strong.';
    option2ChosenText = 'You freeze. You want to run or do something, anything, but you feel yourself lose control of your bowels. Before you can close the door, ' + variableTBD + ' reaches out and clasps a surprisingly strong hand around your throat.';
}
function zombieBreakfastTime() {
    question = 'You wake up to the light of California sunshine pouring through your hotel window. You’re hungry. Breakfast?';
}
$(document).ready(function () {
    listenAjax();
    $('#playButton').click(playPause);
    $('.startButton').click(function () {
        var newAvatar = $('.assignedAvatar');
        var userName = $('.nameInput').val();
        clearMainContent();
        buildTemplate(newAvatar, userName);
        breakfastTime();
    });
    $('.continueButton').click(function(){
        nextFunction();
    });
    initializeMap();
    poweredByGoogle();
    $(".avatarDiv").click(avatarClicked);
});
