const express=require("express");
const { use } = require("passport");
const app=express();
const {githubRoute}=require("./Github")

const {userRouter}=require("./routes/UserRoute")
const {connection}=require("./config/db")
const cookieParser=require("cookie-parser")
const passport=require("./config/gooleAuth")
const {passportFb}=require("./config/facebookAuth")
require("dotenv").config()
app.use(express.json())
app.use("/auth",githubRoute)
// app.use("/auth",googleRoute)
app.use(cookieParser())
app.use("/user",userRouter)
 
   //Google Auth//

app.get('/auth/google',
passport.authenticate('google', { scope: ['profile',`email`] }));

app.get('/auth/google/callback', 
passport.authenticate('google', { failureRedirect: '/login',session:false }),
function(req, res) {
  // Successful authentication, redirect home.
  console.log(req.user)
//   res.json({"user":req.user})
  res.redirect('/');
});

//----------------Facebook Oauth----------//



app.get("/auth/facebook", passportFb.authenticate("facebook", {
    scope: ["profile", "email"]
}))

app.get("/auth/facebook/callback",
    passportFb.authenticate("facebook", {
        failureRedirect: "/login",
        session: false
    }),
    function (req, res) {
        console.log(req.user)
        res.cookie(req.user)
        res.redirect("/")
    });


app.get("/",(req,res)=>{
    res.send("Welcome to the Auth")
})

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("Connected to DB")
    } catch (error) {
        console.log("Something went wrong")
    }
    console.log(`Server is listening on port no ${process.env.port}`)
})