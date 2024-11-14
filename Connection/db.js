const mongoose = require('mongoose')

const connectionString = process.env.DATABASE

mongoose.connect(connectionString).then(res=>{
    console.log('Connected to MongoDB') 
}).catch(err=>{
    console.log(err)
})
