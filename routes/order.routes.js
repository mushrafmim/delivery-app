const { Router } = require('express')
const OrderHandler = require('../handlers/order.handlers')



const router = Router()

router.get("/", OrderHandler.ordersPage)
router.get("/add", OrderHandler.ordersForm)
router.post("/add", OrderHandler.addOrder)
router.get("/delete/:id", OrderHandler.deleteOrder)

router.get("/list", OrderHandler.handleOrdersPage)
router.get("/decline/:id", OrderHandler.declineOrder)
router.get("/delivered/:id", OrderHandler.orderDelivered)

module.exports = router