const express= require('express');
const router= express.Router();
const refreshObject=require('../controllers/refresh.js')

router.get('/',refreshObject.refreshing);

module.exports=router;