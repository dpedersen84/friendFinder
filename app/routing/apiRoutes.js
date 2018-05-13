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
        for(var i = 0; i < friends.length; i++) {
            if (friendSelection === friends[i].routeName) {

                return res.json(friends[i]);
            }
        }
        return res.json(false);
    });

    // Add new friend
    app.post("/api/friends", function(req, res) {
        let newfriend = req.body;

        newfriend.routeName = newfriend.name.replace(/\s+/g, "").toLowerCase();
        // New friend scores are coming back as individual strings
        console.log(newfriend.scores) // strings
        // Convert new friend scores into integers
        newfriend.scores = newfriend.scores.map(function(x) {
            return parseInt(x)
        })

        console.log(newfriend.scores); // numbers

        // Adds new friend to the array
        friends.push(newfriend);
        
        for(var i = 0; i < friends.length; i++) {
            if (newfriend === friends[i][friends.length - 1]) {
                console.log("no");
            }
            else {
                let yourScores = newfriend.scores;
                let friendName = friends[i].name;
                let friendScores = friends[i].scores;

                let result = friendScores.map(function(value, index) {
                    return Math.abs(value - yourScores[index]);
                })

                console.log("Friend: " + friendName + "\nScores " + result);
            }
        }

        console.log(friends[friends.length - 1]);


        // Formats data
        res.json(newfriend);
    })

    // test
    app.get("/test", function(req, res) {

        let user1 = [5, 1, 4, 4, 5, 1, 2, 5, 4, 1];

        let user2 = [3, 2, 6, 4, 5, 1, 2, 5, 4, 1];

        let result = user2.map(function(value, index) {

            return Math.abs(value - user1[index]);

        });

        console.log(result);
        res.json(result);
    })

    // test 2
    app.get("/test2", function(req, res) {

        let user1 = [5, 1, 4, 4, 5, 1, 2, 5, 4, 1];

        let user2 = [3, 2, 6, 4, 5, 1, 2, 5, 4, 1];

        let result = [];

        for (let i = 0; i < user2.length; i++) {
            result.push(Math.abs(user2[i] - user1[i]));
        }

        console.log(result);
        res.json(result);

    })

};