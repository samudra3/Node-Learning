const cookieParser = require('cookie-parser');
const express= require('express');
const app= express();
const path=require('path');
const cors=require('cors');
const PORT=process.env.PORT || 4000;
app.use((req,res,next)=>{
  console.log(`${req.url} ${req.method}`);
  next();
})
app.use(express.static(path.join(__dirname,"public")));
app.use("/subdir",express.static(path.join(__dirname,"public")));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use("/refresh",require('./routes/refresh.js'));
app.use("/subdir",require("./routes/subdir"));
app.use("/register",require("./routes/register"))
app.use("/authorize",require("./routes/auth.js"))

app.use("/employee",require("./routes/employee"));
const whiteList=['http://localhost:3300'];
const corsOption={
  origin:(origin,callback)=>{
    if(whiteList.indexOf(origin)!==-1 || !origin){
      callback(null,true);
    }
    else{
      callback(new Error('origin not allowed'));
    }
  },
  optionSuccessStatus:200
}
app.use(cors(corsOption));
// app.use((req,res,next)=>{
//   if(req.body.name==="raman"){
//     console.log("authentication passed ","name raman")
//     next();
//   }else{
//     res.status(403).send("unauthorized access")
//   }
// })
// function one(req,res,next){
//   console.log('one called');
//   next();
// }
// function second(req,res,next){
//   console.log('second called');
//   next();
// }
// function final(req,res,next){
//   console.log('final called');
//   res.send('chaining is finished');
// }
app.post('/',(req,res)=>{
  console.log(req.url);
  res.send(`hello raman how have you been`);
})
app.get('/',(req,res)=>{
  res.send('hello everyone');
})
app.use((err,req,res,next)=>{
  res.send(err.message);
})
// app.get('/new-page.html',[one,second,final])
// app.get('/old-page.html',(req,res)=>{
//   res.redirect(302,'/new-page.html')
// })
// app.get('/*',(req,res)=>{
//   res.status(404).send('404 not found');
// })
app.listen(PORT,()=>console.log('server is listening on the port '+PORT));