const { Router } = require("express");
const express = require("express");
const router = express.Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../controller/verifyToken");
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getOneProduct,
  getAllProduct
} = require("../controller/product");
//CREATE PRODUCT
router.post("/add", verifyTokenAndAdmin, createProduct);
//DELETE PRODUCT
router.delete("/:id",verifyTokenAndAdmin,deleteProduct)
//UPDATE PRODUCT
router.put("/:id", verifyTokenAndAdmin, updateProduct);

//GET SINGLE PRODUCT
router.get("/:id", getOneProduct);
//GET ALL PRODUCT
router.get("/",getAllProduct)
module.exports = router;
