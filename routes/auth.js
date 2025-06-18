const express= require('express');
const router= express.Router();
const authorizeUser=require('../controllers/auth.js');

router.post('/',authorizeUser.authorizeUser);
module.exports=router;
