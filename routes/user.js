const express = require("express");
const router = express.Router();
const {
  getUsers,
  getAllUsers,
  userStats,
  userUpdateUsingAuth,
  deleteUser,
} = require("../controller/user");
const { register, login } = require("../controller/auth");
const User = require("../models/User");

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../controller/verifyToken");
//Register User
router.route("/auth/register").post(register);
//Login
router.route("/auth/login").post(login);
//Update
router.put("/update/:id", verifyTokenAndAuthorization, userUpdateUsingAuth);
//DELETE
router.delete("/delete/:id", verifyTokenAndAuthorization, deleteUser);
//Get User Stats
router.get("/stats", verifyTokenAndAdmin, userStats);
//Get User / All User's
router.get("/:id", verifyTokenAndAdmin, getUsers);
router.get("/", verifyTokenAndAdmin, getAllUsers);

module.exports = router;
