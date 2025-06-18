let info= require("../models/info.json");

const getResponse=(req,res)=>{
    res.json(info);
    }
const postResponse=(req,res)=>{
    console.log('running inside the postresponse')
    console.log(req.body.userName)

    info[info.length]={"username":req.body.userName,"userId":req.body.userId};

    res.json(info[info.length-1]);
    }
const putResponse=(req,res)=>{
console.log(req.params.id)
const targetUser=info.find(item=>item.userId.toString(zzzzzzzzz)===req.params.id);
console.log(targetUser)
   const {userName,userId}=req.body;
   console.log(userName)

targetUser.userName=userName;
targetUser.userId=userId;
res.json(info);
   };
const deleteResponse=(req,res)=>{
    const {index}=req.params;
    info[index]={};
    res.json(info);
    }
    module.exports={
        getResponse,
        postResponse,
        putResponse,
        deleteResponse
    }