const jwt=require('jsonwebtoken');

const userData={
    user: require('../models/data.json'),
    setUser:function(value){
        this.user=value;
    }
}

const authMiddleware=function(req,res,next){
    console.log('inside the auth middleware');
    let token= req.headers?.authorization || req.headers?.Authorization;

    if(!token)return res.sendStatus(401);
    token=token.split(' ')[1];
    console.log('token middleware',token);
//verification
jwt.verify(token,process.env.SECRET_ACCESS_TOKEN,(err,data)=>{
    if(err){
        console.log('inside the verification',err)
        return res.sendStatus(403);
    }
    req.user=data.userInfo.username;
    req.roles=data.userInfo.roles;
    console.log(data);
    next();

})

}
module.exports={authMiddleware};
