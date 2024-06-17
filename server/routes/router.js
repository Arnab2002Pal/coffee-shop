const express = require("express");
const { getAllShops,registerShop, getShop, deleteShop, editShop} = require("../controller/coffeeShopController");
const {getProductsByCoffeeShop,createProduct } = require('../controller/productController')
const router = express.Router();


router.get("/",getAllShops);
router.get("/:id",getShop);
router.post("/registerShop",registerShop);
router.put("/:id",editShop);
router.delete("/:id",deleteShop);


router.get('/:coffeeShopId/products', getProductsByCoffeeShop)
router.post('/products', createProduct);

module.exports = router;