const googleStatergy=require('passport-google-oauth20');
const passport =require('passport');
const keys = require('./key');
const api =require('../../../Model/api');
const user=require('../../../Model/schema');

passport.serializeUser(function (user,done) {
    done(null,user._id);
});

passport.deserializeUser(function (id,done) {
    user.findById(id)
        .then(user => {
            done(null,user);
        })
});

passport.use(new googleStatergy({
    clientID:keys.clientID,
    clientSecret:keys.clientSecret,
    callbackURL:'/users/auth/google/redirect'
},async function(accessToken, refreshToken, profile, done){
     let data={
        userName:profile.emails[0].value.slice(0,-10),
        email:profile.emails[0].value,
        sex:profile.gender,
        firstName:profile.name.givenName,
        lastName:profile.name.familyName,
        verified:true
    };
     try{
         let a=await api.createUser(data);
         done(null,a);
     }
     catch(err){
         let a=await api.findUser({email:profile.emails[0].value});
         done(null,a[0]);
     }
}));