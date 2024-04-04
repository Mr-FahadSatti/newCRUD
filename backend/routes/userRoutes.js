const express = require('express')
const userControllers = require('../controllers/userController')
const router= express.Router()

router.post('/create',userControllers.createUser)
router.get('/getall',userControllers.getAllUser)
router.get('/getbyId/:id',userControllers.getByID)
router.put('/update/:id',userControllers.updateUser)
router.delete('/delete/:id',userControllers.deleteUser)
router.get('/userdetailbyemail/:email',userControllers.getUserDetailByEmail)
router.get('/userdetail/',userControllers.getUserDetail)
router.post('/book/',userControllers.createBook)

module.exports=router   