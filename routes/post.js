const router = require('express').Router();
const verify = require('./verifyToken');
const Post = require('../Models/Post');
const jwt = require('jsonwebtoken');

router.get('/' , verify ,(req ,res ) => {
    Post.findAll().then( post => {
        res.json({
            post,
        })
    });
});

router.post('/add' , verify ,(req ,res ) => {
    //CREATE NEW POST
    const post = Post.build({
        name: req.body.name,
        postDescription: req.body.postDescription,
        categoryId: req.body.categoryId,
        userId: req.user.id
    });         

    post.save().then( savedPost => {

        res.send({post: savedPost});

    })
    .catch(err => res.status(400).send(err));
});

router.get('/category/:id' , verify ,(req ,res ) => {
    Post.findAll({
        where: {
            categoryId: req.params.id
          }
        }).then( post => {
        
        if(!post){
            res.status(404).send('Category not found.');
        }
        else{
            res.json({
                data: post,
            })
        }
    });
});
module.exports = router;