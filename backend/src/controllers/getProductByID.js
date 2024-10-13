import Product from "../models/product.model";

const getProductByID= async (req, res) => {
    try {
      const { id } = req.params;  // Extracting the product ID from the URL parameter
  
      // Check if the ID is a valid MongoDB ObjectID
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }
  
      // Fetch the product by its ID
      const product = await Product.findById(id);
  
      // If the product is not found, return a 404 status
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      // If the product is found, return it as a response
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json({ message: "Error retrieving product", error: err.message });
    }
  };

  export default getProductByID; 