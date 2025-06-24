const fsPromise= require('fs').promises;
const path= require('path');
const jwt= require('jsonwebtoken');
const userData={
    user: require('../models/data.json'),
    setUser:function(value){
        this.user=value;
    }
}
const { ref } = require('process');


const refreshing= function(req,res,next){
    const refreshCookie= req.cookies.jwt;
    console.log('cookie you got from the req',refreshCookie);
    if(!refreshCookie) return res.sendStatus(401);
    jwt.verify(refreshCookie,process.env.SECRET_REFRESH_TOKEN,(err,data)=>{
        if(err) return res.sendStatus(401);
        const currentUser=userData.user.find((item)=>{
            return item.username==data.username;
        })
        const Roles= Object.value(currentUser.roles);
        const accessToken= jwt.sign({userInfo:
            {
            user:currentUser.username,
            roles:Roles
        }},process.env.SECRET_REFRESH_TOKEN,{expiresIn:'30s'})
        console.log('new access token is created')
        res.json({"accessToken":accessToken});
    })


}
module.exports={refreshing};