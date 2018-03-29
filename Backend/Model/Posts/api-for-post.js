const schema= require('./schemaForPosts');
const apiP=require('./../api');
module.exports={
    createPost:function(data,orignal){
        return new Promise(async function(res,rej){
            console.log("here");
            let a=await apiP.findUser({email:data.email});
            let name=a[0].firstName+" "+a[0].lastName;
            data.uploaderName=name;
            data.fileName=orignal.filename;
            schema.create(data,function(err,result){
                if(err){
                    console.log(err)
                    rej(err);
                }
                else{
                    console.log("in api-post create");
                    res(result);
                }
            });
        });
    },
    getPost:function(data){
        return new Promise(function(res,rej){
            schema.find(data,function(err,result){
                if(err){
                    rej(err);
                }
                else{
                    console.log("result",result);
                    res(result);
                }
            });
        });
    },
    likeIt:function(data){
        return new Promise(function(res,rej){
            schema.update({_id:data._id},{$push:{likes:data.email}},function(err,result){
                if(err){
                    rej(err);
                }
                else{
                    res({done:true});
                }
            });
        });
    },
    unLikeIt:function(data){
        return new Promise(function(res,rej){
            schema.update({_id:data._id},{$pull:{likes:data.email}},function(err,result){
                if(err){
                    rej(err);
                }
                else{
                    res({done:true});
                }
            });
        });
    },
    createCommentInPost:function(data){
        return new Promise(function(res,rej){
            schema.update({_id:data._id},{$push:{comment:{email:data.email,commentText:data.comment,name:data.name}}},function(err,result){
                if(err){
                    rej(err);
                }
                else{
                    res({done:true});
                }
            });
        });
    },
    getPostInNumber:function(data){
        let datae = `${data.text}.*`;
        return new Promise(function(res,rej){
            let a = schema.find({ description : { $regex: datae , $options: 'i'}}).sort({'likes':-1}).limit(5);
            a.exec(function(err,result){
                if(err){
                    rej(err);
                }
                else {
                    res(result);
                }
            })
        });
    }
};
