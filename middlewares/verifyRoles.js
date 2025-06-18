const verify= (...allowedRoles)=>{
    return (req,res,next)=>{
        console.log('inside the verify')
        if(!req?.roles)return res.sendStatus(401);
        const roleAllowed=[...allowedRoles];
        const isAllowed=req.roles.map((item)=>roleAllowed.includes(item)).find((item)=>item===true);
        if(!isAllowed)return res.sendStatus(401);
        next();
    }
}
module.exports={verify};