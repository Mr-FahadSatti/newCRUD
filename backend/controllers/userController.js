const express= require('express')
const UserModel= require('../models/userModel')
const bcrypt = require('bcrypt');
const detail = require('../models/detailModel');
const userModel = require('../models/userModel');
const bookModel = require('../models/bookModel')
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

        
        const passswordRegex = /^(?=.*[0-9])(?=.*[!@#$%&])(?=.*[a-zA-Z]).{8,}$/;
        if(!passswordRegex.test(password))
        {
            return res.status(400).json({message:'Password length too short and should contain numeric, one special character such as !@#$%&'})
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
        //const {username,email,password}=req.body;
        //const oldpassword =bcrypt.compareSync(password, hash);
        //console.log(oldpassword)
        const allUser= await UserModel.find();
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
        const {username, email,password}= req.body
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        
        const passswordRegex = /^(?=.*[0-9])(?=.*[!@#$%&])(?=.*[a-zA-Z]).{8,}$/;
        if(!passswordRegex.test(password))
        {
            return res.status(400).json({message:'Invalid password format'})
        }
        const salt= await bcrypt.genSalt(10)
        const hashPassword = bcrypt.hashSync(password,salt)
        const updateduser= await UserModel.findOneAndUpdate(
            {_id:id},
            {$set:{username,email,password:hashPassword}},
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


exports.getUserDetail = async (req, res) => {
    const { email } = req.params;
    //const email = req.params.email
    try {
        // if (!email) {
        //     return res.status(404).json("User not found!");
        // }

        const userDetail = await userModel.aggregate([
            {
                $match: {
                    user_email: email,
                },
            },
            {
                $lookup: {
                    from : "details",
                    localField : "email",
                    foreignField : "user_email",
                    as : "More_Detail",
                },              
            },
            {
                $lookup:
                {
                    from : "books",
                    localField : "email",
                    foreignField : "user_email",
                    as : "Book_Detail"
                }
            }
            // {
            //     $project:{
            //         age: 1,
            //         city:1,
            //         user_email:1
            //     },
            // }
        ]);

        if (!userDetail || userDetail.length === 0) {
            return res.status(404).json("No User");
        }

        console.log("Here is detail",userDetail);
        res.status(200).json(200,userDetail);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};


exports.getUserDetailByEmail = async (req, res) => {
    const { email } = req.params;       //extract the email from params 
    try {
         if (!email) {
             return res.status(404).json("User not found!");
         }

        const userDetail = await userModel.aggregate([     //name of model of collection before .aggregate
            {
                $match: {
                    email: email,  
                },
            },
            {
                $lookup: {                          //always do left join
                    from : "details",              // model name of left table
                    localField : "email",       //on the base of fetching is performed 
                    foreignField : "user_email",          //same attribute on other collection
                    as : "More_Detail",               // any name to save that record
                },
                
            },
            {                                   // to get data from another table using same key
                $lookup:{
                    from : "books",
                    localField : "email",
                    foreignField : "user_email",
                    as : "Book_detail"
                },
                
            },
           
        //    {
        //         $project:{                  // to get specific data, not all record
        //             age: 1,
        //             city:1,
        //             user_email: 1,
        //             username:1,
        //             email:1,
        //         },
        //   }
        ]);

        if (!userDetail || userDetail.length === 0) {
            return res.status(404).json("No User");
        }

        console.log("Here is detail",userDetail);
        res.status(200).json(200,userDetail[0]);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};


exports.createBook = async(req, res) =>{
    
    try{
        const bookData = await bookModel.create(req.body);
        res.status(200).json(bookData)
        console.log("Book saved successfuly")
    }
    catch(error)
    {
        res.status(400).json({message: error.message})
    }
}
