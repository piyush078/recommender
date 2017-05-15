//   Connection to MongoDB
var Mongoose = require("../config/connectMongo"),
    Schema = Mongoose.Schema,

    //   Get Schemas
    Schemas = require("../config/schema")(),
    User = Schemas.User,

    //   Require fs module to write the data
    fs = require("fs"),

    bodyParser = require('body-parser'),
    urlencodedParser = bodyParser.urlencoded({ extended: false }),

    //   Access session
    session = require("express-session"),
    sessionVar = require("../config/session"),

    //   module to check if USER is logged in
    isLoggedIn = require("../config/logged");

exports = module.exports = function(app){

    //   Initialization for Session
    app.use(session(sessionVar));

    //   Page to login the user
    app.post("/process/login", urlencodedParser, function(request, response){

        if(Mongoose && request.body){
            //   module to check if the user exists
            var loginModule = require("./login")(request, response, User, session);
        }else{
            response.send("error");
        }
    });

    //   Page to create a new account
    app.post("/process/register", urlencodedParser, function(request, response){

        if(Mongoose && request.body){
            //   Module to create a new Account
            var register = require("./register")(request, response, User, session);
        }else{
            response.redirect("../error");
        }
    });

    //   Page to add the Liked song into the offline.csv
    app.get("/process/newoffline", function(request, response){

        //   check if the user is logged in or not and perform action accordingly
        if(!isLoggedIn(request)){
            response.send("error");

        }else{

            if(Mongoose){

                //   Data for the file
                var userID = request.session.user.ID,
                    name = request.query.name,
                    name = name.substring(0, name.lastIndexOf(".")).trim(),

                    appendData = userID + "|" + name + "\n";

                fs.appendFile(__dirname + "/offline.csv", appendData, function(error){
                    if(error) {
                        response.send("error");
                    }else{
                        response.send("success");
                    }
                });

            }else{
                response.send("error");
            }
        }
    });

    //   Page to add the Liked song into the online.csv
    app.get("/process/addsong", function(request, response){

        //   check if the user is logged in or not and perform action accordingly
        if(!isLoggedIn(request)){
            response.send("error");

        }else{

            if(Mongoose){

                //   Data for the file
                var userID = request.session.user.ID,
                    link = request.query.link,
                    name = request.query.name,
                    artist = request.query.artist,
                    img = request.query.img,

                    appendData = userID + "|" + link + "|" + name + "|" + artist + "|" + img + "\n";

                fs.appendFile(__dirname + "/online.csv", appendData, function(error){
                    if(error) {
                        response.send("error");
                    }else{
                        response.send("success");
                    }
                });

            }else{
                response.send("error");
            }
        }
    });

    //   get the recommendations of offline song
    app.get("/process/offrec", function(request, response){

        //   check if the user is logged in or not and perform action accordingly
        if(!isLoggedIn(request)){
            response.send("error");

        }else{
            //   Node and Python communication
            var PythonShell = require("python-shell"),
                name = request.query.name,
                name = name.substring(0, name.lastIndexOf(".")).trim(),

            //   options for python-shell
                options = {
                    mode: "json",
                    
                    //   CHANGE THE pythonpath ACCORDING TO YOUR PYTHON_PATH
                    pythonPath: "C:/Program Files/Enthought/User/python.exe", 
                    args: [ name ]
                };

            PythonShell.run('offline.py', options, function (error, results) {

                if(error === null && results[0].empty === "empty") {
                    response.send("empty");

                } else if(error || results === undefined){
                    response.send("error");
                }else{

                    //   get the JSON of recommendations and send as response
                    response.send(results[0]);
                }
            });

        }
    });

    //   get the recommendations of past liked songs
    app.get("/process/initrec", function(request, response){

        //   check if the user is logged in or not and perform action accordingly
        if(!isLoggedIn(request)){
            response.send("error");

        }else{
            //   Node and Python communication
            var PythonShell = require("python-shell"),

            //   options for python-shell
                options = {
                    mode: "json",
                    
                    //   CHANGE THE pythonpath ACCORDING TO YOUR PYTHON_PATH
                    pythonPath: "C:/Program Files/Enthought/User/python.exe",
                    args: [ request.session.user.ID ]
                };

            PythonShell.run('initial.py', options, function (error, results) {

                if(error === null && results[0].empty === "empty") {
                    response.send("empty");

                } else if(error || results === undefined){
                    response.send("error");
                }else{

                    //   get the JSON of recommendations and send as response
                    response.send(results[0]);
                }
            });

        }
    });

    //   get the recommendations
    app.get("/process/recommendations", function(request, response){

        //   check if the user is logged in or not and perform action accordingly
        if(!isLoggedIn(request)){
            response.send("error");

        }else{
            //   Node and Python communication
            var PythonShell = require("python-shell"),

            //   options for python-shell
                options = {
                    mode: "json",
                    pythonPath: "C:/Program Files/Enthought/User/python.exe",
                    args: [ request.query.link, request.session.user.ID ]
                };

            PythonShell.run('online.py', options, function (error, results) {

                if(error === null && results[0].empty === "empty") {
                    response.send("empty");

                } else if(error || results === undefined){
                    response.send("error");
                }else{

                    //   get the JSON of recommendations and send as response
                    response.send(results[0]);
                }
            });

        }
    });

    //   User's like songs page
    app.all("/process/getmysongs", function(request, response){

        //   check if the user is logged in or not and perform action accordingly
        if(!isLoggedIn(request)){
            response.redirect("./login");

        }else{

            //   Node and Python communication
            var PythonShell = require("python-shell"),

            //   options for python-shell
                options = {
                    mode: "json",

                    //   PATH TO THE PYTHON EXECUTABLE
                    pythonPath: "C:/Program Files/Enthought/User/python.exe",
                    args: [ request.session.user.ID ]
                };

            PythonShell.run('mysongs.py', options, function (error, results) {

                console.log(error + ":" + results)
                if(error === null && results[0].empty === "empty") {
                    response.send("empty");

                }else if(error || results === undefined){
                    response.send("error");
                }else{

                    //   get the JSON of recommendations and send as response
                    response.send(results[0]);
                }
            });
        }

    });

};
