import express from 'express'
import dotenv from 'dotenv'
import connectToDB from './dbConnect/connectToDB.js';
import addProductRoute from './routes/product.route.js';

dotenv.config() ; 
const app=express(); 

connectToDB(); 

app.get("/api/test", async(req, res)=>{
    res.status(200).json({message:" This is the test website"})
})

app.use("/api/product", addProductRoute)

app.listen(6000, ()=>{ 

    console.log("Listening on port 6000");
    
})
