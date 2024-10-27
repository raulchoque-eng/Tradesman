const productService = require("../services/productService");

const getAllProducts = (req, res) => {
  try {
    const allProducts = productService.getAllProducts();
    res.send({ status: "OK", data: allProducts });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", message: { error: error?.message || error } });
  }
};

const getOneProduct = (req, res) => {
  const {
    params: { productId },
  } = req;
  if (!productId) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: { error: "Parameter ':productId' can not empty"},
      });
  }
  try {
    const product = productService.getOneProduct(productId);
    res.send({ status: "OK", data: product });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error} });
  }
};

const createNewProduct = (req, res) => {
  const { body } = req;
  if (
    !body.name || 
    !body.fields
  ) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: {
          error:
            "One of the following keys is missing or is empty in request body: 'name', 'fields'",
        },
      });
  }
  const newProduct = {
    name: body.name,
    fields: body.fields,
  };
  try {
    const createdProduct = productService.createNewProduct(newProduct);
    res.status(201).send({ status: "OK", data: createdProduct });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const updateOneProduct = (req, res) => {
  const {
    body,
    params : { productId },
  } = req;
  if (!productId) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: { error: "Parameter ':productId' can not be empty"},
      });
  }
  try {
    const updatedProduct = productService.updateOneProduct(productId, body);
    res.send({ status: "OK", data: updatedProduct });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({
        status: "FAILED",
        data: { error: error?.message || error},
      });
  }
};

const deleteOneProduct = (req, res) => {
  const {
    params: { productId },
  } = req;
  if (!productId) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: { error: "Parameter ':productId' can no be empty"},
      });
  }
  try {
    productService.deleteOneProduct(productId);
    res.status(204).send({ status: "OK" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({
        status: "FAILED",
        data: { error: error?.message || error },
      });
  }
};

module.exports = {
  getAllProducts,
  getOneProduct,
  createNewProduct,
  updateOneProduct,
  deleteOneProduct,
};