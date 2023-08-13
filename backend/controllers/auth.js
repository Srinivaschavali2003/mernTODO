 const bcryptjs = require('bcryptjs'); 
 const User = require('../models/User'); 
 const jwt = require('jsonwebtoken'); 
 const cookie = require('cookie-parser');
 const createError =  require('../utils/error'); 

let generatedToken=""; 
 const register = async (req,res,next) => {

    if(!req.body.name || !req.body.email || !req.body.password){
        return next(createError({status:400, message:"Name, Email, Password required"})); 
    }

    try{
          const salt = await bcryptjs.genSalt(10); 
          const hashedPassword= await bcryptjs.hash(req.body.password,salt); 

        const newUser= new User({
            name : req.body.name,
            email : req.body.email,
             password:hashedPassword,
        }); 
        await newUser.save(); 
        return res.status(201).json("New User Created"); 
    }
    catch(err){
          console.log(err); 
       return next(err); 

    }

} ;

const login = async(req,res,next) => {
   
    if(!req.body.email || !req.body.password){
        return next(createError({status:400,message:"Email, Password required"})) ; 

    }
    try{
        const user= await User.findOne({
            email:req.body.email
        }).select(
            'name email password'
        ); 
        if(!user){
            return next(createError({status:404,message:"User Required"})); 
        }
        const isPasswordCorrect= await bcryptjs.compare(req.body.password,user.password); 
        if(!isPasswordCorrect){
            return next(createError({status:400,message:"Password is incorrect"})); 
        }
        const payLoad={
            id :user._id,
            name : user.name 
        }
        const token = jwt.sign(payLoad,process.env.JWT_TOKEN,{
            expiresIn:"1d",
        });

       res.cookie("access_token",token,{
            httpOnly : true
        });
        generatedToken=token ; 
        return res.status(200).json({'message':"login success",status:true,"token":token})
    
    }
    catch(err){
        return next(err); 
    }

}; 

const logout = async(req,res) =>{

   generatedToken=""; 
   return res.status(200).json({message : "Logout Successful"}); 

} ; 

const isLoggedIn = async(req,res)=>{

        let token = generatedToken;
        console.log(token);  

        if(!token){
            return res.json(false); 
        }

        return jwt.verify(token,process.env.JWT_TOKEN,(err) =>{
            if(err){
                return res.json(false); 
            }
            return res.json(true); 
        })
}

const checkAuth = (req, res, next) => {
    let token = generatedToken;
    if (!token) {
        return next(createError({ status: 401, message: "Unauthorized" }));
    }


    jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
        if (err) {
            return next(createError({ status: 401, message: "Invalid Token" }));
        } else {
            req.user = decoded;
            return next();
        }
    });
}



module.exports = {register,login,logout,isLoggedIn,checkAuth} ;