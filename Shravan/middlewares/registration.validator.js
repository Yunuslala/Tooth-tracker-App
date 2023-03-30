const { connection } = require("../routes/user.routes");

const registrationValidator = (req, res, next) => {
    const data = req.body;

    if(!data.name || !new Date(data.date_of_birth) || !data.phone || !data.email || !data.password){
        res.send({ msg: `Please provide name, date_of_birth(YYYY-MM-DD) ,phone, e-mail & Password`});
    }
    else if(data.phone.length < 7){
        res.send({ msg: `Please provide valid phone number`});
    }
    else if(data.password.length < 5){
        res.send({msg:`Password must be of length 5`});
    }
    else{
        next();
    }
}

module.exports = registrationValidator;