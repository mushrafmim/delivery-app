const { Router } = require('express')
const DeliveryHandler = require('../handlers/delivery.handler')



const router = Router()

router.get("/", DeliveryHandler.deliveryPage)

module.exports = router