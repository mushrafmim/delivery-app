const { Employee } = require('../models')
class EmployeeHandler {


    static async employeePage(req, res) {

        let employees = await Employee.findAll({
            raw: true
        })

        employees.map((employee) => {

            employee.isDelivery = employee.role === "DELIVERY"
            return employee
        })

        res.render('employees', { employees })
    }

    static async employeeForm(req, res) {
        const { id } = req.params

        if (id) {
            const employee = await Employee.findOne({ where: { id }, raw: true })
            return res.render('forms/employee', { edit: true, employee })
        }

        return res.render('forms/employee', { employee: {} })
    }

    static async addEmployee(req, res) {

        console.log(req.url)
        try {
            await Employee.create(req.body)
            res.redirect('/employees')
        } catch (e) {
            console.log(e)
            res.redirect('/employees')
        }
    }

    static async editEmployee(req, res) {
        try {
            const { id } = req.params

            await Employee.update(
                req.body,
                { where: { id } }
            )

            return res.redirect('/employee')
        } catch (e) {
            console.log(e)
            return res.redirect('/employee')
        }
    }

    static async deleteOne(req, res) {
        try {
            const { id } = req.params

            await Employee.destroy({
                where: { id }
            })

            res.redirect('/employees')
        } catch (e) {
            res.status(403).send("Error")
        }
    }

    static async makeUser(req, res) {

        const { id } = req.params

        const employee = await Employee.findOne({ where: { id }, raw: true })

        res.render('forms/user', { employee })
    }
}


module.exports = EmployeeHandler