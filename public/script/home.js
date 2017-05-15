$(document).ready(function(){

	//   show the initial recommendations
    $("#init-rec").html("<div class='instr' style='font-size:25px;'>Loading recommendations..</div>");
    $.ajax({
		type: "GET",
		url: "http://localhost:3000/process/initrec",
		success: function(data){

			if(data === "empty"){
				$("#init-rec").html("<div class='instr' style='font-size:25px;'>No Recommendations</div>");

			}else if(data === "error") {
				showMessage("Failed to load the recommendations.");
				$("#init-rec").html("<div class='instr' style='font-size:25px;'>Failed to load the Recommendations</div>");

			}else{
				showRecommendations(data, "#init-rec");
			}
		},
		error: function(jqr, status, error){
			showMessage("Failed to load the recommendations.");
			$("#init-rec").html("<div class='instr' style='font-size:25px;'>Failed to load the Recommendations</div>");
		}
    });
});