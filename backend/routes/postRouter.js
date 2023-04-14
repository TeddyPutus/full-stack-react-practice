const {Router} = require('express');
const {Post, Tag} = require('../models/index.js');
const { Op } = require('sequelize');
const {body, param, validationResult} = require('express-validator');
const postRouter = Router();

//get all posts
postRouter.get('/', async (req,res) => {
    try {
        let allPosts = await Post.findAll({include: [
            {model: Tag}
        ]});
        res.send(allPosts);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);       
    }
})

//get posts with an author match/content contains, we also need to query tags, once properly implemented
postRouter.get('/:query', async (req,res) => {
    try {
        let allPosts = await Post.findAll({where: {[Op.or] : [
            {author: {[Op.substring] : `%${req.params.query}%`}}, //iLike could make this search case insensitive but it only works with postgres
            {content: {[Op.substring] : `%${req.params.query}%`}},
            // {'tags.name' : {[Op.substring] : `%${req.params.query}%`}}
        ]},
        include: [
            {model: Tag}
        ]}
        );
        let allTags = await Post.findAll({include: [
                    {model: Tag, where:{name : {[Op.substring] : `%${req.params.query}%`}}}
        ]}
        );
        allPosts = allPosts.concat(allTags);
        res.send(allPosts);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);       
    }
})

//create a new post
postRouter.post('/',
    body('content').notEmpty(),
    body('author').notEmpty(),
    checkErrors,
    async (req,res) => {
        try {
            console.log("POST")
            let newPost = await Post.create({content: req.body.content, author:req.body.author});
            //search for tag, if it doesn't exist, create it
            //in both cases add the post to the tag
            if(req.body.tag){ //if no tag included, then don't do anything
                let tag = await Tag.findOne({where:{name:req.body.tag}})
                if(tag){ //tag found, create the relationship
                    newPost.addTag(tag);
                } else{ //new tag - create the tag, then create the relationship
                    tag = await Tag.create({name:req.body.tag});
                    newPost.addTag(tag);
                }
            }
            

            res.send(newPost);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }
)

//delete a post
postRouter.delete('/',
    body('postId').notEmpty().isNumeric(),
    checkErrors,
    async (req,res) => {
        try {
            console.log('DELETE');
            let postDeleted = await Post.destroy({where: {id: req.body.postId }})
            res.sendStatus(200);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }
)

//Middleware function that handles return errors - saves a few lines of code!
function checkErrors(req, res, next){
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return res.status(400).send({errors: errors.array()});
    }
    else next();
}

module.exports = postRouter;