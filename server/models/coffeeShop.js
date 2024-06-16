const mongoose = require('mongoose');

const coffeeShopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    address: {
        street: String,
        city: String,
        state: String,
        zipcode: String
    },
    location: {
        lat: Number,
        long: Number
    },
    ratings: {
        type: Number,
        default: 0
    },
    image: {
        public_id: String,
        url: String
    },
    products: [String]
});

// Index for geospatial queries based on location
coffeeShopSchema.index({ location: '2dsphere' });

const CoffeeShop = mongoose.model('CoffeeShop', coffeeShopSchema);

module.exports = CoffeeShop;
