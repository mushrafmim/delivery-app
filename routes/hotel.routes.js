const { Router } = require('express')



const router = Router()

router.use('view options', { layout: 'other' })

router.route("/")
    .get((req, res) => res.render(''))