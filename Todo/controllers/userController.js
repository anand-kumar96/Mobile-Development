const { registerUser, loginUser, generateToken } = require("../services/userServices");


exports.register = async(req,res,next)=>{
    const{firstname,lastname,email,password}= req.body;
    try{
        await registerUser(firstname,lastname,email,password);
        res.json({status:'success',message:"User registered successfully!!"})
    }catch(err){
        throw err;
    }
}

exports.login = async(req,res,next)=>{
    try{
        const{email,password}= req.body;
        if (!email || !password) {
            throw new Error('please provide email and password');
          }
        const user = await loginUser(email);
        if(!user || !(await user.correctPassword(password,user.password))){
            throw new Error("user does not exist");
        }
        const tokenData = {_id:user._id,email:user.email,firstname:user.firstname,lastname:user.lastname};
        const token  = await generateToken(tokenData,process.env.JWT_SECRET,'2h');
        console.log(token)
        res.json({status:'success',message:"User login successfully!!",token:token})
    }catch(err){
        throw err;
    }
}