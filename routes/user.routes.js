const { Router } = require('express')
const EmployeeHandler = require('../handlers/employee.handlers')
const UserHandler = require('../handlers/user.handler')
const { isAdmin } = require('../middlewares/auth')



const router = Router()

router.use(isAdmin)

router.route("/add")
    .post(UserHandler.addNew)

router.route("/add/:id")
    .get(UserHandler.userForm)

router.post("/edit", UserHandler.edit)
router.get("/edit/:id", UserHandler.userForm)

router.route("/delete/:id")
    .get(UserHandler.deleteOne)



module.exports = router