require('dotenv').config()
const { v4: uuidv4 } = require('uuid');
const {UserModal}=require("../modals/UserModal")
const passportFb = require("passport")


const facebookStrategy = require("passport-facebook").Strategy

passportFb.use(new facebookStrategy({
    clientID:process.env.FACEBOOK_CLIENT_ID, 
    clientSecret:process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL:"https://localhost:4500/auth/facebook/callback" 
},
async function(accessToken,refreshToken,profile,done){
    //  console.log(profile)
    let email = profile._json.email
    let name = profile._json.name
    let payload = {
      "username":name,
      "token":accessToken
    }
    // console.log(payload)
    let x = await UserModal.findOne({email});
    if(x){
      return done(null, payload);
    }
   const user = new UserModal({
    name,
    email,
    password: uuidv4()
   })
   await user.save();
    return done(null, payload);
  }



))

module.exports = {passportFb};