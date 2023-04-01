const { connection } = require("../routes/user.routes");

const userValidator = (req, res, next) => {
    const id = req.params.id;
    connection.query(`select * from users where id = '${id}'`,(err, rows) => {
        if(err){
            res.status(500).send({msg: `Something went wrong, please try again`,err: err.message});
            console.log(err);
        }
        else if(!rows.length){
            res.status(401).send({msg: `User does not exists`});
        }
        else{
            next();
        }
    });
}

module.exports = {userValidator};