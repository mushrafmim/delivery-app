const { Employee, Order } = require('../models')
class DeliveryHandler {


    static async deliveryPage(req, res) {

        const { userId } = req.userObj


        const ordersByDelivery = await Order.findAll({
            where: {
                deliveryId: userId,
                status: 'CLAIMED'
            },
            raw: true
        })

        console.log(ordersByDelivery)


        res.render('delivery', { orders: ordersByDelivery })
    }
}

module.exports = DeliveryHandler