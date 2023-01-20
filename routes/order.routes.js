const { Router } = require('express')
const OrderHandler = require('../handlers/order.handlers')



const router = Router()

router.get("/", OrderHandler.ordersPage)
// router.get("/add", OrderHandler.shopsForm)

module.exports = router