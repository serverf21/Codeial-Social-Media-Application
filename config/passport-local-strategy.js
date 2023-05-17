//This file will get executed when passport.authenticate is called (if user found then the referred controller is called else failure redirect)

//1)Require passport and strategy
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/users");

//2)Tell passport to use this Strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,

      //This request,email,password are passed by the request data that is send from browser
    },
    function (request, email, password, done) {
      //3)find the user

      User.findOne({ email: email })
        .then(function (user) {
          if (!user || user.password !== password) {
            req.flash('error', 'Invalid Username/Password');
            return done(null, false);
          }

          return done(null, user);
        })
        .catch(function (err) {
          req.flash('error', err);
          return done(err);
        });
    }
  )
);

//Creating a session cookie via express session
passport.serializeUser(function (user, done) {
  done(null, user._id);
});

//Deserializing the key in cookie or dencrypting to authenticate or find the user
passport.deserializeUser(function (id, done) {
  User.findById(id)
    .then(function (user) {
      return done(null, user);
    })
    .catch(function (err) {
      console.log('Error in finding user --> Passport');
      return done(err);
    })
});

//This is check for the request made by browser to the server for pages like profile and update that if is authenticated or not
passport.checkAuthentication = function (request, response, next) {
  if (request.isAuthenticated()) {
    return next();
  }

  return response.redirect("/users/sign-in");
};

//This is for that request.user contains the current user from the seession cookie and we are sending that user to the locals for views
passport.setAuthenticatedUser = function (request, response, next) {
  if (request.isAuthenticated()) {
    response.locals.user = request.user;
  }
  next();
};

module.exports = passport;
