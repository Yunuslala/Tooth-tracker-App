const jwt = require('jsonwebtoken');
require('dotenv').config();
const authenticate = (role) => {
    return (req, res, next) => {
        const token = req.headers.authorization;
        if(!token){
            return res.status(403).send({msg: `Login to continue`});
        }
        jwt.verify(token,process.env.key,(err, decoded) => {
            if(err){
                console.log(err)
                return res.status(500).send({msg: `Something went wrong, please try again`,err: err.message});
                
            }
            else if (decoded.role !== role && decoded.role !== "admin"){
                return res.status(403).send({msg: `Access denied`});
            }
            else{
                console.log(decoded)
                req.body.email=decoded.email
                next();
            }
        });
    }
}

module.exports = {authenticate};