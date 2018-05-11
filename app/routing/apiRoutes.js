
// Load friends data
// ==============================================================
let friends = require("../data/friends");
let path = require("path");
// Routing
// ==============================================================
module.exports = function(app) {
    
    app.get("/api/friends", function(req, res) {
        return res.json(friends);
    });









}