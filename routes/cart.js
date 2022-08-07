const { Router } = require("express");
const express = require("express");
const router = express.Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../controller/verifyToken");
const {
  createCart,
  updateCart,
  deleteCart,
  getUserCart,
  getAllCart,
} = require("../controller/cart");
//Create Cart
router.post("/", verifyToken, createCart);
//Update Cart
router.post("/:id", verifyTokenAndAuthorization, updateCart);
//Delete Cart
router.delete("/:id", verifyTokenAndAuthorization, deleteCart);
//Get User Cart
router.get("/find/:userId", verifyTokenAndAuthorization, getUserCart);
//Get All
router.get("/", verifyTokenAndAdmin, getAllCart);

module.exports = router;
