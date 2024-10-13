import Product from "../models/product.model";

const constructSearchQuery = (queryParams) => {
    let constructedQuery = {};
  
    // If searching by name
    if (queryParams.name) {
      constructedQuery.name = new RegExp(queryParams.name, "i"); // Case-insensitive search
    }
  
    // If searching by category
    if (queryParams.category) {
      constructedQuery.category = new RegExp(queryParams.category, "i"); // Case-insensitive search
    }

    return constructedQuery; 
}



const searchProduct = async (req, res) => {
    try {
      // Get pagination params from query string
      const { page = 1, limit = 10 } = req.query; // Default to page 1 and limit 10
  
      // Construct the search query based on the query params
      const searchQuery = constructSearchQuery(req.query);
  
      // Convert page and limit to integers
      const pageNumber = parseInt(page, 10);
      const pageLimit = parseInt(limit, 10);
  
      // Calculate the number of products to skip
      const skip = (pageNumber - 1) * pageLimit;
  
      // Query to find products with pagination and filtering
      const products = await Product.find(searchQuery)
        .skip(skip)  // Skip to the correct page
        .limit(pageLimit)  // Limit the number of products per page
        .sort({ createdAt: -1 }); // Optionally sort by creation date or other criteria
  
      // Get the total number of products for pagination info
      const totalProducts = await Product.countDocuments(searchQuery);
  
      // Calculate the total number of pages
      const totalPages = Math.ceil(totalProducts / pageLimit);
  
      // If no products found
      if (products.length === 0) {
        return res.status(404).json({ message: "No products found" });
      }
  
      // Send paginated results with metadata
      res.status(200).json({
        products,
        pagination: {
          totalProducts,
          totalPages,
          currentPage: pageNumber,
          productsPerPage: pageLimit,
        }
      });
    } catch (err) {
      res.status(500).json({ message: "Error listing products", error: err.message });
    }
  };

  export default searchProduct; 
  