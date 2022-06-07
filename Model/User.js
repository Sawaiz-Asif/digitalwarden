const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name:{type:String , require:true},
    email:{type:String, require:true},
    password:{type:String,require:true},
    phone:{type:String,require:true},
    cnic:{type:String,require:true},
})

exports.User = mongoose.model('User',UserSchema);