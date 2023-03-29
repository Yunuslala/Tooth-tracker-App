const express=require("express")
const app=express();
const {githubRoute}=require("./Github")

app.use("/auth",githubRoute)

// for github Auth ///

// app.get("/login",(req,res)=>{
//     res.sendFile(__dirname+"/login.html")
    
// })
// app.get("/signup",(req,res)=>{
//     res.sendFile(__dirname+"/signup.html")
// })

app.get("/",(req,res)=>{
    res.send("Welcome to the Auth")
})

app.listen(4500,()=>{
    console.log("server is running now")
})