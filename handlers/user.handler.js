const jwt = require('jsonwebtoken')


const { Employee, Shop } = require('../models')


class UserHandler {


    static async userForm(req, res) {
        const { id } = req.params

        if (id) {
            const user = await Employee.findOne({ where: { id }, raw: true })
            return res.render('forms/user', { edit: true, employee: user })
        } else {
            const employees = await Employee.findAll({
                raw: true,
                where: {
                    role: 'user'
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
            const user = await Employee.findOne({
                where: { username },
                raw: true
            })

            // If no user is present, rerendering the login page.
            if (!user) {
                return res.render('login', { mismatch: true, noNavbar: true })
            }


            if (password !== user.password) {
                return res.render('login', { mismatch: true, noNavbar: true })
            }

            const jwtObj = {
                userId: user.id,
                username,
                password,
                role: user.role
            }

            if (user.role === 'MANAGER') {
                const shop = await Shop.findOne({
                    where: {
                        ownerId: user.id
                    },
                    raw: true
                })

                console.log(shop)

                if (!shop) {
                    return res.send("No Shop is assigned to you.")
                }

                jwtObj.shopId = shop.id;
            }

            console.log(jwtObj)

            // Getting the token.
            const val = await jwt.sign(jwtObj, process.env.SECRET_KEY)

            res.cookie('token', val)


            switch (user.role) {
                case 'MANAGER':
                    res.redirect('/orders')
                    break;
                case 'ADMIN':
                    res.redirect('/employees')
                    break;
                default:
                    res.redirect('/delivery')
                    break;
            }

        } catch (e) {
            console.log(e)
            res.send('login')
        }
    }

    static async logoutUser(req, res) {
        try {
            res.clearCookie('token')
            return res.redirect('/login')
        } catch (e) {
            console.log(e)
            res.redirect('/login')
        }
    }

    static async deleteOne(req, res) {

        const { id } = req.params

        await Employee.destroy({
            where: { id }
        })

        res.redirect('/employees')
    }

    static async addNew(req, res) {
        console.log(req.body)

        await Employee.create(req.body)
        res.redirect('/employees')
    }

    static async edit(req, res) {

        const { empId, ...data } = req.body

        console.log(req.body)

        const result = await Employee.update(data, {
            where: { id: empId }
        })
        console.log(result)
        res.redirect('/employees')
    }
}


module.exports = UserHandler