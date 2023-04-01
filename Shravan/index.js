const express = require("express");
const { adminRouter } = require("./routes/admin.routes");
const { userRouter, connection } = require("./routes/user.routes");
require('dotenv').config();
const cors=require("cors")
const app = express();
app.use(cors)
app.use(express.json());

app.use('/', userRouter);
app.use('/admin', adminRouter);

app.listen(process.env.port,() => {

    connection.connect((err) => {
        if(err){
            console.log(`error while connecting to DB`);
        }
        else{
            console.log(`Connected to DB`);
        }
    });
    console.log(`running at ${process.env.port}`);
})

