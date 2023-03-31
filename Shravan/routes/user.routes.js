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
const { authenticate } = require('../middlewares/authenticator');

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
    if(new Date(data.date_of_birth) == 'Invalid date'){
        return res.status(422).send({msg:`Please provide date_of_birth in correct format (YYYY-MM-DD)`})
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
    connection.query('select * from slots where isbooked = 0',(err, rows, fields) => {
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

userRouter.use(authenticate("user"));

userRouter.post('/newMeeting',(req, res) => {
    const data = req.body;
    const token = req.headers.authorization;
    const user = jwt.verify(token,process.env.key);

    if(!data.sub_category || !data.category || !data.slotId){
        return res.status(401).send({msg:`Please provide category, sub category and slotId`});
    }

    connection.query(`select * from slots where id = ${data.slotId}`,(err, rows) => {

        if(err){
            console.log(err);
            return res.status(500).send({msg: `Something went wrong`,err: err.message});
        }

        else if(!rows.length){
            return res.status(404).send({msg: `slot Not available`});
        }

        else if(rows[0].category !== data.category || rows[0].sub_category !== data.sub_category){
            return res.status(409).send({msg:`This slot is not available for provided category or sub_category`})
        }

        const slot = rows[0];

        connection.query(`insert into meetings (userId, slotId, category, sub_category) values ('${user.id}', ${slot.id}, '${data.category}', '${data.sub_category}')`,(err, rows) => {

            if(err){
                console.log(err);
                return res.status(500).send({msg: `Something went wrong`,err: err.message});
            }

            system.innitializeMeeting(data.category, data.sub_category, +user.id);

            connection.query(`update slots set isbooked = 1, meetingId = ${rows.insertId} where id = ${slot.id}`,(err, rows) => {

                if(err){
                    console.log(err);
                    return res.status(500).send({msg: `Something went wrong`,err: err.message});
                }

                res.status(200).send({msg: `Meeting Initialised`,rows})
            });
        })
        
    })
})

module.exports = {userRouter,connection};