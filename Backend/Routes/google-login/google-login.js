const router=require('express').Router();
const passport=require('passport');

router.get('/google',passport.authenticate('google',{
    scope:['profile','email']
}));

router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
   res.redirect('http://localhost:3000/timeline/'+req.user.email);
});

router.get('/logMeOut',function (req,res) {
    req.logout();
});

module.exports=router;