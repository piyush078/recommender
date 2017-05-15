//   function to show the details of the searched song onto the webpage
function addSong(self) {

    $("#search-result ul").html("");
    $("#song-review .liked").hide();
    $("#song-review .like").fadeIn();
    $("#song-review .play").fadeIn();

    //   Change the name of the song and the artist
    $("#song-info-name").text(self.find("div.search-name span.value").text());
    $("#song-info-artist").text(self.find("div.search-artist span.value").text());
    $("#song-img img").attr("src", self.attr("medium-img"));
    $("#song-link").attr("value", self.attr("link"));
    $("#song-small-img").attr("value", self.attr("small-img"));
    $("#song-play").attr("href", self.attr("link"));
}

//   Process data to show the search results
function processData(dataObject){

    //   process the API and display the search results
    var tracksArray = dataObject.results.trackmatches.track,
        tracksNum = (tracksArray.length > 5) ? 5 : tracksArray.length,
        content = "";

    for(num = 0; num < tracksNum; ++num){
        content += "<li link='" + tracksArray[num].url + "' small-img=" + tracksArray[num].image[0]["#text"] + " medium-img='" + tracksArray[num].image[2]["#text"] + "' onclick='addSong($(this))'>" +
                        "<div class='search-img'><img src='" + tracksArray[num].image[0]["#text"] + "' /></div>" +
                        "<div class='search-info'>" +
                            "<div class='search-name'><span class='prop'>Song&nbsp;-</span>&nbsp;<span class='value'>" + tracksArray[num].name + "</span></div>" +
                            "<div class='search-artist'><span class='prop'>Artist&nbsp;-</span>&nbsp;<span class='value'>" + tracksArray[num].artist + "</span></div>" +
                        "</div>" +
                    "</li>";
    }
    $("#search-result ul").html(content);
}

//   function to show the search results
function searchResults() {

    //   Search String
    var searchString = $("#search").val();
    if(searchString !== null && searchString !== ""){
        $.ajax({
            type: "GET",
            data: {
                method: "track.search",
                track: searchString,
                api_key: "8224b02f589976bcca40ae9ab66a1a7c",
                format: "json"
            },
            url: "http://ws.audioscrobbler.com/2.0/",
            dataType: "json",
            success: function(data){
                processData(data);
            },
            error: function(jqr, status, error){
                $("#search-result ul").html("<li><div class='search-name'><span class='prop'>Something went wrong</span></div></li>");
            }
        });
    }else{
        $("#search-result ul").html("");
    }
}

//   function to search the song by clicking on song
function searchSong(name) {
    $("#offline-queue").slideUp();
    $(".top-nav").css("display", "none");
    $("#search-input").css("display", "block");
    $("#search").attr("value", name);
    searchResults();
}

$(document).ready(function(){

    //   show search bar
    $("#search-opt").on("click", function() {
        $(".top-nav").css("display", "none");
        $("#search-input").css("display", "block");
    });

    $(".close").on("click", function(){
        $(".top-nav").css("display", "block");
        $("#search-result ul").html("");
        $("#search-input").css("display", "none");
    });

    //   Searching a song
    $("#search").on("keyup", searchResults);

    //   If the Like Button is clicked
    $("#song-review .like").on("click", function(){

        //   Add the song record when a Like for a song is clicked
        $.ajax({
            type: "GET",
            data: {
                link: $("#song-link").attr("value"),
                name: $("#song-info-name").text(),
                artist: $("#song-info-artist").text(),
                img: $("#song-small-img").attr("value")
            },
            url: "http://localhost:3000/process/addsong",
            success: function(data){
                if(data === "success") {
                    $("#song-review .like").hide();
                    $("#song-review .liked").show();
                }else if(data === "error"){
                    showMessage("There was a Problem liking the Song");
                }
            },
            error: function(jqr, status, error){
                showMessage("There was a Problem liking the Song");
            }
        });

    });

});