const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const cartRouter = require("./routes/cart");
const orderRouter = require("./routes/order")
//dotenv
dotenv.config();
//DB Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => console.log(err));
//middleware
app.use(express.json());
//Routes
app.use("/api/user/", userRouter);
app.use("/api/product/", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order",orderRouter)

//listening
app.listen(process.env.PORT || 3000, () =>
  process.env.PORT
    ? console.log("Server is running on port " + process.env.PORT)
    : console.log("Server is running on port 3000")
);
