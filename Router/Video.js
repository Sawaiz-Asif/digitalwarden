const express = require('express');
const res = require('express/lib/response');
const { User } = require('../Model/User');
const { Video } = require('../Model/Video');
const router = express();

router.post('/',async (req,res)=>{
    // let checkUser = User.exists({email:req.body.email});
    // if(checkUser)
    // {
    //     return res.status(400).send("duplicate email error");
    // }
    let video = new Video(
        {
            user: req.body.user,
            videoPath:req.body.videoPath,
            numberPlatesImg:req.body.numberPlatesImg,
            offendersImg:req.body.offendersImg    
        }
    )
    video = await video.save();
    if(!video)
    {
        res.status(500).send("video can not be posted");
    }
    res.send(video);
})
router.get('/spec',async(req,res)=>{
    let VideoList = await Video.findById(req.body.id).populate('user');
    if(!VideoList)
    {
        return res.status(400).send("can not find users")
    }
    res.send(VideoList);
})
router.get('/',async(req,res)=>{
    let VideoList = await Video.find()
    if(!VideoList)
    {
        return res.status(400).send("can not find users")
    }
    res.send(VideoList);
})
router.get('/unseen',async(req,res)=>{
    let VideoList = await Video.find({isRead:false}).populate('user');
    if(!VideoList)
    {
        return res.status(400).send("can not find users")
    }
    res.send(VideoList);
})

router.get('/seen',async(req,res)=>{
    let VideoList = await Video.find({isRead:true}).populate('user');
    if(!VideoList)
    {
        return res.status(400).send("can not find users")
    }
    res.send(VideoList);
})

router.put('/isreadtrue',async(req,res)=>{
    console.log("ID : ",req.body.id)
    let video = await Video.findByIdAndUpdate(
        req.body.id,
        {
            isRead:true
        },
        {new:true}
    );
    if(!video)
    {
        return res.status(400).send("can not update ");
    }
    res.send(video);
})
router.put('/isreadfalse',async(req,res)=>{
    let video = await Video.findByIdAndUpdate(
        req.body.id,
        {
            isRead:false
        },
        {new:true}
    );
    if(!video)
    {
        return res.status(400).send("can not update ");
    }
    res.send(video);
})
module.exports= router;