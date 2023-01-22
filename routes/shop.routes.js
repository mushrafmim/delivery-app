const { Router } = require('express')
const ShopHandler = require('../handlers/shop.handler')
const { isSuperAdmin } = require('../middlewares/auth')



const router = Router()

router.get("/", isSuperAdmin, ShopHandler.shopsPage)
router.get("/add", isSuperAdmin, ShopHandler.shopsForm)
router.post("/add", isSuperAdmin, ShopHandler.addShop)

module.exports = router