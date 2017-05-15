exports = module.exports = function(request, response, User, session){

    //   Query to authorize the Entered Email Address and Password
    User.findOne(
        { 
            emailAddress: request.body.email, 
            password: request.body.password 
        }, 
        {}, 
        function(error, data){

            //   Callback Function to send the response according to the recieved data
            if(error) response.send("There was a problem logging in.");
            else if(data === null) return response.send("Either Email Adddress or Password is wrong");
            else{

                //   Create a session Object
                request.session.user = {
                    ID: data._id,
                    name: data.name,
                    email: data.emailAddress
                };
                request.session.save();
                response.send("success");
            }
        }
    );
};