//   FUNCTION TO CHECK IF THE USER IS LOGGED IN OR NOT
exports = module.exports = function isLoggedIn(request) {
    if(request.session.user === undefined || request.session.user === null) return false;
    else return true;
};