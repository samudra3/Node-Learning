const mongoose= require('mongoose');
const {Schema}= mongoose;
const employeeSchema= new Schema({
    username:String,
    userId:Number,
})
module.exports=mongoose.model('Employee',employeeSchema);