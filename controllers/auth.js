const fsPromise= require('fs').promises;
const path= require('path');
const bcrypt= require('bcrypt');
const jwt=require('jsonwebtoken');
require('dotenv').config();
const userData={
    user: require('../models/data.json'),
    setUser:function(value){
        this.user=value;
    }
}
const authorizeUser= async function(req,res,next){
    const {username,pass}=req.body;
    console.log(typeof pass);
    const isUser=userData.user.find((item)=>{
        return item.username===username;
    })
    if(!isUser){
      return  res.status(403).json({"message":"user doesn't exist"})
    }
    const verify=  await bcrypt.compare(pass,isUser.password);

    console.log( verify)
    if(verify){
        const Roles=Object.values(isUser.roles);
const accesToken= jwt.sign({userInfo:
    {
    user:isUser.username,
    roles:Roles
}}
    ,process.env.SECRET_ACCESS_TOKEN,{expiresIn:'1h'})

const refreshToken= jwt.sign({username:isUser.username},process.env.SECRET_REFRESH_TOKEN,{expiresIn:'1d'})
console.log('refreshToken',refreshToken)
const otherUser= userData.user.filter((item)=>{
    return item.username!==isUser.username;
})
const currentUser={...isUser,refreshToken}
userData.setUser([...otherUser,currentUser]);
await fsPromise.writeFile(path.join(__dirname,'../models/data.json'),JSON.stringify(userData.user));
res.cookie('jwt',refreshToken,{httpOnly:true})
res.status(200).json({"accessToken":accesToken});
    }
    else{
        res.status(403).json({"error":"wrong id or password"});
    }
}
module.exports={authorizeUser};