const { connection } = require("../routes/user.routes");

const registrationValidator = (req, res, next) => {
    const data = req.body;

    if(!data.name || !data.date_of_birth || !data.phone || !data.email || !data.password){
        res.status(401).send({ msg: `Please provide name, date_of_birth(YYYY-MM-DD) ,phone, email & Password`});
    }
    else if(new Date(data.date_of_birth) == "Invalid date"){
        res.status(401).send({msg:`Please provide date_of_birth in format YYYY-MM-DD`})
    }
    else if(data.phone.length < 7){
        res.status(422).send({ msg: `Please provide valid phone number`});
    }
    else if(data.password.length < 5){
        res.status(411).send({msg:`Password must be of length 5`});
    }
    else{
        next();
    }
}

module.exports = registrationValidator;