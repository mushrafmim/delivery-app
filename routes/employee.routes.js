const { Router } = require('express')
const EmployeeHandler = require('../handlers/employee.handlers')



const router = Router()


router.route("/")
    .get(EmployeeHandler.employeePage)

router.route("/add")
    .get(EmployeeHandler.employeeForm)
    .post(EmployeeHandler.addEmployee)

router.route("/edit/:id")
    .get(EmployeeHandler.employeeForm)

router.route("/delete/:id")
    .get(EmployeeHandler.deleteOne)

router.route("/upgrade/:id")
    .get(EmployeeHandler.makeUser)



module.exports = router