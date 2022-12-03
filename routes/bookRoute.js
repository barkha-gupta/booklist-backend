const express = require("express");
const router= express.Router();
const {validateToken} = require("../middleware/auth")
const Booklist= require("../models/book");
const User = require("../models/user");

router.get("/username", validateToken, async (req, res) => {
    const data = await User.findOne({ email: req.user });
    res.json(data);
});

router.get("/", validateToken, async(req, res) => {
    try {
        const booklist= await Booklist.find({user : req.user});
        res.status(200).json({
            booklist
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})

router.post("/create", validateToken, async(req, res) => {
    try {
        const {title, isbn, author, description, publishedDate, publisher}= req.body;
        const book= await Booklist.create({
            title,
            isbn,
            author,
            description, 
            publishedDate, 
            publisher, 
            user: req.user
        })
        res.status(200).json({
            message: "new book added",
            book
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})

router.delete("/", validateToken, async(req, res) => {
    try {
        console.log(req.body)
        
        // const book= await Booklist.findOne({_id : id})
        // if(book){
        //     const deletebook = await Booklist.deleteOne(book)
        // res.status(200).json({
        //     message: "book deleted",
        //     book
        // })
        // }
        
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})

module.exports= router;