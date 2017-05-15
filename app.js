//   Require packages
var express = require("express"),
    app = express(),

    //   basic webpages
    basicPages = require("./process/basic")(app),

    //   process webpages
    getProcess = require("./process"),
    Process = getProcess(app);

//   Create a port
var port = Number(process.env.PORT || 3000);

//   resources middleware
app.use("/css", express.static(__dirname + "/public/css"));
app.use("/script", express.static(__dirname + "/public/script"));
app.use("/images", express.static(__dirname + "/public/images"));

//   Setting Template Engine as ejs
app.set("view engine", "ejs");

app.listen(port, "127.0.0.1");
