const express = require("express");
const { getShops,registerShop, getShop } = require("../controller/coffeeShopController");
const router = express.Router();


router.post("/registerShop",registerShop);
router.get("/",getShops);
router.get("/:id",getShop);

module.exports = router;