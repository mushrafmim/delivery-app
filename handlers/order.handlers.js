const { Op } = require('sequelize')
const { Shop, Order } = require('../models')

class OrderHandler {


    static async takeAction(req, res) {
        const { action } = req.query
        const { id } = req.params

        if (!['SHARED', 'DECLINED'].includes(action)) {
            return res.send("Error")
        }

        const result = await Order.update(
            { status: action },
            { where: { id, status: 'PENDING' } }
        )

        if (result[0] !== 0) {
            res.redirect('/orders/list')
        }
    }

    static async handleOrdersPage(req, res) {
        const orders = await Order.findAll({
            raw: true
        })

        res.render('orderslist', { orders })
    }

    static async ordersPage(req, res) {

        const { shopId } = req.userObj

        const orders = await Order.findAll({
            where: {
                hotelId: shopId,
                status: {
                    [Op.ne]: 'DECLINED'
                }
            },
            raw: true,
            order: [
                ['createdAt', 'DESC']
            ]
        })


        res.render('orders', { orders })
    }

    static async ordersForm(req, res) {
        res.render('forms/orders')
    }

    static async addOrder(req, res) {
        try {
            const { shopId } = req.userObj

            await Order.create({
                ...req.body,
                hotelId: shopId
            })

            res.redirect('/orders')
        } catch (e) {
            console.log(e)
            res.redirect('/orders')
        }
    }

    static async deleteOrder(req, res) {
        try {
            const { id } = req.params

            await Order.destroy({
                where: {
                    id
                }
            })

            res.redirect('/orders')
        } catch (e) {
            console.log(e)
            res.redirect('/orders')
        }
    }
}



module.exports = OrderHandler