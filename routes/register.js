const express= require('express')
const router= express.Router();
const {registerFunction}= require('../controllers/register.js');

router.post('/',registerFunction);
module.exports=router;