const updateProductByID=async (req, res) => {
    try {
      const { id } = req.params;  // Extracting the product ID from the URL parameter
      const { name, price, description, category } = req.body; // Extracting product data from the request body
  
      // Check if the ID is a valid MongoDB ObjectID
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }
  
      // Validate the input data (simple validation, you can customize this further)
      if (!name || !price || !category) {
        return res.status(400).json({ message: "Name, price, and category are required fields" });
      }
  
      // Find the product by ID and update it with new data
      const updatedProduct = await Product.findByIdAndUpdate(
        id, // ID of the product to update
        { name, price, description, category }, // Fields to update
        { new: true, runValidators: true } // Return the updated product, run validation
      );
  
      // If the product is not found, return a 404 status
      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      // If the product is successfully updated, return it as a response
      res.status(200).json(updatedProduct);
    } catch (err) {
      res.status(500).json({ message: "Error updating product", error: err.message });
    }
  };


  export default updateProductByID; 