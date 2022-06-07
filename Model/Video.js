const mongoose = require('mongoose');
const { User } = require('./User');
const VideoSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    videoPath:{type:String},
    numberPlatesImg:[{type:String}],
    offendersImg:[{type:String}],
    status:{type:String,default:"pending"},
    processed:{type:Boolean,default:false},
    isRead:{type:Boolean,default:false}
})

exports.Video = mongoose.model('Video', VideoSchema);