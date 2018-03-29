const mongooose= require('mongoose');

let Schema={
    date:{type:Date,default:Date.now()},
    uploaderName:{type:String},
    email:{type:String},
    description:{type:String},
    category:{type:String},
    fileName:{type:String},
    likes:[],
    comment:[{
        email:{type:String},
        name:{type:String},
        commentText:{type:String},
    }],
    forSort:{type:String}
};

module.exports =mongooose.model("post",Schema);