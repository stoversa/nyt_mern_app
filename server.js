// Packages, requirements, etc.
const express = require("express");
const bodyParser = require("body-parser"); //JSON responses
const path = require("path");
const PORT = process.env.PORT || process.argv[2] || 3001;
const mongoose = require("mongoose"); //Mongo object modelling 
const request = require("request"); //Makes http calls
const articleAPI = require("./controllers/routes/articleAPI");
const noteAPI = require("./controllers/routes/noteAPI");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/nytHeadlines";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});


// Add API Routes
app.use("/api/articles", articleAPI);
app.use("/api/notes", noteAPI);