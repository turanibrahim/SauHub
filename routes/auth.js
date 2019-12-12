const router = require('express').Router();
const db = require('../config/database');
const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//VALIDATION
const joi = require('@hapi/joi');


const schemaRegister = joi.object({

    name: joi.string().min(4).required(),
    surname: joi.string().min(4).required(),
    email: joi.string().min(6).required().email(),
    password: joi.string().min(6).required(),
    password_confirmation: joi.string().min(6).required().valid(joi.ref('password'))
})

const schemaLogin = joi.object({
    email: joi.string().min(6).required().email(),
    password: joi.string().min(6).required()
});

router.post('/register', (req, res) => {

    //VALIDATION BEFORE CREATING
    const {error} = schemaRegister.validate(req.body);

    if(error != null){
            return res.status(400).send(error.details[0].message);
    }

    //CHECKING IF THE EMAIL ALREADY TAKEN
    User.findOne({
        where:{
            email: req.body.email,
        }
    }).then( email => {
        if(email != null){
            return res.status(400).send('This email already taken.');
        }
        else{

            //HASH THE PASSWORD
            const salt = bcrypt.genSaltSync(10);
            const hashPass = bcrypt.hashSync(req.body.password, salt);

            //CREATE NEW USER
            const user = User.build({
                name: req.body.name,
                surname: req.body.surname,
                email: req.body.email,
                password: hashPass,
                level: req.body.level
            });         

            user.save().then( savedUser => {
                const token = jwt.sign({id: savedUser.id}, process.env.TOKEN_SECRET);
                res.send({token: token});
            })
            .catch(err => res.sendStatus(400).send(err));            
        }
    }) 
});

router.post('/login', async (req, res) => {
    //VALIDATE DATA COMING FROM CLIENTS
    try {
        const validate = await schemaLogin.validateAsync(req.body);
    }
    catch (err) { 
        return res.status(400).send(err.details[0].message)
    }

    //CHECKING IF THE EMAIL IS VALID
    User.findOne({
        where:{
            email: req.body.email
        }
    }).then( user => {
        if(!user) return res.status(400).send('Email or password is wrong.');
        else{
            //PASSWORD IS CORRECT
            bcrypt.compare(req.body.password , user.password).then( validPass => {
                if(!validPass){
                    return res.status(400).send('Email or password is wrong.');
                }
                else{
                    //CREATE AND ASSING A TOKEN
                    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
                    res.header('auth-token', token).send({token: token});
                }
            });
        }
    });    
});

module.exports = router;
