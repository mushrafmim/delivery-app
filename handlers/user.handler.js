const jwt = require('jsonwebtoken')


const { Employee, User } = require('../models')
class UserHandler {

    static async userPage(req, res) {

        console.log(req.cookies)

        let users = await User.findAll({
            raw: true,
            include: Employee
        })

        users.map((user) => {
            let val

            switch (user.role) {
                case 'admin':
                    val = "Admin"
                    break;
                case 'user':
                    val = "Shop Owner"
                    break;
                default:
                    val = "Delivery"
                    break;
            }

            user.role = val
            return user
        })

        res.render('users', { users })
    }


    static async userForm(req, res) {
        const { id } = req.params

        if (id) {
            const user = await User.findOne({ where: { id }, raw: true })
            return res.render('forms/user', { edit: true, employee: user })
        } else {
            const employees = await Employee.findAll({
                raw: true,
                include: {
                    model: User,
                    where: {
                        role: 'user'
                    }
                }
            })

            return res.render('forms/user', { employees })
        }
    }

    static async loginUser(req, res) {
        try {
            const { username, password } = req.body

            // If username or password empty. Redirecting to login page.
            if (!(username && password)) {
                return res.render('login', { noNavbar: true, mismatch: true })
            }

            // Finding the user by username.
            const user = await User.findOne({
                where: { username },
                raw: true
            })

            // If no user is present, rerendering the login page.
            if (!user) {
                return res.render('login', { mismatch: true, noNavbar: true })
            }

            if (password === user.password) {

                // Getting the token.
                const val = await jwt.sign({
                    username,
                    password,
                    role: user.role
                }, process.env.SECRET_KEY)

                res.cookie('token', val)
            }

            res.render('orders')
        } catch (e) {
            console.log(e)
            res.send('login')
        }
    }

    static async deleteOne(req, res) {

        const { id } = req.params

        await User.destroy({
            where: { id }
        })

        res.redirect('/users')
    }

    static async addNew(req, res) {
        console.log(req.body)

        await User.create(req.body)
        res.redirect('/users')
    }

    static async edit(req, res) {

        const { empId, ...data } = req.body

        console.log(req.body)

        const result = await User.update(data, {
            where: { id: empId }
        })
        console.log(result)
        res.redirect('/users')
    }
}


module.exports = UserHandler