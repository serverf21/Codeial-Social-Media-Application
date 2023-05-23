const passport = require("passport");
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require("../models/users");

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'codeial';

passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({ _id: jwt_payload._id })
        .then(function (user) {
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
        .catch(function (err) {
            return done(err, false);
        });

}));

module.exports = passport;