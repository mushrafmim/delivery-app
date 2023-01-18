const express = require('express');
const { engine } = require('express-handlebars');
const { urlencoded } = require('express');


const app = express();

app.use(express.static(__dirname + '/views/assets'))
app.use(urlencoded({ extended: true }))

app.engine('handlebars', engine({
    defaultLayout: 'main',
    helpers: {
        section: function (name, options) {
            if (!this._sections) this._sections = {}
            this._sections[name] = options.fn(this)
            return null
        }
    }
}))

app.set('view engine', 'handlebars')


module.exports = app