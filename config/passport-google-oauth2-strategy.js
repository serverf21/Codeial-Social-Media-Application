const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const Users = require("./../models/users");
const env = require("./environment");



passport.use(new GoogleStrategy({
    clientID: "379038194751-gpqg35qem9uhm7h6p4060qk9iffoa3t1.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback"
}, async function (accessToken, refreshToken, profile, done) {
    try {
        const user = await Users.findOne({ email: profile.emails[0].value }).exec();

        console.log(profile);

        if (user) {
            return done(null, user);
        } else {
            const newUser = await Users.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString("hex")
            });

            return done(null, newUser);
        }
    } catch (error) {
        console.log("Error:", error);
    }

})
)

module.exports = passport;