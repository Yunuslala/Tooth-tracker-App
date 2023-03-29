const { connection } = require("../routes/user.routes");

const userValidator = (req, res, next) => {
    const id = req.params.id;
    connection.query(`select * from users where id = '${id}'`,(err, rows) => {
        if(err){
            res.send({msg: err.message});
            console.log(err);
        }
        else if(!rows.length){
            res.send({msg: `User does not exists`});
        }
        else{
            next();
        }
    });
}

module.exports = {userValidator};