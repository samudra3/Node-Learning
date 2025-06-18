
const fsPromise= require('fs').promises;
const path= require('path');
const bcrypt= require('bcrypt');
const userData={
    user: require('../models/data.json'),
    setUser:function(value){this.user=value}
}

const registerFunction= async function(req,res,next){
    let {username,pass}=req.body;
    pass+="";
    if(!username || !pass){
      return  res.status(402).json({"message":'user name or pass has been not provided'});
    }
const isUser= userData.user.find((value)=>{
return value.username===username;
})
if(isUser){
  return  res.status(401).json({"conflict":'user already exist'});
}
const password= await bcrypt.hash(pass,10);
const newUser= {username,
roles:{user:101},
  password};
userData.setUser([...userData.user,newUser]);
await fsPromise.writeFile(path.join(__dirname,"../models/data.json"),JSON.stringify(userData.user));
res.status(200).json({"success":`${username} has successfully registered`})

}
module.exports={registerFunction};