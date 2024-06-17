const { z } = require("zod");
const CoffeeShop = require("../models/coffeeShop");
const cloudinary = require("cloudinary");

const getAllShops = async (req, res) => {
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

const registerShop = async (req, res) => {
  const { name, description, address, location, ratings, image, products } =
    req.body;

  try {
    const uploadResult = await cloudinary.uploader.upload(image, {
      folder: "coffee-shop",
    });

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
    res.status(201).json(newCoffeeShop);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const editShop = async (req, res) => {
  const { name, description, address, location, ratings, image } =
    req.body;
  try {
    let updateData = {
      name : name,
      description: description,
      address :{
        street: address.street,
        city: address.city,
        state: address.state,
        zipcode: address.zipcode,
      },
      location: {
        lat: location.lat,
        long: location.long,
      },
      ratings
    };

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
    console.error("Error updating shop:", error);
    res.status(500).json({ error: error.message });
  }
};

const deleteShop = async (req, res) => {
  try {
    const shop = await CoffeeShop.findById(req.params.id);
    
    if (!shop) {
      return res.status(404).json({ message: "Coffee shop not found" });
    }

    if (!shop.image || !shop.image.public_id) {
      return res.status(404).json({ message: "Shop image not found" });
    }

    await cloudinary.uploader.destroy(shop.image.public_id);

    await CoffeeShop.findByIdAndDelete(req.params.id);
 return res.status(200).json({ message: "Coffee shop deleted successfully" });
   
  } catch (error) {
    return res.status(500).json({ message: "Error deleting coffee shop", error: error.message });
  }
}

module.exports = {
  editShop,
  getAllShops,
  getShop,
  registerShop,
  editShop,
  deleteShop
};
