const express=require('express');
const app=express;
let router=app.Router();
const multer=require('multer');
const api=require('../../Model/Category/category-api');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/categoryAvatar')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+'-'+file.originalname)
    }
});

let upload = multer({storage: storage});


router.post('/getCategories',async function(req,res){
    try{
        let a=await api.getCategories();
        res.send(a);
    }
    catch(err)
    {
        res.send({done:false});
    }
});

router.post('/createCategory', upload.single('postedImage'), async function (req, res) {
    let orignal=req.file.fileName;
    try {
        let a = await api.createCategory(req.body,req.file);
        res.send(a);
    }
    catch (err) {
        res.send({done: false});
    }

});

module.exports = router;