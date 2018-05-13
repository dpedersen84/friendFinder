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

    // Route to specific friend
    app.get("/api/friends/:friend", function(req, res) {
        let friendSelection = req.params.friend;
        console.log (friendSelection);

        // res.json(friendSelection)

        for(var i = 0; i < friends.length; i++) {
            if (friendSelection === friends[i].routeName) {

                // let name = friends[i].name;
                // let image = friends[i].image;
                friendName = friends[i].name;
                return res.json(friends[i]);
                // return res.console(name)

                // for(var i = 0; i < friendName.scores.length; i++) {

                //     console.log(scores[i]);
                    
                // }
            }
        }
        return res.json(false);
    });

    // Add new friend
    app.post("/api/friends", function(req, res) {
        let newfriend = req.body;

        newfriend.routeName = newfriend.name.replace(/\s+/g, "").toLowerCase();

        // console.log(newfriend);

        // Adds new friend to the array
        friends.push(newfriend);
        // Formats data
        res.json(newfriend);
    })
};