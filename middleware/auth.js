const jwt= require("jsonwebtoken");
const dotenv= require("dotenv");
dotenv.config();
const SECRET_KEY= process.env.SECRET_KEY;

const validateToken= (req, res, next)=>{
    const token= req.headers.authorization;
    if(!token){
        res.status(403).json({
            message: "User not logged in!"
        })
    }else{
        try {
            const decode= jwt.verify(token, SECRET_KEY);
            const data= decode.data;
            req.user= data;
            next();
        } catch ({error}) {
            res.status(400).json({
                message: error.message
            })
        }
    }
}
module.exports= {validateToken};