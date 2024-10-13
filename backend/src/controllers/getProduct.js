import Product from "../models/product.model";


const getProduct= async (req, res) => {
    try {
      // Default page and limit
      const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
      const limit = parseInt(req.query.limit) || 10; // Default to 10 products per page
  
      // Calculate the starting index of the products for the current page
      const startIndex = (page - 1) * limit;
  
      // Get the total number of products
      const totalProducts = await Product.countDocuments();
  
      // Fetch the products for the current page with pagination
      const products = await Product.find()
        .skip(startIndex)
        .limit(limit);
  
      // Send the paginated response with metadata
      res.status(200).json({
        page,
        limit,
        totalProducts,
        totalPages: Math.ceil(totalProducts / limit),
        data: products,
      });
    } catch (err) {
      res.status(500).json({ message: "Error retrieving products", error: err.message });
    }
  };

  export default getProduct;