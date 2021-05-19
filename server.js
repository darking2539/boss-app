const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require('cors');
const app = express();
const compression = require("compression");
const morgan = require("morgan");
const users = require("./routes/api/users");
const note = require("./routes/api/notes");
const profile = require("./routes/api/profile");

// Bodyparser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose.connect(db,{ useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes for authen
app.use("/api/v2/authen/", users);

app.post('/', (req, res) => {
  return res.send('Received a POST HTTP method');
});

//Loraiot recivced
require("./routes/api/loraiotRoutes")(app);

//blog note api
app.use("/api/note/", note);

//profile api
app.use("/api/profile/", profile);

//for get images
app.use(express.static(__dirname + "/uploaded"));


//Heroku deploy
if (process.env.NODE_ENV == "production") {
  app.use(compression());
} else {
  app.use(morgan("dev"));
}

//spontify login
app.get('/spontifylogin', function(req, res) {
  var scopes = 'user-read-private user-read-email user-read-recently-played user-top-read';
  res.redirect('https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    '&client_id=' +'0dad778342ae4714b447cbfb1259e3be' +
    (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
    '&redirect_uri=' + encodeURIComponent("https://boss-app.vercel.app/spontify"));
  });

if (process.env.NODE_ENV === "production") {
  //Express will serve up production assets
  //like our main.js file, or main.css file!
  app.use(express.static("client/build"));

  //Express will serve up the index.html file
  //if it doesn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}




const port = process.env.PORT || 8000; // process.env.port is 8000
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
