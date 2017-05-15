//   function to store the record of current song
function addOfflineSong(name) {

    //   Add the song
    $.ajax({
        type: "GET",
        data: {
            name: name
        },
        url: "http://localhost:3000/process/newoffline"
    });
}

//   function to update the progress bar as the song progresses
function updateProgress(audioLength, currentTime) {
    var barSize = $("#footer").width(),
        progressPercentage = currentTime / audioLength;

    $("#progress-bar").css("width", barSize * progressPercentage);
}

//   function to choose only allowed music files
function returnValidity(songObject) {
    if(songObject.type === "audio/mp3" || songObject.type === "audio/x-m4a" || songObject.type === "audio/ogg" || songObject.type === "audio/flac") return true;
    else return false;
}

//   function to return the new time
function returnNewTime(x_cor, self) {
    var offset = x_cor - self.offset().left,
        barSize = $("#footer").width(),
        clickedPercentage = (offset * 100) / barSize,
        newTime = (clickedPercentage * audio.duration) / 100;

    return newTime;
}

//   function containing the actions done on clicking the buttons
function buttonsActions() {

    //   On clicking the Left Button
    $(".offline-but img.left").on("click", function(){
        if(currentSongIndex === -1){
            showMessage("Please select a song to play.");
            return;

        } else {
            if(shuffle === true) {
                shuffleSong();
            } else if(currentSongIndex === 0){
                currentSongIndex = songList.length - 1;
            }else{
                currentSongIndex--;
            }
        }
        playSong();
    });

    //   On clicking the Repeat Button
    $(".offline-but img.repeat").on("click", function(){
        if(repeat === false) repeat = true;
        else repeat = false;
        writeCounters();
    });

    //   On clicking the Shuffle Button
    $(".offline-but img.shuffle").on("click", function(){
        if(shuffle === false) shuffle = true;
        else shuffle = false;
        writeCounters();
    });

    //   On clicking the Right Button
    $(".offline-but img.right").on("click", function(){
        if(currentSongIndex === -1){
            showMessage("Please select a song to play.");
            return;

        } else {
            if(shuffle === true) {
                shuffleSong();
            } else if(currentSongIndex === songList.length - 1){
                currentSongIndex = 0;
            }else{
                currentSongIndex++;
            }
        }
        playSong();
    });

    //   On clicking the Pause Button
    $(".offline-but img.pause").on("click", function(){
        audio.pause();

        //   Hide the Pause button and show the Play button
        $(".offline-but img.pause").css("display", "none");
        $(".offline-but img.play").css("display", "inline-block");
    });

    //   On clicking the Play Button
    $(".offline-but img.play").on("click", function(){

        //   If no Song is in the Song List
        if(currentSongIndex === -1){
            showMessage("Please select a Song to play.");
        }else{
            audio.play();

            //   Hide the Play button and show the Pause button
            $(".offline-but img.play").css("display", "none");
            $(".offline-but img.pause").css("display", "inline-block");
        }
    });

    //   On clicking the Play Button
    $(".offline-but img.stop").on("click", function(){

        //   If no Song is in the Song List
        if(currentSongIndex === -1){
            showMessage("No Song is selected.");
        }else{
            playSong();
            audio.pause();

            //   Hide the Pause button and show the Play button
            $(".offline-but img.pause").css("display", "none");
            $(".offline-but img.play").css("display", "inline-block");
        }
    });
}

//   function to show the counters
function writeCounters() {
    if(shuffle === true) {
        $(".shuffle-dis").text("ON");
    } else {
        $(".shuffle-dis").text("OFF");
    }

    if(repeat === true) {
        $(".repeat-dis").text("ON");
    } else {
        $(".repeat-dis").text("OFF");
    }
}

