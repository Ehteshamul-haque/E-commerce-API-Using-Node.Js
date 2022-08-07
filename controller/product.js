const Product = require("../models/Product");

//Create Product
const createProduct = async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

//Update Product
const updateProduct = async (req, res) => {
  try {
    const update = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(update);
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};
//DELETE
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product is deleted!")
  } catch (err) {
    res.status(500).json("ERROR");
  }
};

//GET ONE PRODUCT
const getOneProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};

//GET ALL PRODUCT WITH SORT,LIMIT,SEARCH
const getAllProduct = async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let product;
    if (qNew) {
      product = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      product = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      product = await Product.find();
      console.log(qNew, qCategory);
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getOneProduct,
  getAllProduct,
};
