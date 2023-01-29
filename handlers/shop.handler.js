const { Shop, Employee } = require('../models')
class ShopHandler {


    static async shopsPage(req, res) {

        const shops = await Shop.findAll({
            raw: true
        })
        res.render('shops', { shops })
    }

    static async shopsForm(req, res) {

        const shopOwners = await Employee.findAll({
            where: {
                role: 'MANAGER'
            },
            raw: true
        })

        res.render('forms/addshop', { shopOwners })
    }

    static async addShop(req, res) {
        await Shop.create(req.body)
        res.redirect('/shops')
    }
}


module.exports = ShopHandler