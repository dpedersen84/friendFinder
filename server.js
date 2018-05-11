// Dependencies
// ==========================================================
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

// Express
// ==========================================================
const app = express();

// Port
// ==========================================================
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
// ==========================================================
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Starts the server to begin listening
// ==========================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});

// Routing
// ==========================================================
require("./routing/apiRoutes.html")(app);
require("./routing/htmlRoutes.html")(app);