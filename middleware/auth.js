const jwt=require("jsonwebtoken")
const {UserModel}=require("../models/user.model")
const authMiddleware=async(req,res,next)=>{
    try {
        const token=req.headers.authorization
        if(!token){
            res.status(401).send({msg:"Login again session expired"})
        }

        const decodeToken=jwt.verify(token, process.env.JWT_CODE)
        const {userID}=decodeToken

        next()
    } catch (err) {
        return res.status(401).send({msg:"Unauthorized"})
    }
}

module.exports={authMiddleware}