const Order = require("../models/Order");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../controller/verifyToken");

const router = require("express").Router();
const {
  createOrder,
  updateOrder,
  deleteOrder,
  getSingleOrder,
  getAllOrder,
  getMonthlyIncome,
} = require("../controller/order");
//CREATE

router.post("/", verifyToken, createOrder);

//UPDATE
router.put("/:id", verifyTokenAndAdmin, updateOrder);

//DELETE
router.delete("/:id", verifyTokenAndAdmin, deleteOrder);

//GET USER SINGLE ORDERS
router.get("/find/:userId", verifyTokenAndAuthorization, getSingleOrder);

//GET ALL

router.get("/", verifyTokenAndAdmin, getAllOrder);

// GET MONTHLY INCOME

router.get("/income", verifyTokenAndAdmin, getMonthlyIncome);

module.exports = router