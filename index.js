const app = require('./server')
const dotenv = require('dotenv');
const ShopHandler = require('./handlers/shop.handler');
const { sequelize } = require('./models');
const UserHandler = require('./handlers/user.handlers');

dotenv.config()


const port = process.env.PORT || 8000

app.get('/', (req, res) => res.render('login', { noNavbar: true }))

app.post('/', (req, res) => res.redirect('/users'))

app.get('/users', UserHandler.employeePage)
app.get('/users/add', (req, res) => res.render('forms/adduser'))
app.post('/users/add', UserHandler.addEmployee)
app.get('/users/delete/:id', UserHandler.deleteOne)

app.get('/shops', ShopHandler.shopsPage)
app.get('/shops/add', (req, res) => res.render('forms/addshop'))

app.get('/orders', (req, res) => res.render('orders'))


async function main() {
    await sequelize.authenticate()
    await sequelize.sync()
}

main()
    .then(() => {
        console.log("Successfully connected to DB.")
        app.listen(port, () => {
            console.log(`Listening on PORT ${port}`)
        })
    })
    .catch((e) => {
        console.log(e)
    })