let category=require('./category-schema');

module.exports= {
    createCategory:function(data,orignal){
        return new Promise(async function(res,rej){
            data.fileName=orignal.filename;
            category.create(data,function(err,result){
                if(err){
                    rej(err);
                }
                else{
                    res(result);
                }
            });
        });
    },
    getCategories:function(){
        return new Promise(function(res,rej){
            category.find({},function(err,result){
                if(err){
                    rej(err);
                }
                else{
                    res(result);
                }
            });
        });
    }
};