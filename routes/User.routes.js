const express=require("express")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const { UserModel } = require("../models/user.model")
const userRoute=express.Router()
require("dotenv").config()

userRoute.post("/login", async(req,res)=>{
  try {
    const {name, email, password}=req.body

    const userExist=await UserModel.findOne({email})
    if(userExist){
      res.send({msg:`User already registered with email: ${email}`})
    }
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password, salt)
    const user=new UserModel({name, email, password:hashedPassword})
    await user.save()

    res.status(200).send({msg:"User registered scuessfully"})
  } catch (err) {
    res.status(500).send({msg:"Error in registering user", err:err.message})
  }
})

userRoute.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //find user by email
    const user = await UserModel.findOne({ email });

    if (!user) {
      res.send({ message: "Invalid username or password" });
    }

    //compare the password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      res.send({ message: "Invalid username or password" });
    }

    //generate tokens
    const acessToken = jwt.sign({ userId: user._id }, process.env.JWT_CODE, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign({ userId: user._id },process.env.JWT_SECRET_CODE,{
        expiresIn: "2h",
    });
    res.send({user, acessToken, refreshToken });
  } catch (err) {
    // res.send({ msg: "something went wrong", error: err.message });
    next(err)
  }
});

module.exports={userRoute}