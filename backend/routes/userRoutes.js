const express = require('express')
const userControllers = require('../controllers/userController')
const router= express.Router()

router.post('/create',userControllers.createUser)
router.get('/getall',userControllers.getAllUser)
router.get('/getbyId/:id',userControllers.getByID)
router.put('/update/:id',userControllers.updateUser)
router.delete('/delete/:id',userControllers.deleteUser)

module.exports=router   