import express from "express"
import addProduct from "../controllers/addProduct.js";
import getProduct from "../controllers/getProduct.js";
import getProductByID from "../controllers/getProductByID.js";
import updateProductByID from "../controllers/updateProductByID.js";
import deleteProductByID from "../controllers/deleteProductByID.js";
import searchProducts from "../controllers/searchProduct.js";

const router = express.Router();


router.post("/add", addProduct)
router.get("/view", getProduct)
router.get("/view/:id", getProductByID)
router.put("/update/:id", updateProductByID)
router.delete("/delete/:id", deleteProductByID)
router.get("/search", searchProducts)


export default router; 

