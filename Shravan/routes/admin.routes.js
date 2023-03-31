const express = require('express');
const { authenticate } = require('../middlewares/authenticator');
const { userValidator } = require('../middlewares/user.validator');
const { connection } = require('./user.routes');
const { ScheduleSystem } = require("../app");

const adminRouter = express.Router();
const system=new ScheduleSystem();

adminRouter.use(authenticate(`admin`));

adminRouter.get('/query',(req,res) => {
    const query = req.body.query;
    connection.query(query, function(err,rows,fields){
        if(err){
            console.log(err);
            return res.status(500).send({msg: `Something went wrong, please try again`,err: err.message});
        }
        res.status(200).send(rows);
    })
})



adminRouter.get('/users',async (req, res) => {
    connection.query('select * from users',(err, rows, fields) => {
        if(err){
            console.log(err);
            return res.status(500).send({msg: `Something went wrong, please try again`,err: err.message});
        }
        res.status(200).send(rows);
    })
    
})

adminRouter.delete('/deleteuser/:id',userValidator ,(req,res) => {
    const id = req.params.id;
    connection.query(`delete from users where id = '${id}'`, (err, rows, fields) => {
        if(err){
            console.log(err);
            return res.status(500).send({msg: `Something went wrong, please try again`,err: err.message});
        }
        res.status(200).send({msg: `User deletion successful`,rows});
    });
})

adminRouter.post('/addDoctor',(req, res) => {
    const data = req.body;
    if(!data.name || !data.speciality || !data.degree){
        return res.status(401).send({msg:`Please provide name ,speciality and degree`});
    }
    const doctor = system.initializeDoctor(data.name, data.speciality, data.sub_speciality, data.degree);
    console.log(doctor);
    connection.query(`insert into doctors (name, speciality, degree, sub_speciality) values ('${data.name}', '${data.sub_speciality}', '${data.degree}', '${data.speciality}');`,(err, rows) => {
        if(err){
            console.log(err);
            return res.status(500).send({msg: `Something went wrong`,err: err.message});
        }
        res.status(200).send({msg: `Doctor registration successful`,rows});
    });
})





module.exports = {adminRouter};