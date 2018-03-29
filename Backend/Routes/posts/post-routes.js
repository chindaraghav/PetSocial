const express = require('express');
const router = express.Router();
const multer = require('multer');
const api = require('../../Model/Posts/api-for-post');
const userApi=require('../../Model/api');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/postPics')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+'-'+file.originalname)
    }
});
const upload = multer({storage: storage});


router.post('/createComment',async function(req,res){
    try{
        req.body.name=req.user.userName;
        let a=await api.createCommentInPost(req.body);
        let b=await api.getPost({_id:req.body._id});
        res.send(b[0]);
    }
    catch(err)
    {
        res.send({done:false});
    }
});

router.post('/getSinglePost',async function(req,res){   //gets id in req.body
    try{
        let a=await api.getPost(req.body);
        res.send(a[0]);
    }
    catch(err)
    {
        res.send({done:false});
    }
});


router.post('/getPostsForTimeline',async function(req,res){    //gets email from timeline to get specific posts
    try{
        let a=null;
        if(req.user!==undefined)
        {
            a=await api.getPost({email:req.user.email});
        }
        else{
            a=await api.getPost({email:req.body.email});
        }
        res.send(a);
    }
    catch(err)
    {
        res.send({done:false});
    }
});

router.post('/likeMyPost',async function(req,res){
    try{
        let a=await api.likeIt(req.body);
        let b=await api.getPost({_id:req.body._id});
        res.send(b[0].likes);
    }
    catch(err){
        res.send({done:false});
    }
});

router.post('/unLikeMyPost',async function(req,res){
    try{
        let a=await api.unLikeIt(req.body);
        let b=await api.getPost({_id:req.body._id});
        res.send(b[0].likes);
    }
    catch(err) {
        res.send({done:false});
    }
});

router.post('/getPostsForHome',async function(req,res){    //sends empty object to get all posts
    try{
        let a=await api.getPost({});
        res.send(a);
    }
    catch(err)
    {
        res.send({done:false});
    }
});

router.post('/getPostsFromCategory',async function(req,res){
    try{
        let a=await api.getPost({category:req.body.category});
        res.send(a);
    }
    catch(err)
    {
        res.send({done:false});
    }
});

router.post('/createPost', upload.single('postedImage'), async function (req, res) {
    req.body.date=Date.now();
    req.body.forSort=Date.now();
    try {
        let a = await api.createPost(req.body,req.file);
        res.send(a);
    }
    catch (err) {
        res.send({done: false});
    }
});


router.post('/searchPostOnBar',async function (req,res) {
    try {
        let a=await api.getPostInNumber(req.body);
        res.send(a);
    }
    catch(err){
        console.log("error");
    }
});

module.exports = router;