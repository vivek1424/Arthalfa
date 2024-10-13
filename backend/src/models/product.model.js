import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		description: {
			type: String,
			required: false,
			minlength: 6,
            maxlength: 100
		},
		
        category: {
			type: String,
			required: true
		},
		// createdAt, updatedAt => Member since <createdAt>
	},
	
);

const Product = mongoose.model("Product", productSchema);

export default Product;