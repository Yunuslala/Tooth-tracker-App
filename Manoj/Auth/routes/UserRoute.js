const express=require("express")
const {UserModal}=require("../modals/UserModal")
const bcrypt=require("bcrypt")
const userRouter=express.Router()
const jwt=require("jsonwebtoken")
const fs=require("fs")
// const cookieParser=require("cookie-parser")
// const {client}=require("../redis")




userRouter.get("/",(req,res)=>{
    res.send("Welcome")
})

userRouter.post("/register",async(req,res)=>{
    const {name,email,password,age}=req.body
    try {
      
        bcrypt.hash(password, 5, async(err, secure_password)=> {
           if(err){
            console.log(err)
           }else{
            const user=new UserModal({name,email,password:secure_password,age});
            await user.save();
            res.json({message:"Register done"})
           }
        });
    } catch (err) {
        console.log(err);
        console.log({"err":"Something went wrong"})
    }
})
// userRouter.use(cookieParser())
userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await UserModal.find({email})
        if(user.length>0){
            bcrypt.compare(password, user[0].password, (err, result)=> {
                if(result){
                    
                    const token=jwt.sign({userID:user[0]._id},"masai" );
                    const refresh_token=jwt.sign({userID:user[0]._id},"REFRESH_SECRET",{expiresIn:"1h"})
                    res.cookie("token",token)
                    res.cookie("refresh_token",refresh_token)
                    // client.SETEX("token",30,token)
                    // client.SETEX("refresh_token",3600,refresh_token)
                    res.json({message:"Login Successfuly"})
                }else{
                    res.json("Wrong credential")
                }
            });
        }else{
            res.json("Wrong credential")
        }
    } catch (err) {
        console.log(err);
         console.log({"err":"Something went wrong"})
    }
})

 

userRouter.get("/logout", async(req,res)=>{

   const token=res.cookies.token;
    const blacklistdata=JSON.parse(fs.readFileSync("./blacklistdata.json","utf-8"))
    blacklistdata.push(token)
    fs.writeFileSync("./blacklistdata.json",JSON.stringify(blacklistdata))
    res.send("logout successful")
})



module.exports={userRouter}



