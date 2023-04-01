const { UserModal } = require("../models/user.model");
const passport = require("passport");
const { v4: uuidv4 } = require("uuid");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://tooth-tracker.cyclic.app/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      let email = profile._json.email;
      let name = profile._json.name;
      let payload = {
        username: name,
        token: accessToken,
      };
      console.log(payload);
      let x = await UserModal.findOne({ email });
      if (x) {
        return cb(null, payload);
      }
      const user = new UserModal({
        name,
        email,
        password: uuidv4(),
      });
      await user.save();
      return cb(null, payload);
    }
  )
);

module.exports = passport;
