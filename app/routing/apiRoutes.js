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
        for (var i = 0; i < friends.length; i++) {
            if (friendSelection === friends[i].routeName) {

                return res.json(friends[i]);
            }
        }
        return res.json(false);
    });

    // Add new friend and find match
    app.post("/api/friends", function(req, res) {
        // Capture new friend object
        let newFriend = req.body;

        // Create routename value
        newFriend.routeName = newFriend.name.replace(/\s+/g, "").toLowerCase();

        // New friend scores are coming back as individual strings
        // Convert new friend scores into integers
        newFriend.scores = newFriend.scores.map(function(x) {
            return parseInt(x)
        })

        // Adds new friend to the array
        friends.push(newFriend);
        
        // Create simple variables for organization
        let userName = newFriend.name;
        let userResults = newFriend.scores;
        
        console.log("New Friend: " + userName + "\nResults: " + userResults)

        // Compute best friend match
        let matchName = "";
        let matchImage = "";
        let totalDifference = 400; // Max difference possible 

        // Loop through existing friends
        for (var i = 0; i < friends.length; i++) {
            
            // Variables for readability
            let friendName = friends[i].name;
            let friendResults = friends[i].scores;
            
            // Loop through data to compute differences for each question
            let diff = 0
            for (var j = 0; j < userResults.length; j++) {
                diff += Math.abs(friends[i].scores[j] - userResults[j]);

            }

            // Get best match
            if (newFriend.routeName != friends[i].routeName) {
                if (diff < totalDifference) {
                    console.log("Closest Match = " + diff)
                    
                    totalDifference = diff;
                    matchName = friends[i].name
                    matchImage = friends[i].photo

                    console.log("Friend Name: " + friends[i].name)
                    console.log("Friend Image: " + friends[i].photo)

                }
            }
            
        };

        // Send data
        res.json({matchName: matchName, matchImage: matchImage});
    })

    // Testing different ways to get the difference in scores between friends
    // ====================================================================================
    // test
    app.get("/test", function(req, res) {

        let user1 = [5, 1, 4, 4, 5, 1, 2, 5, 4, 1];

        let user2 = [3, 2, 6, 4, 5, 1, 2, 5, 4, 1];

        let result = user2.map(function(value, index) {

            return Math.abs(value - user1[index]);

        });
        console.log(result);
        res.json(result);
    });
    // test 2
    app.get("/test2", function(req, res) {

        let user1 = [5, 1, 4, 4, 5, 1, 2, 5, 4, 1];

        let user2 = [3, 2, 6, 4, 5, 1, 2, 5, 4, 1];

        let result = [];

        for (let i = 0; i < user2.length; i++) {
            result.push(Math.abs(user2[i] - user1[i]));
        };
        console.log(result);
        res.json(result);
    });

};