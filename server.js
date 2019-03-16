const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 8080;
const cookieParser = require('cookie-parser');
const session = require('cookie-session');
const path = require('path');


// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(session({
    name: 'session',
    keys: ['key1'],
    //maxAge: 60*60*10000 //10 hours
}));

app.use(express.static("public"));

require('./routes/api/apiRoutes')(app);
require('./routes/html/htmlRoutes')(app);
require('./routes/session/sessionRoutes')(app);


// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/sneakersstore");

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
 }

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

app.get('*',(req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});


