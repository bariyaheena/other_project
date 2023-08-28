const mongoose = require("mongoose");

const userSchema =new mongoose.Schema({
 Name:String,
 email:String,
 mobile:Number,
 address:String
});
 
const userModel = mongoose.model('excellent',userSchema);
module.exports = userModel;