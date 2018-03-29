const mongoose=require('mongoose');

let Schema={
    categoryName:{type:String,unique:true},
    fileName:{type:String}
};

module.exports=mongoose.model('categorie',Schema);