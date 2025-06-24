const  mongoose = require('mongoose');

const dbConnection= async ()=>{
 try{
    await mongoose.connect(process.env.DB_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    });
 }catch(err){
    console.log(err.message);
 }
}
module.exports=dbConnection;