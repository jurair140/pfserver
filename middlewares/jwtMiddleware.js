const jwt=require('jsonwebtoken')

const jwtMiddleware=(req,res,next)=>{
try{
    console.log(req.headers)
    token=req.headers.authorization.split(" ")[1]
    const data=jwt.verify(token,process.env.SECRET_KEY)
    console.log(data)
    if(data){
      const {userId}=data
      req.payload=userId
      next()
    }
    else{
        res.status(400).json("invalid token")

    }
}
catch(err){
    console.log(err)
    res.status(404).json(err)
}
 
}






module.exports=jwtMiddleware