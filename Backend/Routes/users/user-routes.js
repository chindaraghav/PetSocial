const express=require('express');
const app=express;
let router=app.Router();
const multer = require('multer');
const api=require('../../Model/api');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/profilePics')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+'-'+file.originalname)
    }
});
let upload = multer({storage: storage});


router.post('/createUser',async function(req,res){
    try
    {
        let a=await api.createUser(req.body);
        api.sendVerificationMail(a);
        res.send(true);
    }
    catch(err)
    {
        res.send(false);
    }
});

router.post('/verifyUser',async function(req,res){
    try {
        let a = await api.verifyUser(req.body);
        let b = await api.findUser(req.body);
        res.send(b[0]);
    }
    catch(err) {
        res.send({verified:false});
    }
});

router.post('/resetPassword',async function(req,res){
    try {
        let b = await api.updatePassword(req.body);
        res.send({done:true});
    }
    catch(err) {
        res.send({done:false});
    }
});

router.post('/loginUser',async function(req,res){
    let Exists=true;
    let passMatch=false;
    let verified=false;
    try {
        let b = await api.findUser({email:req.body.email});
        if(b.length===0)
        {
            Exists=false;
        }
        else if(b[0].password===req.body.password)
        {
            passMatch=true;
            if(b[0].verified)
            {
                verified=true;
            }
        }
        res.send({exists:Exists,passMatch:passMatch,verified:verified});
    }
    catch(err) {
        res.send({galatHai:true});
    }
});

router.post('/checkForUser',async function(req,res){
    let Exists=true;
    try {
        let b = await api.findUser({email:req.body.email});
        if(b.length===0)
        {
            Exists=false;
        }
        else{
            api.mailResetPassword(b[0]);
        }
        res.send({exists:Exists});
    }
    catch(err) {
        res.send({done:false});
    }
});

router.post('/updateUser',async function(req,res){
    try{
        let a=await api.updateUserData(req.body);
        let b=await api.findUser({email:req.body.email});
        res.send(b[0]);
    }
    catch(err){
        res.send({done:false});
    }
});

router.post('/updateProfilePic',upload.single('postedImage'),async function(req,res){
    try {
        let a={
            email:req.body.email,
            fileName:req.file.filename
        }
        let g = await api.updateFileName(a);
        let b=await api.findUser({email:req.body.email});
        res.send(b[0]);
    }
    catch (err) {
        res.send({done: false});
    }
});

router.post('/getUserInfo',async function(req,res){
    try{
        let a=await api.findUser({email:req.body.email});
        res.send(a[0]);
    }
    catch(err)
    {
        res.send({done:false});
    }
});

module.exports=router;