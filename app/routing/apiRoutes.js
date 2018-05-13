// Dependencies
// ==============================================================
let friends = require("../data/friends");
let path = require("path");

// Routing
// ==============================================================
module.exports = function(app) {
    // Display all friends
    app.get("/api/friends", function(req, res) {
        return res.json(friends);
    });

    //  Add a new friend
    app.get("/api/add", function(req, res) {
        
    });

    // Route to specific friend
    app.get("/api/friends/:friend", function(req, res) {
        let friendSelection = req.params.friend;
        console.log (friendSelection);

        // res.json(friendSelection)

        for(var i = 0; i < friends.length; i++) {
            if (friendSelection === friends[i].routeName) {
                return res.json("cheese");
            }
        }
        return res.json(false);
    });

    
};