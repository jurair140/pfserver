const jwt = require('jsonwebtoken')
const users = require('../Models/userModel')



exports.userRegister=async (req,res)=>{

   try{
      const {email,username,password,profile,github,linkedin} = req.body

      if (!email ||!username ||!password){
        res.status(406).json('invalid')
      }
      else{
        const newUser = new users({email,username,password,profile,github,linkedin})
        await newUser.save()
        res.status(200).json(newUser)
      }
   }
   catch(err){
      console.log(err)
      res.status(400).json(err)
   }
   
}

 exports.userLogin=async (req,res)=>{
   try{
      const {email,password} = req.body
      const existing = await users.findOne({email,password})
      if(existing){
         const token = jwt.sign({userId : existing._id},process.env.SECRET_KEY)
         res.status(200).json({token,username:existing.username,github:existing.github,linkedin:existing.linkedin,profile:existing.profile})
      }
      else{
         res.status(406).json("invalid email/password")
      }
   }
   catch(err){
      console.log(err)
      res.status(400).json(err)
   }
 }

 exports.userUpdate = async (req,res)=>{
  try{

   const userid = req.payload

   if(req.file){
      var profile = req.file.filename
      var {username,github,linkedin} = req.body
   }
   else{
      var {profile,username,github,linkedin} = req.body

   }

   const updateUser = await users.findByIdAndUpdate(userid,
      {profile,username,github,linkedin})

      res.status(200).json(updateUser)
  }
  catch(err){
   console.log(err)
   res.status(400).json(err)
}
   
 }


