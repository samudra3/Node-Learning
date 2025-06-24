
const bcrypt= require('bcrypt');

const User=require('../models/UserData.js');

const registerFunction= async function(req,res,next){
    let {username,pass}=req.body;
   
    if(!username || !pass){
      return  res.status(402).json({"message":'user name or pass has been not provided'});
    }
const isUser= await User.findOne({username,password:pass});
if(isUser){
  return  res.status(401).json({"conflict":'user already exist'});
}
const password= await bcrypt.hash(pass,10);
const newUser= await User.create({username,password});
if(newUser) return res.status(200).json({"user": newUser,
  "message":"successfully registered"});
console.log('user is not created successfully');
}
module.exports={registerFunction};