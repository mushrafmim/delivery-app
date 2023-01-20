const { Router } = require('express')
const ShopHandler = require('../handlers/shop.handler')



const router = Router()

router.get("/", ShopHandler.shopsPage)
router.get("/add", ShopHandler.shopsForm)
router.post("/add", ShopHandler.addShop)

module.exports = router