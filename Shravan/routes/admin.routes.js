const express = require('express');
const { authenticate } = require('../middlewares/authenticator');
const { userValidator } = require('../middlewares/user.validator');
const { connection } = require('./user.routes');
const { ScheduleSystem } = require("../app");

const adminRouter = express.Router();
const system=new ScheduleSystem();

adminRouter.use(authenticate(`admin`));

adminRouter.post('/query',(req,res) => {
    const query = req.body.query;
    if(!query){
        res.status(404).send({msg:`Pass your query inside an object with key as 'query'`});
    }
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

adminRouter.get('/allSLots',async (req, res) => {
    connection.query('select * from slots;',(error, rows) => {
        if(error){
            console.log(error);
            return res.status(500).send({msg: `Something went wrong`, err: err.msg});
        }
        res.status(200).send(rows);
    })
})

adminRouter.get('/allMeetings', async (req, res) => {
    connection.query('select * from meetings',(error, rows) => {
        if(error){
            console.log(error);
            return res.status(500).send({msg: `Something went wrong`, err: err.msg});
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

adminRouter.post('/addSlot',(req, res) => {
    const data = req.body;
    if(!data.category || !data.sub_category || !data.duration || !data.start || !data.date){
        return res.status(401).send({msg: `Please provide category, sub_category, duration, start (hh:mm, 24hrs format), date(YYYY-MM-DD)`});
    }
    const Start = new Date(`${data.date} ${data.start}`);
    // console.log(data.date, data.start, Start);
    if(Start == 'Invalid Date'){
        return res.status(422).send({msg:`Please provide date (YYYY-MM-DD) and start (hh:mm, 24hrs clock) in correct format`});
    }
    const slot = system.initializeSlot(data.category, data.sub_category, data.duration, data.start, data.date);
    // console.log(new Date(slot.start).toGMTString());
    connection.query(`insert into slots (start, end, date, duration, category, sub_category) values ( '${new Date(slot.start).toGMTString()}', '${new Date(slot.end).toGMTString()}', '${new Date(slot.date).toGMTString()}', ${data.duration}, '${data.category}', '${data.sub_category}')`,(err, rows) => {
        if(err){
            console.log(err);
            return res.status(500).send({msg: `Something went wrong`,err: err.message});
        }
        res.status(200).send({msg: `Slot Added`,rows});
    });
})

module.exports = {adminRouter};