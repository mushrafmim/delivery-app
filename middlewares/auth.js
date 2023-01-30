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



function isAdmin(req, res, next) {
    try {
        const { role } = req.userObj

        if (role === 'ADMIN') {
            return next()
        }

        return res.render('login')
    } catch (e) {
        console.log(e)
        res.render('login')
    }
}

function isOwner(req, res, next) {
    try {
        const { role } = req.userObj

        if (role === 'OWNER' || role === 'ADMIN') {
            return next()
        }

        return res.render('login')
    } catch (e) {
        console.log(e)
        res.render('login')
    }
}

function isDelivery(req, res, next) {
    try {
        const { role } = req.userObj

        if (role === 'DELIVERY') {
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
    isOwner,
    isDelivery,
    validateToken
}