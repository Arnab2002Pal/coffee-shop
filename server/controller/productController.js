const Product = require("../models/product");
const CoffeeShop = require("../models/coffeeShop");

const handleErrorResponse = (res, message, error, statusCode = 500) => {
  console.error(message, error);
  return res.status(statusCode).json({ message, error: error.message });
};

const getProductsByCoffeeShop = async (req, res) => {
  try {
    const products = await Product.find({ coffeeShop: req.params.coffeeShopId });
    return res.status(200).json(products);
  } catch (error) {
    return handleErrorResponse(res, "Error fetching products", error);
  }
};

const createProduct = async (req, res) => {
  const { name, price, category, coffeeShopId } = req.body;

  try {
    const coffeeShop = await CoffeeShop.findById(coffeeShopId);
    if (!coffeeShop) {
      return res.status(404).json({ message: "Coffee Shop not found" });
    }

    const product = new Product({
      name,
      price,
      category,
      coffeeShop: coffeeShopId,
    });

    await product.save();

    if (!Array.isArray(coffeeShop.products)) {
      coffeeShop.products = [];
    }

    coffeeShop.products.push(product._id);
    await coffeeShop.save();

    return res.status(201).json({ product });
  } catch (error) {
    return handleErrorResponse(res, "Error creating product", error);
  }
};

module.exports = {
  getProductsByCoffeeShop,
  createProduct,
};
