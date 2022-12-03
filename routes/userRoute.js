const express = require("express");
const router= express.Router();
const User= require("../models/user");
const jwt= require("jsonwebtoken");
const dotenv= require("dotenv");
dotenv.config();
const SECRET_KEY= process.env.SECRET_KEY;

router.post("/register", async(req, res) =>{
    try {
        const {email, password, cpassword} = req.body;
        const user= await User.findOne({email: email});
        if(user){
            res.status(203).json({
                message: "User already regsitered!"
            })
        }
        else{
            const user= await User.create({
                email, password, cpassword
            })
            res.status(200).json({
                message: "User registered successfully!",
                user
            })
        }
    } catch (error) {
        res.status(401).json({
            message: error.message
        })
    }
})

router.post("/login", async(req, res) =>{
    try {
        const {email, password} = req.body;
        const user= await User.findOne({email: email});
        if(user){
            const token= jwt.sign({
                data: email
            }, SECRET_KEY)
            res.status(203).json({
                message: "user login successfull!",
                token
            })
        }
        else{
            res.status(203).json({
                message: "user not registered"
            })
        }
    } catch (error) {
        res.status(401).json({
            message: error.message
        })
    }
})

module.exports= router;