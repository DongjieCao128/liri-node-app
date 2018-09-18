require("dotenv").config();

var keys = require("./keys.js");
var request = require("request");
var moment = require("moment");
var fs = require("fs");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var search = process.argv.slice(3).join("+");

switch (command) {
    case "concert-this":
        concert();
        break;

    case "spotify-this-song":
        song();
        break;


    case "movie-this":
        movie();
        break;

    case "do-what-it-say":
        doIt();
        break;
}
function concert() {
    request('http://rest.bandsintown.com/artists/' + search + "/events?app_id=codingbootcamp", function (error, response, body) {
        if (!error && response.statusCode === 200) {

            var bodyArray = JSON.parse(body);
            if (bodyArray.length === 0) {
                console.log("No upcoming event" + search + ".");

            }
            else {
                console.log("name of venue: " + bodyArray[0].venue.name);
                // console.log(bodyArray[0].lineup);
                console.log("venue location: " + bodyArray[0].venue.city);
                console.log("data of event: " + bodyArray[0].datetime);

            }


        }

    });
}



function song(x) {
    spotify.search({ type: 'track', query: x, limit: 1 }, function (err, data) {


        console.log("artist name: " + data.tracks.items[0].album.artists[0].name);
        console.log("song name: " + (data.tracks.items[0].name));
        console.log("Link of Song: " + data.tracks.items[0].preview_url);
        console.log("album Name: " + data.tracks.items[0].album.name);
    })
}


function movie() {
    if (search === "") {
        search = "Mr.Nobody";
    }
    request("http://www.omdbapi.com/?t=" + search + "&apikey=trilogy", function (error, response, body) {
        if (!error && response.statusCode === 200) {

            console.log("Movie Title : " + JSON.parse(body));
            console.log("Movie Title: " + JSON.parse(body).Title);
            console.log("Year : " + JSON.parse(body).Year);
            console.log("imdb Rating: " + JSON.parse(body).imdbRating);
            console.log("Rating : " + JSON.parse(body).Ratings[1].Value);
            console.log("Country :" + JSON.parse(body).Country);
            console.log("Language :" + JSON.parse(body).Language);


        }



    });

}

function doIt() {

    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) throw err;
        console.log(data)
    //    var bar = data.slice(19, data.length-1);
var bar = data.slice(data.indexOf(',') +1, data.length-1);
       song(bar);
    });

    // spotify-this-song,"Closer"


   
}

