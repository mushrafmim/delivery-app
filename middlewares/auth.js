const jwt = require('jsonwebtoken')


module.exports = (req, res, next) => {
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