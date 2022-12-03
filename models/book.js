const mongoose= require("mongoose");
const bookSchema= new mongoose.Schema({
    title: String,
    isbn: String,
    author: String,
    description: String,
    publishedDate: String,
    publisher: String,
    user: {
        type: String,
        ref: "User"
    }
})
const Booklist= mongoose.model("Booklist", bookSchema);
module.exports= Booklist;