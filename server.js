const express = require('express');
const { engine } = require('express-handlebars');
const { urlencoded } = require('express');
const cookieParser = require('cookie-parser')


const app = express();

app.use(express.static(__dirname + '/views/assets'))
app.use(urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.json())


app.engine('handlebars', engine({
    defaultLayout: 'main',
    helpers: {
        section: function (name, options) {
            if (!this._sections) this._sections = {}
            this._sections[name] = options.fn(this)
            return null
        },
        ifCond: function (arg1, arg2, options) {
            if (arg1 === arg2) {
                return options.fn(this)
            }
            return options.inverse(this)
        }
    }
}))

app.set('view engine', 'handlebars')


module.exports = app