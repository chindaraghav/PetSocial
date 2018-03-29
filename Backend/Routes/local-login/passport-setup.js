const passport=require('passport');
const passportLocal=require('passport-local');

passport.use(new passportLocal({
    usernameField:'email',
    passwordField:'password'
},function(username,password,done){
    console.log('reached here!');
}))