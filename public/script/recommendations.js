//   Process recommendation API
function showRecommendations(dataArray, wrapperEle){

    if(dataArray.length === 0) {
        $(wrapperEle).html("<div class='instr' style='font-size:25px;'>No Recommendations</div>");
        return;
    }

    //   process the API and display the recommendations
    var content = "";

    for(num = 0; num < dataArray.length; ++num) {
        content += "<div class='rec_block' onclick='showSong($(this));'>" +
                        "<a href='" + dataArray[num].song_link + "' target='_blank'><div class='img'><img src='" + dataArray[num].img + "' alt='Art' /></div>" +
                        "<div class='info'>" +
                            "<div class='name'>" + dataArray[num].name + "</div>" +
                            "<div class='artist'>" + dataArray[num].artist + "</div>" +
                        "</div>" +
                    "</a></div>";
    }

    $(wrapperEle).html(content);
}

function offlineRecommendations(name) {

    $("#off-rec-header").css("display", "block");
    $("#off-rec").html("<div class='instr'>Loading recommendations..</div>");
    $.ajax({
        type: "GET",
        data: {
            name: name
        },
        url: "http://localhost:3000/process/offrec",
        success: function(data){

            if(data === "error") {
                $("#off-rec").html("<div class='instr'>Failed to load the Recommendations</div>");
            } else if(data === "empty") {
                $("#off-rec").html("<div class='instr'>No Recommendations</div>");

            } else {
                //   process the API and display the recommendations
                var content = "";

                for(num = 0; num < data.length; ++num) {
                    content += "<div class='rec_block' onclick='searchSong(\"" + data[num].name + "\")'>" +
                                    "<div class='name'>" + data[num].name + "</div>" +
                                "</div>";
                }

                $("#off-rec").html(content);
            }
        },
        error: function(jqr, status, error){
            $("#off-rec").html("<div class='instr'>Failed to load the Recommendations</div>");
        }
    });
}

$(document).ready(function() {

    //   If the Like Button is clicked
    $("#song-review .like").on("click", function(){

        $("#on-song-rec").html("<div class='instr'>Loading recommendations..</div>");
        $.ajax({
            type: "GET",
            data: {
                link: $("#song-link").attr("value")
            },
            url: "http://localhost:3000/process/recommendations",
            success: function(data){

                if(data === "empty"){
                    $("#on-song-rec").html("<div class='instr'>No Recommendations</div>");

                }else if(data === "error") {
                    showMessage("Failed to load the recommendations.")
                    $("#on-song-rec").html("<div class='instr'>Failed to load the Recommendations</div>");

                }else{
                    showRecommendations(data, "#on-song-rec");
                }
            },
            error: function(jqr, status, error){
                showMessage("Failed to load the recommendations.");
                $("#on-song-rec").html("<div class='instr'>Failed to load the Recommendations</div>");
            }
        });
    });

});