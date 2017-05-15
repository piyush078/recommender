var Mongoose = require("../config/connectMongo"),
    Schema = Mongoose.Schema;

//   Schema for the Basic Information of the Users
var userSchema = new Schema({
    name: { type: String, match: /[a-z]/ },
    emailAddress: String,
    password: String
});

exports = module.exports = function(){

    //   return object containing both the schemas
    return {
        User: Mongoose.model("user", userSchema)
    };
};