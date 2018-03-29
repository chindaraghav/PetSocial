const express=require('express');
const mongoose=require('mongoose');
const app=express();
let cors = require('cors');
const bodyParser=require('body-parser');
const postRoutes=require('./Routes/posts/post-routes');
const categoryRouter= require('./Routes/category/category-routes');
const users=require('./Routes/users/user-routes');
const googleLogin=require('./Routes/google-login/google-login')
const passportSetup=require('./Routes/google-login/passport-setup/passport-setup');
const passport=require('passport');
const cookieSession = require('cookie-session');


app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(express.static(__dirname+'/uploads'));

mongoose.connect('mongodb://localhost:27017/PetSocial2');

app.use(cookieSession({
    maxAge:24*60*60*1000,
    keys:['thisIsTheKey'],
    httpOnly:false,
    name:'PPL'
}))


app.use(passport.initialize());
app.use(passport.session());
app.use('/category',categoryRouter);
app.use('/posts',postRoutes);
app.use('/users',users);
app.use('/users/auth',googleLogin);
app.listen(8080,function(){
    console.log("i'm running!");
});