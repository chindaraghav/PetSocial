const mongoose=require('mongoose');

let Schema=mongoose.Schema({
    userName:{type:String},
    email:{type:String,unique:true},
    description:{type:String,default:''},
    password:{type:String},
    sex:{type:String,default:'Male'},
    fileName:{type:String,default:'default.jpg'},
    firstName:{type:String},
    lastName:{type:String, default:' '},
    verified:{type: Boolean, default:false}
});

module.exports=mongoose.model("user",Schema);
