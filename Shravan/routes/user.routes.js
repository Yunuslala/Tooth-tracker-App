const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { loginvalidator } = require('../middlewares/login.validator');
const registrationValidator = require('../middlewares/registration.validator');
require('dotenv').config();
const saltRounds = +process.env.saltRounds;
const connection = mysql.createConnection(process.env.MySQLURL);
const { ScheduleSystem } = require("../app");

const userRouter = express.Router();
const system=new ScheduleSystem();

userRouter.get("/",(req, res) => {
    res.status(200).send({msg: `Basic API endpoint`})
})

userRouter.post('/register',registrationValidator ,async (req, res) => {
    const data = req.body;
    if(data.role !== 'admin'){
        data.role = "user"
    }
    const password = await bcrypt.hash(data.password, saltRounds);
    connection.query(`select * from users where email = '${data.email}';`,(err,rows) => {
        if(err){
            console.log(err);
            return res.status(500).send({msg: `Something went wrong, please try again`,err: err.message});
        }
        else if(rows.length){
            return res.status(409).send({msg: `Email is already registered`});
        }
        else{
            const user = system.initializeUser(data.name, data.date_of_birth, data.email, data.phone, password);
            console.log(user);
            connection.query(`insert into users (name, date_of_birth, phone, email, password, role) values ('${data.name}', '${data.date_of_birth}', '${data.phone}', '${data.email}', '${password}', '${data.role}')`, (err, rows, fields) => {
                if(err){
                    console.log(err);
                    return res.status(500).send({msg: `Something went wrong, please try again`,err: err.message});;
                }
                else{
                    return res.status(201).send({msg: `Registration successful as ${data.role}`, role: data.role, rows});
                }
            })
        }
    })
    ;
})

userRouter.post('/login',loginvalidator ,(req, res) => {
    const data = req.body;
    connection.query(`select * from users where email = '${data.email}'`,(err, rows) => {
        if(err){
            console.log(err);
            return res.status(500).send({msg: `Something went wrong, please try again`,err: err.message});
        }
        else if(!rows.length){
            return res.status(401).send({msg: `Account does not exists`});
        }
        bcrypt.compare(data.password,rows[0].password,(err,result) => {
            if(err){
                console.log(err);
                return res.status(500).send({msg: `Something went wrong, please try again`,err: err.message});
            }
            else if(!result){
                return res.status(401).send({msg:`Password do not match`});
            }
            const token = jwt.sign(rows[0],process.env.key);
            res.status(200).send({msg:`Login Successful as ${rows[0].role}` ,role: rows[0].role ,token});
        });
    })
})

userRouter.get('/slots',(req, res) => {
    connection.query('select * from slots',(err, rows, fields) => {
        if(err){
            console.log(err);
            return res.status(500).send({msg: `Something went wrong, please try again`,err: err.message});
        }
        res.status(200).send(rows);
    })
})

userRouter.get('/doctors',(req, res) => {
    connection.query('select * from doctors',(err, rows, fields) => {
        if(err){
            console.log(err);
            res.status(500).send({msg: `Something went wrong, please try again`,err: err.message});
        }
        res.status(200).send(rows);
    })
})

userRouter.post('/book',(req, res) => {
    const data = req.body
    if(!data.date_of_birth || !data.purpose || !data.provider || !data.slot){
        return res.status(401).send(`PLease provide purpose, provider and slot`);
    }
    
})

module.exports = {userRouter,connection};


/*
data = {
    purpose: string,
    provider: doctor id
    slot: slot id
}

*/




/*
data
{
    patient_name = string
    new_patient = booloean
    date_of_birth = date
    email = string
    phone = string
    purpose = Purpose(string)
    provider = Provider(obj)
    slot = slot(obj)
}
*/