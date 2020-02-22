const authMiddleware = require("./app/middlewares/auth");
const express = require("express");
const routes = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

function extractProfile(profile) {
  let imageUrl = '';
  if (profile.photos && profile.photos.length) {
    imageUrl = profile.photos[0].value;
  }
  return {
    id: profile.id,
    displayName: profile.displayName,
    image: imageUrl,
  };
}

passport.use(new GoogleStrategy({
  clientID: '1082672519729-bi2en3nhelavknrdv0me3tvgfrcbrnhk.apps.googleusercontent.com',
  clientSecret: 'f6K6lu_RdVx5nzxyMSXEIq_l',
  accessType: 'offline',
  callbackURL: process.env.GOOGLE_CALLBACK_URL ? process.env.GOOGLE_CALLBACK_URL : "http://localhost:3000/auth/google/callback",
  userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo'
},
    (accessToken, refreshToken, profile, cb) => {
      // provided by Google
      cb(null, extractProfile(profile));
    }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

routes.get("/", function(req, res) {
  return res.send("Running ok. Please, call the correct endpoint: current, next or current (POST with current parameter) ");
});

const SequenceController = require("./app/controller/SequenceController");
const AuthController = require("./app/controller/AuthController");

routes.post("/authenticate", AuthController.authenticate);
routes.get("/googleAuthenticate", AuthController.googleAuthenticate);
routes.get("/auth/google", passport.authenticate('google', { scope: ['email', 'profile'], failureRedirect: '/login' }));

routes.get("/auth/google/callback", passport.authenticate('google', {scope: ['email', 'profile']}),
  function(req, res) {
    AuthController.googleAuthenticate(req, res);
});

routes.use(authMiddleware);
routes.get("/current", SequenceController.current);
routes.post("/current", SequenceController.setCurrent);
routes.get("/next", SequenceController.next);

// Just for fun :)
// routes.post("/new", SequenceController.store);

module.exports = routes;