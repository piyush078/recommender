//   function to resize the song-img box with window dimensions
function updateHeight() {
    var width = $("#song-player-block #song-img").width();
    $("#song-player-block #song-img").css("height", width + "px");
}

//   function to show the details of the clicked song onto the webpage
function showSong(self) {

    $("#search-result ul").html("");
    $("#song-review .liked").hide();
    $("#song-review .like").fadeIn();
    $("#song-review .play").fadeIn();

    //   Change the name of the song and the artist
    $("#song-info-name").text(self.find("div.name").text());
    $("#song-info-artist").text(self.find("div.artist").text());
    $("#song-img img").attr("src", self.find("div.img img").attr("src").replace("i/u/34s", "i/u/174s"));
    $("#song-link").attr("value", self.find("a").attr("href"));
    $("#song-small-img").attr("value", self.find("div.img img").attr("src"));
    $("#song-play").attr("href", self.find("a").attr("href"));
}

$(document).ready(function(){

    //   show the specific block
    $(".blocks_head li").on("click", function(){
        var self = $(this);
        var hideEleID = $(this).attr("hide");

        if($("#" + hideEleID).css("display") === "none") {

            //   hide all the blocks
            $(".blocks li").each(function(){
                $(this).css("display", "none");
            });

            //   show the specific block
            $("#" + hideEleID).css("display", "block");

            //   make all the head inactive
            $(".blocks_head li").each(function(){
                $(this).removeClass("active");
            });

            //   make the clicked head active
            self.addClass("active");
        }
    });

    var listenWindow = true;
    $("#show-rec").on("click", function() {
        if(listenWindow === true) {
            $("#song-player-block").slideUp();
            $("#on-song-rec").slideDown();
            listenWindow = false;
        } else {
            $("#on-song-rec").slideUp();
            $("#song-player-block").slideDown();
            listenWindow = true;
        }
    });

    $(window).resize(updateHeight);
    updateHeight();
});