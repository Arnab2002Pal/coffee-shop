const CoffeeShop = require("../models/coffeeShop");
const cloudinary = require("cloudinary");

const handleErrorResponse = (res, message, error, statusCode = 500) => {
  console.error(message, error);
  return res.status(statusCode).json({ message, error: error.message });
};

const getAllShops = async (req, res) => {
  try {
    const { search } = req.query;
    const searchCondition = search ? { name: new RegExp(search, 'i') } : {};
    const shopDetails = await CoffeeShop.find(searchCondition);
    return res.status(200).json({ data: shopDetails });
  } catch (error) {
    return handleErrorResponse(res, "Error fetching shops", error);
  }
};

const getShop = async (req, res) => {
  try {
    const shop = await CoffeeShop.findById(req.params.id);
    if (!shop) {
      return res.status(404).json({ message: "Coffee shop not found" });
    }
    return res.status(200).json({ data: shop });
  } catch (error) {
    return handleErrorResponse(res, "Error fetching shop", error);
  }
};

const registerShop = async (req, res) => {
  const { name, description, address, location, ratings, image, products } = req.body;

  try {
    const uploadResult = await cloudinary.uploader.upload(image, { folder: "coffee-shop" });
    const newCoffeeShop = new CoffeeShop({
      name,
      description,
      address,
      location,
      ratings,
      image: {
        public_id: uploadResult.public_id,
        url: uploadResult.secure_url,
      },
      products,
    });

    await newCoffeeShop.save();
    return res.status(201).json(newCoffeeShop);
  } catch (error) {
    return handleErrorResponse(res, "Error registering shop", error);
  }
};

const editShop = async (req, res) => {
  const { name, description, address, location, ratings } = req.body;
  const updateData = {
    name,
    description,
    address,
    location,
    ratings,
  };

  try {
    const updatedShop = await CoffeeShop.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedShop) {
      return res.status(404).json({ message: "Coffee shop not found" });
    }
    return res.status(200).json(updatedShop);
  } catch (error) {
    return handleErrorResponse(res, "Error updating shop", error);
  }
};

const deleteShop = async (req, res) => {
  try {
    const shop = await CoffeeShop.findById(req.params.id);
    if (!shop) {
      return res.status(404).json({ message: "Coffee shop not found" });
    }

    if (shop.image && shop.image.public_id) {
      await cloudinary.uploader.destroy(shop.image.public_id);
    }

    await CoffeeShop.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Coffee shop deleted successfully" });
  } catch (error) {
    return handleErrorResponse(res, "Error deleting coffee shop", error);
  }
};

module.exports = {
  getAllShops,
  getShop,
  registerShop,
  editShop,
  deleteShop,
};
