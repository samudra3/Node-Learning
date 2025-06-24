
const bcrypt= require('bcrypt');
const jwt=require('jsonwebtoken');
const User=require('../models/UserData');

const authorizeUser= async function(req,res,next){
    const {username,pass}=req.body;
    const isUser= await User.findOne({username});


    if(!isUser){
      return  res.status(403).json({"message":"user doesn't exist"})
    }
    const verify=  await bcrypt.compare(pass,isUser.password);


    if(verify){
        const Roles=Object.values(isUser.role)
const accesToken= jwt.sign({userInfo:
    {
    user:isUser.username,
    roles:Roles
}}
    ,process.env.SECRET_ACCESS_TOKEN,{expiresIn:'1h'})

const refreshToken= jwt.sign({username:isUser.username},process.env.SECRET_REFRESH_TOKEN,{expiresIn:'1d'})
console.log('refreshToken',refreshToken)
await User.updateOne({username},{refreshToken});
res.cookie('jwt',refreshToken,{httpOnly:true})
res.status(200).json({"accessToken":accesToken});
    }
    else{
        res.status(403).json({"error":"wrong id or password"});
    }
}
module.exports={authorizeUser};