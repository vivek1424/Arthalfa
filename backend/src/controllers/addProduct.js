import Product from "../models/product.model.js";
import mongoose from "mongoose";
const addProduct = async( req, res)=> { 
    try {
        const {name, price, description, category}= req.body ; 
    
        if( !name || !price || !category) { 
            return res.status(401).json({message: "Complete details are required"})
        }
        
        const newProduct = new Product({
            name, 
            price, 
            category,
            description
        })
    
        await newProduct.save(); 
        console.log("Added the product succesfully");
        return res.status(200).json({message: "Product added succesfully"})
        
    } catch (error) {
        console.log("Failed to add the product ");
        return res.status(402).json({message: "Product added succesfully"})
    }
    
}

export default addProduct; 