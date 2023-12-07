const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt= require('bcrypt')
const userSchema = new mongoose.Schema({
  firstname:{
    type:String,
    required:[true,"please provide first name"]
  },
  lastname:{
    type:String,
    required:[true,"please provide first name"]
  },
    email:{
        type:String,
        unique:true,
        lowercase:true,
        validate: [validator.isEmail, 'Please provide a valid email'],
        required:[true,"please provide email"]
    },
    password:{
        type:String,
        required:[true,"please provide password"],
        minlength:8,
        select:false
    }
})

userSchema.pre('save',async function(){
    try{
     const salt =await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    }catch(err){
        throw err;
    }
})

// check password is correct or not
  userSchema.methods.correctPassword = async function(userPassword
) {
    try{
    return  await bcrypt.compare(userPassword,this.password);
    }catch(err){
      throw err; 
    }
  };

const userModel =  mongoose.model('User',userSchema);
module.exports=userModel;