import mongoose from "mongoose";


const connectToDB = async ()=> { 
    try {
        await mongoose.connect(process.env.MONGODB_URI); 
        console.log("Succesfully connected to the DB");
    } catch (error) {
        console.log("Error occured", error.message);
        return res.json({message: "Error occured"}); 
    }
    
}


export default connectToDB; 