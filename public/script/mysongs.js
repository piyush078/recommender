$(document).ready(function(){

    //   show the songs liked by the user
    $("#my-songs").html("<div class='instr' style='font-size:25px;'>Loading your songs..</div>");
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/process/getmysongs",
        success: function(data){

            if(data === "empty"){
                $("#my-songs").html("<div class='instr' style='font-size:25px;'>No Songs</div>");

            }else if(data === "error") {
                showMessage("Failed to load the songs.");
                $("#my-songs").html("<div class='instr' style='font-size:25px;'>Failed to load the Songs</div>");

            }else{
                showRecommendations(data, "#my-songs");
            }
        },
        error: function(jqr, status, error){
            showMessage("Failed to load the songs.");
            $("#my-songs").html("<div class='instr' style='font-size:25px;'>Failed to load the Songs</div>");
        }
    });
});