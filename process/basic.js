//   Access session
var session = require("express-session"),
    sessionVar = require("../config/session"),

    metadata = require("../source/metadata")(),
    navbar = require("../source/navbar")(),
    offline = require("../source/offline")(),

    //   module to check if USER is logged in
    isLoggedIn = require("../config/logged");

exports = module.exports = function(app){

    //   Initialization for Session
    app.use(session(sessionVar));

    //   Index Page
    app.all("/", function(request, response){

        //   Render the index page as the template
        response.render("index", { "metadata": metadata, "navbar": navbar } );
    });

    //   Signup Webpage
    app.all("/signup", function(request, response){

        //   check if the user is logged in or not and perform action accordingly
        if(isLoggedIn(request)) response.redirect("./home");

        //   render the signup page
        else response.render("signup", { "metadata": metadata, "navbar": navbar });
    });

    //   Login Webpage
    app.all("/login", function(request, response){

        //   check if the user is logged in or not and perform action accordingly
        if(isLoggedIn(request)) response.redirect("./home");

        //   render the login page
        else response.render("login", { "metadata": metadata, "navbar": navbar });
    });

    //   Homepage of the user
    app.all("/home", function(request, response){

        //   check if the user is logged in or not and perform action accordingly
        if(!isLoggedIn(request)) response.redirect("./login");

        //   render the home webpage
        else response.render("home", { session: request.session.user, "metadata": metadata, "navbar": navbar, "offline": offline });
    });

    //   Homepage of the user
    app.all("/mysongs", function(request, response){

        //   check if the user is logged in or not and perform action accordingly
        if(!isLoggedIn(request)) response.redirect("./login");

        //   render the home webpage
        else response.render("mysongs", { session: request.session.user, "metadata": metadata, "navbar": navbar, "offline": offline });
    });

    //   Logout page
    app.all("/logout", function(request, response){

        //   set the session to undefined
        request.session.user = undefined;
        response.redirect("./login");
    });

    //   Error page
    app.all("/error", function(request, response){

        //   render the error page
        response.render("error");
    });
};