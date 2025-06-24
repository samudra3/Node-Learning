let info= require("../models/info.json");
const employeeData=require('../models/employeeData');
const { rawListeners } = require("../models/UserData");
const getResponse=(req,res)=>{
    res.json(info);
    }
const postResponse= async (req,res)=>{
    const {username,userId}=req.body;
const newEmployee= await employeeData.create({username,userId});
if(newEmployee)return res.status(200).json({'employee':newEmployee});
console.log('error during new employee creation');
    }
const putResponse=async (req,res)=>{
    console.log('inside the put of employee')
const {id}=req.params;
const targetUser= await employeeData.findById(id).exec();
console.log(targetUser);
   const {username,userId}=req.body;
//making changes to the provided id document
const updateUser=await employeeData.updateOne(targetUser,{username,userId});

res.json(updateUser);
   };
const deleteResponse= async (req,res)=>{
    const {id}=req.params;
   const deletedUser=  await employeeData.deleteOne({_id:id});
   res.json(deletedUser);
    }
    module.exports={
        getResponse,
        postResponse,
        putResponse,
        deleteResponse
    }