const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();
const logger = require('morgan');

const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')

const mongoose = require("mongoose");
const routes = require("./routes");
const fileUpload = require('express-fileupload'); 
const cors = require('cors')
app.use(cors());
app.use(fileUpload());

app.use(logger());

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/schoolDB", { useNewUrlParser: true });

const PORT = process.env.PORT || 3001;

app.use(express.static("public"));

// Catch unauthorised errors
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({"error" : err.name + ": " + err.message})
  }
})

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});