const Product = require("../models/product");
const CoffeeShop = require("../models/coffeeShop");

const getProductsByCoffeeShop = async (req, res) => {
  try {
    const products = await Product.find({ coffeeShop: req.params.coffeeShopId });
    return res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ message: error.message });
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

    res.status(201).json({ product });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getProductsByCoffeeShop,
  createProduct
};
