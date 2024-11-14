const express=require('express')
const userController = require('../Controllers/userController')
const projectController = require('../Controllers/projectController')
const jwtMiddleware=require('../middlewares/jwtMiddleware')

const multerConfig = require('../middlewares/multerMiddleware')
const multerMiddleware = require('../middlewares/multerMiddleware')


const route=express.Router()

route.post('/reg',userController.userRegister)
route.post('/log',userController.userLogin)
route.put('/updateuser',jwtMiddleware,multerMiddleware.single('profile'),userController.userUpdate)


route.post('/addproject',jwtMiddleware,multerConfig.single('image'), projectController.addProject)

route.get('/getlist',jwtMiddleware,projectController.getProjects)

route.delete('/deletepro/:pid',jwtMiddleware,projectController.deleteProjects)

route.put('/updatepro/:pid',jwtMiddleware,multerConfig.single('image'),projectController.updateProjects)

route.get('/getallpro',projectController.allProjects)

route.get('/search',projectController.searchProjects)


module.exports=route