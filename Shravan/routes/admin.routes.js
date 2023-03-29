const express = require('express');
const { userValidator } = require('../middlewares/user.validator');
const { connection } = require('./user.routes');

const adminRouter = express.Router();

adminRouter.get('/query',(req,res) => {
    const query = req.body.query;
    connection.query(query, function(err,rows,fields){
        if(err){
            res.send({msg: err.message});
        }
        else{
            res.send({msg: rows});
        }
    })
})

adminRouter.get('/doctors',(req, res) => {
    connection.query('select * from doctors',(err, rows, fields) => {
        if(err){
            res.send({msg: err.message});
        }
        else{
            res.send({msg: rows});
        }
    })
})

adminRouter.get('/users',async (req, res) => {
    connection.query('select * from users',(err, rows, fields) => {
        if(err){
            res.send({msg: err.message});
        }
        else{
            res.send({msg: rows});
        }
    })
    
})



adminRouter.delete('/deleteuser/:id',userValidator ,(req,res) => {
    const id = req.params.id;
    connection.query(`delete from users where id = '${id}'`, (err, rows, fields) => {
        if(err){
            res.send({msg: err.message});
            console.log(err);
        }
        else{
            res.send({msg: `User deletion successful`,rows});
        }
    });
})

adminRouter.get('/slots',(req, res) => {
    connection.query('select * from slots',(err, rows, fields) => {
        if(err){
            res.send({msg: err.message});
        }
        else{
            res.send({msg: rows});
        }
    })
})



module.exports = {adminRouter};