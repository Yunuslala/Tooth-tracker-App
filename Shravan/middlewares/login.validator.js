const loginvalidator = (req, res, next) => {
    const data = req.body;

    if(!data.email || !data.password){
        return res.send({msg: `Please provide email & password`});
    }
    else if(data.password.length < 5){
        return res.send({msg:`Password must be of length 5`});
    }
    return next();
}

module.exports = {loginvalidator};