const todoModel = require("../models/todoModel");
const userModel = require("../models/userModel")
const jwt =  require('jsonwebtoken')
const registerUser = async (firstname,lastname,email,password)=>{
    try{
        const createUser = await userModel.create({firstname,lastname,email,password})
    }catch(err){
      throw err;
    }
}
const loginUser = async (email)=>{
    try{
      return await userModel.findOne({email}).select("+password")
    }catch(err){
      throw err;
    }
}
const generateToken = async (tokenData,secret_key, jwt_expiry)=>{
  // jwt.sign take three parameter=> data,secret key,expire session
  return jwt.sign(tokenData,secret_key,{expiresIn:jwt_expiry})
}
module.exports = {loginUser,registerUser,generateToken};