//   function containing the actions taken related to timer
function timerAction (){

    //   On hovering the Time bar
    $("#timer-bar").on("mouseenter", function(){
        $("#progress-bar").css("height", "10px");
    }).on("mouseleave", function(){
        $("#progress-bar").css("height", "5px");
    }).on("click", function(e){

        if(audio){
            var newTime = returnNewTime(e.clientX, $(this));
            audio.currentTime = newTime > audio.duration ? audio.duration : newTime;
            updateProgress(audio.duration, audio.currentTime);
        }

    }).on("mousemove", function(e){

        if(audio){
            var newTime = returnNewTime(e.clientX, $(this));
            newTime = newTime > audio.duration ? audio.duration : newTime;

            var minutes = Math.floor(newTime / 60),
                seconds = Math.floor(newTime % 60);

            minutes = (minutes < 10) ? ("0" + minutes) : minutes;
            seconds = (seconds < 10) ? ("0" + seconds) : seconds;
            $(this).attr("title", minutes + ":" + seconds);
        }
    });
}

//   shuffle the song index and play song
function shuffleSong() {
    var ele = Math.floor(Math.random() * songList.length);
    currentSongIndex = ele;
    playSong();
}

//   function to play the song
function playSong(){

    //   Get the Path of the new Song to be played
    var songPath = window.URL.createObjectURL(songList[currentSongIndex]);
    if(audio !== null) audio.pause();

    //   Create a new Audio Object and return it
    var tempAudio = new Audio(songPath);
    tempAudio.play();

    //   change the value in global audio object
    audio = tempAudio;

    //   Hide the Play button and show the Pause button
    $(".offline-but img.play").css("display", "none");
    $(".offline-but img.pause").css("display", "inline-block");

    //   Show the Name of the song
    $(".offline-name").text(songList[currentSongIndex].name);

    //   add the offline song and get the recommendations
    addOfflineSong(songList[currentSongIndex].name);
    offlineRecommendations(songList[currentSongIndex].name);
}

//   function to change the index
function changeIndex(self) {
    var newIndex = $("#offline-queue .queue-ele").index(self);
    currentSongIndex = newIndex;
    playSong();
}

//   Global Variables
var songList = [],
    currentSongIndex = -1,

    //   Shuffle and Repeat counters
    shuffle = false,
    repeat = true,

    //   Single Audio object
    audio = null;

$(document).ready(function(){

    //   write the counters
    writeCounters();

    //   script for offline player
    $(".add").click(function(e){
        $("#selector").click();
        e.preventDefault();
    });

    window.URL = window.URL || window.webkitURL;

    $("#selector").on("change", function(){

        var files = $(this)[0].files,
            invalid = false;

        //   Adding the files selected into a Queue
        for(num = 0; num < files.length; ++num){

            if(!returnValidity(files[num])){
                invalid = true;
                continue;
            }
            songList.push(files[num]);
            $("#offline-queue").append("<div class='queue-ele' onclick='changeIndex($(this))'>" + files[num].name + "</div>");
        }

        if(invalid === true){
            if(files.length === 1) showMessage("Please select a Song of supported format");
            else showMessage("Some file(s) were of unsupported format");
        }

        //   If the SongList consists of Songs
        if(songList.length !== 0){
            //   If a song is played FOR THE FIRST TIME
            if(currentSongIndex === -1){
                currentSongIndex = 0;
                playSong();
            }
        }
    });

    buttonsActions();
    timerAction();

    //   control the playing of the audio
    setInterval(function(){
        if(audio !== null){
            if(!audio.ended){
                updateProgress(audio.duration, audio.currentTime);
            }else{
                if(shuffle === true) {
                    shuffleSong();
                } else {
                    if(currentSongIndex === songList.length - 1) {
                        if(repeat === true) {
                            currentSongIndex = 0;
                            playSong();
                        } else {
                            audio.pause();
                        }
                    } else{
                        currentSongIndex++;
                        playSong();
                    }
                }
            }
        }
    }, 100);

    //   toggle the opening and closing of queue
    $("#open-list").click(function (){
        $("#offline-queue").css("margin-right", $("#offline-queue").css("width"));
        $("#offline-queue").addClass("transition");
        $("#offline-queue").css("margin-right", "0");
        $(this).css("display", "none");
    });

    $(".close-list").click(function(){
        $("#offline-queue").css("margin-right", "-" + $("#offline-queue").css("width"));
        $("#open-list").css("display", "block");
        $("#offline-queue").css("margin-right", "-20000px");
        $("#offline-queue").removeClass("transition");
    });

});