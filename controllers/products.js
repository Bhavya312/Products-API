const { CustomAPIError, createCustomError } = require("../errors/custom-error");
const asyncWrapper = require("../middleware/async");
const Product = require("../models/Product");

const getAllProducts = asyncWrapper(async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({ data:products });
});

const createProduct = asyncWrapper(async (req, res) => {
  const data = { ...req.body };
  const product = await Product.create(data);
  res.status(201).json({ product });
});

const getProduct = asyncWrapper(async (req, res) => {
  const {id: productId } = req.params;
  const product = await Product.findOne({ _id:productId })
  if(!product){
    return createCustomError(`No product with id : ${productId}`, 404);
  }

  res.status(200).send({ product });
});

const updateProduct = asyncWrapper(async (req, res) => {
  const { id: productId } = req.params;
  const data = { ...req.body };
  if(req.file){
    data.image = req.file.path;
  }

  const product = await Product.findOneAndUpdate({_id: productId}, data, {
    new: true,
    runValidators: true,
  })

  if(!product){
    return createCustomError(`No product with id : ${productId}`, 404);
  }

  res.status(200).json({ product });
});

const deleteProduct = asyncWrapper(async (req, res) => {
  const {id: productId } = req.params;
  const product = await Product.findOneAndDelete({ _id:productId })
  if(!product){
    return createCustomError(`No product with id : ${productId}`, 404);
  }
  res.status(200).json({ product })
});

module.exports = {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};