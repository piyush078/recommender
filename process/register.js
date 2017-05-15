exports = module.exports = function(request, response, User, session){

    //   New Account Object to be added to the Database
    var NewAccount = new User({
        name: request.body.name,
        emailAddress: request.body.email,
        password: request.body.password
    });

    //   Save the new Basic Data in the Database
    NewAccount.save(function(error, data){

        //   if there is an error redirect to the error page
        if(error){
            response.redirect("../error");
        }else{

            //   Create a session Object
            request.session.user = {
                ID: data._id,
                name: data.name,
                email: data.emailAddress
            };
            request.session.save();
            response.redirect("../home");
        }
    });
};