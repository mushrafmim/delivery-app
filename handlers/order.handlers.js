const jwt = require('jsonwebtoken')
const { v4 } = require('uuid')
const handlebars = require('handlebars')
const { Op } = require('sequelize')
const { Employee, User, Order, Shop } = require('../models')
const EmailSender = require('../services/mailService')

class OrderHandler {


    static async handleOrdersPage(req, res) {
        const orders = await Order.findAll({
            raw: true
        })

        orders.map((order) => ({
            ...order,
            is_pending: order.status === 'PENDING'
        }))

        res.render('orderslist', { orders })
    }


    static async declineOrder(req, res) {
        const { id } = req.params

        const result = await Order.update(
            { status: 'DECLINED' },
            { where: { id, status: 'PENDING' } }
        )

        console.log(result)

        if (result[0] !== 0) {
            return res.redirect('/orders/list')
        }
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
            include: {
                model: Employee
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
            // Getting the shop id from decoded token.
            const { shopId } = req.userObj

            const { title, description } = req.body

            const order = await Order.create({
                ...req.body,
                hotelId: shopId
            })

            const orderId = order.id

            // Grabbing the shop details.
            const shop = await Shop.findOne({
                where: {
                    id: shopId
                }
            })

            // Grabbing the emails of delivery boys.
            const deliveryBoys = await Employee.findAll({
                raw: true,
                attributes: ['email', 'id']
            })

            // mail Sender Object
            const mailSender = new EmailSender()

            const mail_template = require('./mail_format')
            const template = handlebars.compile(mail_template)



            for (const deliveryObj of deliveryBoys) {

                const { id, email } = deliveryObj;

                const token = await OrderHandler.tokenGenerator({ userId: id, orderId })

                const html = template({
                    shop: shop.name,
                    title: title,
                    description: description,
                    link: `http://localhost:8000/order/claim?token=${token}`
                })

                // Sending email
                mailSender.sendEmail({
                    to: email,
                    subject: `NEW ORDER FROM ${shop.name}`,
                    html: html
                })
            }

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

    static async claimOrder(req, res) {
        try {
            const { token } = req.query
            const decoded = jwt.verify(token, process.env.SECRET_KEY)

            const { orderId, userId } = decoded

            const result = await Order.update(
                { status: 'CLAIMED', deliveryId: userId },
                { where: { status: 'PENDING', id: orderId } }
            )

            if (result[0] === 1) {
                res.render("ordersuccess")
                return
            } else {
                res.render("orderfailiure")
                return
            }
        } catch (e) {
            res.send("Error")
        }
    }

    static async tokenGenerator({ userId, orderId }) {
        const val = await jwt.sign({ userId, orderId }, process.env.SECRET_KEY)

        return val
    }
}



module.exports = OrderHandler