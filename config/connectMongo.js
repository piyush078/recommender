//   require database password and user
//   EDIT THE INFORMATION IN THE config/database.js FILE FOR MONGO CONNECTION
var DatabaseInfo = require("./database")(),

    //   Require Mongoose
    mongoose = require("mongoose"),

    //   MongoDB URL
    //   ENTER YOUR MONGO URL HERE
    url = "<mongo_url>";

exports = module.exports = function(){

    //   CONNECTION EVENTS
    //   When successfully connected
    mongoose.connection.on("connected", function(){
    });

    //   Use connect method to connect to the Server
    mongoose.Promise = global.Promise;
    mongoose.connect(url);

    return mongoose;
}();
