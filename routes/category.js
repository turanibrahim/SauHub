const router = require('express').Router();
const verify = require('./verifyToken');
const db = require('../config/database');
const Category = require('../Models/Category');

router.get('/' , verify ,(req ,res ) => {
    Category.findAll().then( category => {
        res.json({
            data: category,
        })
    });
});

router.post('/add' , verify ,(req ,res ) => {


    //CREATE NEW USER
    const category = Category.build({
        name: req.body.name,
        categoryDescription: req.body.categoryDescription
    });         

    category.save().then( savedCategory => {

        res.send({category: savedCategory});

    })
    .catch(err => res.status(400).send(err));
});

router.get('/:id' , verify ,(req ,res ) => {
    Category.findByPk(req.params.id).then( category => {
        
        if(!category){
            res.status(404).send('Category not found.');
        }
        else{
            res.json({
                data: category,
            })
        }
    });
});

router.post('/edit/{id}' , verify ,(req ,res ) => {


    //CREATE NEW USER
    const category = Category.build({
        name: req.body.name,
        categoryDescription: req.body.categoryDescription
    });         

    category.save().then( savedCategory => {

        res.send({category: savedCategory});

    })
    .catch(err => res.sendStatus(400).send(err));
});
module.exports = router;