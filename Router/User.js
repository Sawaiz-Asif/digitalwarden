const express = require('express');
const { User } = require('../Model/User');
const router = express();
const bcrypt=require('bcrypt')

router.post('/SignUp',async (req,res)=>{
    // let checkUser = User.exists({email:req.body.email});
    // if(checkUser)
    // {
    //     return res.status(400).send("duplicate email error");
    // }
    let user = new User(
        {
            name:req.body.name,
            email:req.body.email,
            password:bcrypt.hashSync(req.body.password , 10),
            phone:req.body.phone,
            cnic:req.body.cnic
            
        }
    )
    user = await user.save();
    if(!user)
    {
        res.status(500).send({Success:0 , message:"Account Creation Failed"});
    }
    res.send({Success:1 , message:"Account Created Successfully"});
})

router.post('/login',async(req,res)=>{
    const user= await User.findOne({email:req.body.email})
    if(!user){
        return res.status(500).send({Success:0 , message:"User Not Found"})
    }
    if(user&& bcrypt.compareSync(req.body.password,user.password))
    {
        // const tokken=jwt.sign({userid:user.id,isAdmin:user.isAdmin,},'sawaiz',{expiresIn:'1w'})
        return res.status(201).json({Success:1 , message:"Login Successfully"})
    }
    else{
        return res.status(400).send({Success:2 , message:"Password Incorrect "})
    }
})


router.get('/',async(req,res)=>{
    let user = await User.find()
    if(!user)
    {
        return res.status(400).send("can not find users")
    }
    res.send(user)
})





module.exports= router;