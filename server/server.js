
const express = require("express");
require ("dotenv").config()
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const PASSPORT_SECRET_KEY = process.env['PASSPORT_SECRET_KEY'];

const app = express();
app.use(
  cors({
    origin: process.env.SERVER_URL,
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: PASSPORT_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Connected!"));

const shoeSchema = new mongoose.Schema({
  name: String,
  images: [String],
  price: String,
  vendor: String,
  id: Number,
  gender: String,
  color: [String],
});
const homeShoeSchema = new mongoose.Schema({
  name: String,
  image: String,
  price: String,
  vendor: String,
  id: Number,
  gender: String,
  color: [String],
});
const brandSchema = new mongoose.Schema({
  name: String,
  src: String,
});
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: String,
  postcode: Number,
  city: String,
  telephone: Number,
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);
const Shoe = mongoose.model("shopdata", shoeSchema);
const Brand = mongoose.model("brand", brandSchema);
const Newarrival = mongoose.model("newarrival", homeShoeSchema);
const Trending = mongoose.model("trending", homeShoeSchema);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// get shop data route

app.get("/shopdata", function (req, res) {
  Shoe.find({})
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.error("could not be completed", err);
    });
});

// get brand data route

app.get("/branddata", function (req, res) {
  Brand.find({})
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.error("could not be completed", err);
    });
});

// get new arrival data route

app.get("/newarrivaldata", function (req, res) {
  Newarrival.find({})
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.error("could not be completed", err);
    });
});

// get trending data route

app.get("/trendingdata", function (req, res) {
  Trending.find({})
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.error("could not be completed", err);
    });
});

// user registration route

app.post("/register", function (req, res) {
  console.log(req.body);
  const newUser = new User({
    username: req.body.username,
    name: req.body.name,
  });
  User.register(newUser, req.body.password, function (err) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log("user registered!");
      res.send("/profile");
    }
  });
});

// user login route

app.post("/login", passport.authenticate("local"), (req, res) => {
  // If the control reaches here, authentication was successful
  console.log("server", "logged in");
  res.send("/profile");
});

// user logout route

app.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.send("/login");
  });
});

// get user data route

app.post("/profiledata", function (req, res) {
  const username = req.body.username;
  console.log(username, "profile info");
  User.findOne({ username: username })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send("User not found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal Server Error");
    });
});

// edit user data route

app.post("/edituserdata", function (req, res) {
  console.log(req.body);
  User.findOneAndUpdate(
    { username: req.body.userLoggedIn.username },
    { $set: req.body.objectToUpdate },
    { new: true }
  )
    .then((data) => {
      // if (data) {
      console.log("updated", data);
      res.send(data);
      // } else {
      //   res.status(404).send(error);
      // }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

//  password change route

app.post("/changepassword", function (req, res) {
  console.log(req.body.userLoggedIn.username);
  User.findByUsername(req.body.userLoggedIn.username, (err, user) => {
    if (err) {
      res.send(err);
    } else {
      user.changePassword(
        req.body.oldpassword,
        req.body.newpassword,
        function (err) {
          if (err) {
            res.send(err);
          } else {
            res.send("successfully change password");
          }
        }
      );
    }
  });
});

app.listen(5000, () => console.log("server started on port 5000"));
