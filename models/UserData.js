const mongoose= require('mongoose');
const {Schema}= mongoose;
const userSchema= new Schema({
    username:String,
    password:String,
    role:{
        user:{
            type:Number,
            default:101
        },
        admin:Number,
        editor:Number,
    },
    refreshToken:String
})
module.exports=mongoose.model('User',userSchema);