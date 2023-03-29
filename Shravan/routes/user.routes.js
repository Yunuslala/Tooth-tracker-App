const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { loginvalidator } = require('../middlewares/login.validator');
const registrationValidator = require('../middlewares/registration.validator');
require('dotenv').config();
const saltRounds = +process.env.saltRounds;
const connection = mysql.createConnection(process.env.MySQLURL);

const userRouter = express.Router();

userRouter.post('/register',registrationValidator ,async (req, res) => {
    const data = req.body;
    const password = await bcrypt.hash(data.password, saltRounds);
    connection.query(`select * from users where email = '${data.email}';`,(err,rows) => {
        if(err){
            res.send(`Something went wrong`);
            console.log(err);
        }
        else if(rows.length){
            res.send({msg: `Email is already registered`});
        }
        else{
            connection.query(`insert into users (name, date_of_birth, phone, email, password) values ('${data.name}', '${data.date_of_birth}', '${data.phone}', '${data.email}', '${password}')`, (err, rows, fields) => {
                if(err){
                    res.send(err.message);
                    console.log(err);
                }
                else{
                    res.send({msg: `Registration successful`, rows});
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
            return res.send({msg: `Something went wrong, please try again`});
        }
        else if(!rows.length){
            return res.send({msg: `Account does not exists`});
        }
        bcrypt.compare(data.password,rows[0].password,(err,result) => {
            if(err){
                console.log(err);
                return res.send({msg: `Something went wrong, please try again`});
            }
            else if(!result){
                return res.send({msg:`Password do not match`})
            }
            const token = jwt.sign(rows[0],process.env.key);
            res.send({msg:`Login Successful as ${rows[0].role}`, token});
        });
    })
})

userRouter.get('/slots',(req, res) => {
    connection.query('select * from slots',(err, rows, fields) => {
        if(err){
            res.send(err.message);
        }
        else{
            res.send(rows);
        }
    })
})

userRouter.get('/doctors',(req, res) => {
    connection.query('select * from doctors',(err, rows, fields) => {
        if(err){
            res.send(err.message);
        }
        else{
            res.send(rows);
        }
    })
})

userRouter.post('/book',(req, res) => {
    const data = req.body
    if(!data.date_of_birth || !data.purpose || !data.provider || !data.slot){
        return res.send(`PLease provide purpose, provider and slot`);
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