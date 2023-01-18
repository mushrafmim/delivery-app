const { Employee } = require('../models')
class UserHandler {


    static async employeePage(req, res) {

        const employee = await Employee.findAll({ raw: true })
        res.render('users', { employee })
    }

    static async addEmployee(req, res) {

        await Employee.create(req.body)
        res.redirect('/users')
    }

    static async deleteOne(req, res) {

        const { id } = req.params

        await Employee.destroy({
            where: { id }
        })

        res.redirect('/users')
    }
}


module.exports = UserHandler