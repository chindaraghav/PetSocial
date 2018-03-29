let game=require('./schema');
const nodemailer=require('nodemailer');
module.exports={
    createUser:function(data){
        return new Promise(function(res,rej){
            console.log("here");
            game.create(data,function(err,result){
                if(err){
                    rej(err);
                }
                else{
                    res(result);
                }
            });
        });
    },
    findUser:function(data){
        return new Promise(function(res,rej){
            game.find(data,function(err,result){
                if(err){
                    rej(err);
                }
                else{
                    res(result);
                }
            });
        });
    },
    verifyUser:function(data){
        return new Promise(function(res,rej){
            game.update(data, { $set: { verified: true }}, function(err,result){
                if(err || result.n===0){
                    console.log("NOpe!!");
                    rej(err);
                }
                else{
                    res(result);
                }
            });
        });
    }
    ,
    sendVerificationMail:function(data){
        nodemailer.createTestAccount((err,account) => {
            let transporter=nodemailer.createTransport(
                {
                    host:'smtp.gmail.com',
                    service:'gmail',
                    auth:{
                        user:'',
                        pass:''
                    }
                });
            let mailOptions={
                from:' <>',
                to:data.email,
                subject:'go to game!',
                text: 'is the OTP required click on the link below',
                html:`<p>Click on this Link to go to login page</p> <a href="http://localhost:3000/login/${data._id}">LINK</a>`
            };
            transporter.sendMail(mailOptions,(error, info)=>{
                if(error){

                    console.log(error);
                }
                console.log("Sent! "+info.messageId);
            })
        })
    },
    updateUserData:function(data){
        return new Promise(function(res,rej){
            game.update({email:data.email}, { $set: { firstName:data.firstName,lastName:data.lastName,sex:data.sex,description:data.description}}, function(err,result){
                if(err || result.n===0){
                    console.log("NOpe!!");
                    rej(err);
                }
                else{
                    res(result);
                }
            });
        });
    },
    updateFileName:function(data){
        return new Promise(function(res,rej){
            game.update({email:data.email}, { $set: { fileName:data.fileName }}, function(err,result){
                if(err || result.n===0){
                    console.log("NOpe!!");
                    rej(err);
                }
                else{
                    res(result);
                }
            });
        });
    },
    updatePassword:function(data){
        return new Promise(function(res,rej){
            game.update({_id:data._id}, { $set: { password:data.password} }, function(err,result){
                if(err || result.n===0){
                    console.log("NOpe!!");
                    rej(err);
                }
                else{
                    console.log(result);
                    res(result);
                }
            });
        });
    },
    mailResetPassword:function(data){
        nodemailer.createTestAccount((err,account) => {
            let transporter=nodemailer.createTransport(
                {
                    host:'smtp.gmail.com',
                    service:'gmail',
                    auth:{
                        user:'',
                        pass:''
                    }
                });
            let mailOptions={
                from:' <>',
                to:data.email,
                subject:'Change Password!',
                text: 'Click on the link below to change password',
                html:`<p>Click on this Link to go to Reset passsword page</p> <a href="http://localhost:3000/reset_password/${data._id}">LINK</a>`
            };
            transporter.sendMail(mailOptions,(error, info)=>{
                if(error){

                    console.log(error);
                }
                console.log("Sent! "+info.messageId);
            })
        })
    }
}