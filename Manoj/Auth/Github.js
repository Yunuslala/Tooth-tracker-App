const { getHashes } = require("crypto");
const express=require("express")
const githubRoute=express.Router();
const fetch=require("node-fetch");
require("dotenv").config();


const path=require("path")
const mainFolder=path.join(__dirname,"../")
githubRoute.use(express.static(mainFolder+"/LoginSignup"));
githubRoute.get("/login",(req,res)=>{
    res.sendFile(mainFolder+"/LoginSignup/login.html")
})

githubRoute.get("/github",async(req,res)=>{
const {code}=req.query

console.log(code)
const accessToken=await fetch(" https://github.com/login/oauth/access_token",{
    method:"POST",
    headers:{
         "Content-Type":"application/json",
         Accept:"application/json"
    },
    body:JSON.stringify({
        client_id:process.env.CLIENT_ID,
        client_secret:process.env.CLIENT_SECRET,
        code:code
    })
}).then((res)=>res.json())
console.log(accessToken)
const Token=accessToken.access_token
const userDetails=await fetch("https://api.github.com/user",{
    headers:{
        Authorization: `Bearer ${accessToken.access_token}`
    }
}).then((res)=>res.json())
console.log(userDetails)
console.log(Token)
res.cookie("token",Token,"username",userDetails.name)
    res.send("signup progress")
    // res.redirect("https://tooth-tracker.cyclic.app/")
})

module.exports={githubRoute}