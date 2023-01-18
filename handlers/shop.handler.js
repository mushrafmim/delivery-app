const { Shop } = require('../models')
class ShopHandler {


    static async shopsPage(req, res) {

        const shops = await Shop.findAll()
        res.render('shops', { shops })
    }
}


module.exports = ShopHandler