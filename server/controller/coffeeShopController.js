const { z } = require("zod");
const CoffeeShop = require("../models/coffeeShop");
const cloudinary = require("cloudinary");

const getShops = async (req, res) => {
  try {
    const { search } = req.query; 
    let shopDetails;

    if (search && search.trim().length > 0) {
      const searchRegex = new RegExp(search, 'i'); 
      shopDetails = await CoffeeShop.find({ name: searchRegex });
    } else {
      shopDetails = await CoffeeShop.find();
    }

    return res.status(200).json({ data: shopDetails });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching shops", error: error.message });
  }
};


// Get a single coffee shop by ID
const getShop = async (req, res) => {
  try {
    const shop = await CoffeeShop.findById(req.params.id);
    if (!shop) {
      return res.status(404).json({ message: "Coffee shop not found" });
    }
    return res.status(200).json({ data: shop });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching shop", error: error.message });
  }
};

// Register a new coffee shop
const registerShop = async (req, res) => {
  const { name, description, address, location, ratings, image, products } =
    req.body;

  try {
    // Upload image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(image, {
      folder: "coffee-shop",
    });

    // Create new coffee shop instance
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

    // Save new coffee shop to database
    await newCoffeeShop.save();
    res.status(201).json(newCoffeeShop);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Edit an existing coffee shop
const editShop = async (req, res) => {
  const { name, description, address, location, ratings, image, products } =
    req.body;

  try {
    let updateData = {
      name,
      description,
      address,
      location,
      ratings,
      products,
    };

    // Check if there is a new image to upload
    if (image) {
      // Upload image to Cloudinary
      const uploadResult = await cloudinary.uploader.upload(image, {
        folder: "coffee-shop",
      });

      // Update image details in updateData
      updateData.image = {
        public_id: uploadResult.public_id,
        url: uploadResult.secure_url,
      };
    }

    // Find coffee shop by ID and update
    const updatedShop = await CoffeeShop.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedShop) {
      return res.status(404).json({ error: "Coffee shop not found" });
    }

    res.status(200).json(updatedShop);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getShops,
  getShop,
  registerShop,
  editShop,
};
