const express= require('express');
const router= express.Router();
const employee=require("../controllers/employeeController.js")
const authMiddleware= require("../middlewares/authMiddle.js");
const RolesList= require("../config/roles.js")
const {verify}=require("../middlewares/verifyRoles.js");
router.route("/")
.get(authMiddleware.authMiddleware,employee.getResponse)
.post(authMiddleware.authMiddleware,verify(RolesList.user),employee.postResponse)
router.put("/user/:id",authMiddleware.authMiddleware,verify(RolesList.user,RolesList.admin),employee.putResponse)

router.delete("/user/:id",authMiddleware.authMiddleware,verify(RolesList.user,RolesList.admin),employee.deleteResponse)
module.exports=router;