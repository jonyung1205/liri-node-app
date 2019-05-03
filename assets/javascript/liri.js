// Variable for axios
var axios = require('axios')

// Spotify search
var Spotify = require('node-spotify-api');
var spotify = new Spotify({
    id: "b75663cadbec4d8a82b73efcb78d8107",
    secret: "ad0eeab61e35471cb08014af3eddd297"
});
var search = ""
for (var i = 3; i < process.argv.length; i++) {
    search += process.argv[i] + " "
}

console.log(search)

if (process.argv[2] == "spotify-this") {
    searchSong()

    // Make a function for Spotify
    function searchSong() {
        console.log("searchSong")
        spotify
            .search({
                type: 'track',
                query: search
            })
            .then(function (data) {

                var songs = data.tracks.items;
                for (var i = 0; i < songs.length; i++) {
                    // Console logging song information
                    console.log("=====================================");
                    console.log("Artist name: " + songs[i].artists[0].name);
                    console.log("Song title: " + songs[i].name);
                    console.log("Track number: " + songs[i].track_number);
                    console.log("Album: " + songs[i].album.name);
                    console.log("Release date: " + songs[i].album.release_date);
                    console.log("Album type: " + songs[i].album.album_type);
                    console.log("Preview song: " + songs[i].preview_url);
                    console.log("=====================================");
                }
            })
            .catch(function (err) {
                console.log(err);
            })
    }

} else if (process.argv[2] == "movie-this") {
    findMovie()

    // Make a function for OMDB
    function findMovie() {
        console.log("findMovie")
        if (search === undefined) {
            search = "Mr. Nobody";
        }
        var omdbUrl = "http://www.omdbapi.com/?t=" + search + "&plot=full&tomatoes=true&apikey=trilogy";
        console.log(omdbUrl)
        axios.get(omdbUrl)
            .then(function (data) {
                console.log(data)
                var movies = data.data
                // Console logging movie information
                console.log("=====================================");
                console.log("Title:" + movies.Title);
                console.log("Year:" + movies.Year);
                console.log("Rated:" + movies.Rated);
                console.log("IMDB Rating:" + movies.imdbRating);
                console.log("Rotton Tomatoes Rating:" + movies.Ratings[1].Value);
                console.log("Country:" + movies.Country);
                console.log("Language:" + movies.Language);
                console.log("Plot:" + movies.Plot);
                console.log("Actors:" + movies.Actors);
                console.log("=====================================");
            });
    }
    if (process.argv[2] == "concert-this") {
        findConcert()

        // Make a function for Ticketmaster
        function findConcert() {
            console.log("findConcert");
        }
        var ticketmaster = require('ticketmaster');
        ticketmaster('GGXwPClpLpGDz9zNM6S6I50aFNjBa83R').discovery.v2.event.all()
        console.log(ticketmaster)
        axios.get(ticketmaster)
            .then(function (result) {
                console.log(result)
                var concerts = result.result
                for (i = 0; i < concerts.length; i++) {
                    // Variable for time and date
                    var inputDate = result.data[i].dateTime;
                    var dateTime = moment(inputDate).format("MM DD YYYY");
                    // Console logging event information
                    console.log("=====================================");
                    console.log("Venue" + concerts.data[i].venue.name);
                    console.log("City" + concerts.data[i].venue.city);
                    console.log("Date" + dateTime);
                    console.log("=====================================");
                }
            });
    }
}