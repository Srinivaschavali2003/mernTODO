const cookieParser = require("cookie-parser");
const express = require("express");
const { default: mongoose } = require("mongoose");
const cors = require('cors'); 
const morgan = require('morgan'); 
require("dotenv").config(); 
const allRoutes = require('./routes/index'); 
const app  =express(); 

//:


//middleware: 
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend's URL
    credentials: true
}));
app.use(morgan('tiny')); 
app.use(express.json()); 
app.use(cookieParser());

//routes:
app.use('/api',allRoutes); 
// error handler : 
app.use((err,req,res,next) =>{
    const status = err.statusCode || 500 ; 
    const message = err.message || 'Internal Server Error';
    
    return res.status(status).json({message,stack:err.stack});  
})

const connectDB=  async() =>{
    try{
        await mongoose.connect(process.env.DB_CONNECTION_STRING) ;
        console.log("MongoDB connected"); 
    }
    catch(err){
        console.log(err); 
    }
}

app.listen(process.env.PORTNUM,function(req,res){
    connectDB(); 
    console.log("Server is running on port 5000")
})