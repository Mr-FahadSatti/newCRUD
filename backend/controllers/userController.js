const express= require('express')
const UserModel= require('../models/userModel')
const bcrypt = require('bcrypt');

// exports.createUser= async (req, res)=>{
//     console.log(req.body)
//     try{
//         const newuser = await UserModel.create(req.body)
//         res.status(200).json(newuser)
//     }
//     catch(error)
//     {
//         res.status(400).json({message:error.message})
//     }
// }

exports.createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate email format
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);
        const newUser = new UserModel({
            username,
            email,
            password: hashPassword
        });

        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getAllUser = async (req,res)=>{
    try{
        const allUser= await UserModel.find({});
        res.status(200).json(allUser)
    }
    catch(error)
    {
        res.status(400).json({message:error.message})
    }
}

exports.getByID = async (req, res)=>{
    
    try{
        const user = await UserModel.findById(req.params.id)
        //const {passsword,...info} = user._doc
        res.status(200).json(user)
    }
    catch(error)
    {
        res.status(500).json(error)
    }
    console.log("Get by id working")
}

exports.updateUser = async (req,res)=>{
    console.log("entered in update function")
    let id= req.params.id.trim()
    try{
        const updateduser= await UserModel.findOneAndUpdate(
            {_id:id},
            req.body,
            {new:true}
        )
        if(!updateduser)
        {
            req.status(404).json({message:'No user found'})
        }
        res.status(200).json({message:'Updates Sucessfuly',updateduser})
    }
    catch(error)
    {
        res.status(400).json({message:error.message})
    }
}

// exports.updateUser = async(req,res)=>{
//     try{
//         console.log("moved here 1")
//         if(req.body.passsword)
//         {
//             console.log("moved here 2")
//             const salt = await bcrypt.genSalt(10)
//             req.body.passsword= bcrypt.hashSync(req.body.passsword,salt)
//             console.log("salt :",salt)
//             console.log("bcrypt pasword :",req.body.passsword)
//         }
//         console.log("moved here 3")
//         const updatedUser = await User.findByIdAndUpdate(req.params.id,
//         {$set: req.body},
//         {new: true}
//         );
//         res.status(200).json(updatedUser)
//         console.log("user updated.")
//     }
//     catch(error)
//     {
//         res.status(500).json({message:error.message})
//     }
// }

exports.deleteUser = async (req,res)=>{
    let id= req.params.id.trim()
    try{
        const deleted = await UserModel.findOneAndDelete({_id:id})
        if(!deleted)
        {
            res.status(404).json({message:'User not found'})
        }
        res.status(200).json({message:'Deleted Succeccfuly',deleted})
    }
    catch(error)
    {
        res.status(200).json({message:error.message})
    }

}