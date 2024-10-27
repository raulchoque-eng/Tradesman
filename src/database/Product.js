const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

const getAllProducts = () => {
  try {
    return DB.products;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

const getOneProduct = (productId) => {
  try {
    const product = DB.products.find((product) => product.id === productId);
    if (!product) {
      throw {
        status: 400,
        message: `Can not find product with the id '${productId}'`
      };
    }
    return product;
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error 
    };
  }

};

const createNewProduct = (newProduct) => {
  try {
    const isAlreadyAdded = 
      DB.products.findIndex((product) => product.name === newProduct.name) > -1;
    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `Product with the name: '${newProduct.name}' already exists`,
      };
    }
    DB.products.push(newProduct);
    saveToDatabase(DB);
    return newProduct;
  } catch (error) {
    throw { 
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};

const updateOneProduct = (productId, changes) => {
  try {
    const indexForUpdate = DB.products.findIndex(
      (product) => product.id === productId
    );
    if (indexForUpdate === -1) {
      throw {
        status: 400,
        message: `Can not find product with the id '${productId}'`,
      };
    }
    const updatedProduct = {
      id: productId,
      ...changes,
    };
    DB.products[indexForUpdate] = updatedProduct;
    saveToDatabase(DB);
    return updatedProduct;
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    }
  }
};

const deleteOneProduct = (productId) => {
  try {
    const indexForDelete = DB.products.findIndex(
      (product) => product.id ===productId
    );
    if (indexForDelete === -1) {
      throw {
        status: 400,
        message: `Can not find product with the id '${productId}'`,
      }
    }
    DB.products.splice(indexForDelete, 1);
    saveToDatabase(DB);
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    }
  }
};

module.exports = { 
  getAllProducts,
  getOneProduct,
  createNewProduct,
  updateOneProduct,
  deleteOneProduct,
};