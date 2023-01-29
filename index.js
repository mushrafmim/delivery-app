const app = require('./server')
const dotenv = require('dotenv');
const ShopHandler = require('./handlers/shop.handler');
const { sequelize } = require('./models');
const EmployeeHandler = require('./handlers/employee.handlers');
const UserHandler = require('./handlers/user.handler');

const employeeRoutes = require('./routes/employee.routes')
const userRoutes = require('./routes/user.routes')
const shopRoutes = require('./routes/shop.routes')
const orderRoutes = require('./routes/order.routes');
const deliveryRoutes = require('./routes/delivery.routes')
const { validateToken } = require('./middlewares/auth');

dotenv.config()


const port = process.env.PORT || 8000

app.get('/', (req, res) => {
    res.render('login', { noNavbar: true })
})

app.post('/', UserHandler.loginUser)

app.use(validateToken)

app.use('/employees', employeeRoutes)
app.use('/users', userRoutes)
app.use('/shops', shopRoutes)
app.use('/orders', orderRoutes)
app.use('/delivery', deliveryRoutes)


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