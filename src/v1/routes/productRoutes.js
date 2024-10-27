const express = require("express");
const productController = require("../../controllers/productController");

const router = express.Router();

router.get("/", productController.getAllProducts);

router.get("/:productId", productController.getOneProduct);

router.post("/", productController.createNewProduct);

router.patch("/:productId", productController.updateOneProduct);

router.delete("/:productId", productController.deleteOneProduct);

module.exports = router;