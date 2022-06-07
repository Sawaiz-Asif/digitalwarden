const { application } = require('express')
const express = require('express')
const { get } = require('express/lib/response')
const app = express()
const BodyParser = require('body-parser');
const UserRouter = require('./Router/User');
const { default: mongoose } = require('mongoose');
const VidoeRouter =require('./Router/Video');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv/config');
//MIddle ware
app.use(BodyParser.json());
app.use(cors());
app.options('*',cors());
app.use(morgan('tiny'));

//router
app.use('/user',UserRouter);
app.use('/video',VidoeRouter);

app.get('/',(req,res )=>{res.send("hellow Apii!!!")})

process.on('beforeExit', code => {
    // Can make asynchronous calls
    setTimeout(() => {
      console.log(`Process will exit with code: ${code}`)
      process.exit(code)
    }, 100)
  })
  
  process.on('exit', code => {
    // Only synchronous calls
    console.log(`Process exited with code: ${code}`)
  })
mongoose.connect(process.env.onlineDb || 3000,{useNewUrlParser:true})
.then(()=>{
    console.log("data base is connected");
})
.catch((err)=>{
    console.log(err);
})
app.listen(process.env.PORT,()=>{
    console.log("hellow")
    console.log(process.env.onlineDb);
})