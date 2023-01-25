const jwt = require('jsonwebtoken')


function validateToken(req, res, next) {
    try {
        const { token } = req.cookies

        if (!token) {
            return res.redirect('/')
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        req.userObj = decoded
        next()
    } catch (e) {
        res.redirect('/')
    }
}



function isSuperAdmin(req, res, next) {
    try {
        const { role } = req.userObj

        if (role === 'superadmin') {
            return next()
        }

        return res.render('login')
    } catch (e) {
        console.log(e)
        res.render('login')
    }
}

function isAdmin(req, res, next) {
    try {
        const { role } = req.userObj

        if (role === 'admin' || role === 'superadmin') {
            return next()
        }

        return res.render('login')
    } catch (e) {
        console.log(e)
        res.render('login')
    }
}

module.exports = {
    isAdmin,
    isSuperAdmin,
    validateToken
}