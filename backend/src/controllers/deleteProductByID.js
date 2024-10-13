import Product from "../models/product.model";

const deleteProductByID = async (req, res) => {
    try {
      const { id } = req.params;  // Extracting the product ID from the URL parameter
  
      // Check if the ID is a valid MongoDB ObjectID
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }
  
      // Find the product by ID and delete it
      const deletedProduct = await Product.findByIdAndDelete(id);
  
      // If the product is not found, return a 404 status
      if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      // If the product is successfully deleted, return a success message
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Error deleting product", error: err.message });
    }
  };

  export default deleteProductByID;