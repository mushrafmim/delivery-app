const { Router } = require('express')
const ShopHandler = require('../handlers/shop.handler')
const { isAdmin } = require('../middlewares/auth')



const router = Router()

router.get("/", isAdmin, ShopHandler.shopsPage)
router.get("/add", isAdmin, ShopHandler.shopsForm)
router.post("/add", isAdmin, ShopHandler.addShop)

module.exports = router