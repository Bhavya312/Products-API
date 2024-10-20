const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");
const multer = require("multer");
const diskStorage = require('../fileupload/multerupload');
const validateData = require("../middleware/validation");
const { productStoreSchema } = require("../schema/productSchema");
const upload = multer({ storage: diskStorage }) 

router.route("/").get(getAllProducts).post(upload.single('image'),  validateData(productStoreSchema), createProduct);
router.route("/").get(getAllProducts).post(createProduct);
router.route("/:id").get(getProduct).patch(upload.single('image'), updateProduct).delete(deleteProduct);

module.exports = router;
