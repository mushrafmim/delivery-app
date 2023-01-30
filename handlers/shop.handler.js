const { Shop, Employee } = require('../models')
class ShopHandler {


    static async shopsPage(req, res) {

        const shops = await Shop.findAll({
            raw: true
        })
        res.render('shops', { shops })
    }

    static async shopsForm(req, res) {
        try {

            const shopOwners = await Employee.findAll({
                include: {
                    model: Shop
                },
                where: {
                    role: 'MANAGER',
                    '$Shop.ownerId$': null
                },
                raw: true
            })

            res.render('forms/addshop', { shopOwners })
        } catch (e) {
            console.log(e)
            res.render('/shops')
        }

    }

    static async addShop(req, res) {
        await Shop.create(req.body)
        res.redirect('/shops')
    }
}


module.exports = ShopHandler