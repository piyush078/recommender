$(document).ready(function(){

    //   On clicking the Login Button
    $("#login-but").on("click", function(){

        //   get the entered details
        var emailAdd = $("#email").val(),
            password = $("#password").val(),
            detailsObj = { 
                email: emailAdd, 
                password: password 
            };

        if(emailAdd === "" || password === ""){
            $(".feedback").text("Please enter both Email Address and Password");
        }else{
            $.ajax({
                type: "POST",
                url: "http://localhost:3000/process/login",
                data: detailsObj,
                success: function(data){
                    if(data === "success") self.location = "/home";
                    else $(".feedback").text(data);
                },
                error: function(data, status, msg){
                    $(".feedback").text("There was a problem logging in.");
                }
            });
        }
    });

});