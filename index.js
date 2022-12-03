const express = require("express");
const app = express();
const dotenv= require("dotenv");
const bodyparser= require("body-parser");
const mongoose= require("mongoose");
const userRoute= require("./routes/userRoute");
const booklistRoute= require("./routes/bookRoute")
dotenv.config();

app.use(bodyparser.urlencoded({extended: false}));
app.use(express.json());

app.use("/user", userRoute);
app.use("/booklist", booklistRoute);
app.get("/", (req, res) =>{
    res.send("Server side")
})

const PORT= process.env.PORT || 5000;
const MONGO_URI= process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
.then(() => console.log(`connected to database`))
.catch((error) => console.log(`not connected to database. error: ${error}`))

app.listen(PORT, console.log(`Server successfully connected at ${PORT}`));