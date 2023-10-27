const app = require('./server')
const dotenv = require('dotenv');
const { sequelize } = require('./models');
const UserHandler = require('./handlers/user.handler');

const employeeRoutes = require('./routes/employee.routes')
const userRoutes = require('./routes/user.routes')
const shopRoutes = require('./routes/shop.routes')
const orderRoutes = require('./routes/order.routes');
const deliveryRoutes = require('./routes/delivery.routes')
const { validateToken } = require('./middlewares/auth');
const OrderHandler = require('./handlers/order.handlers');
const EmployeeHandler = require('./handlers/employee.handlers');
const DeliveryHandler = require('./handlers/delivery.handler')
const ShopHandler = require('./handlers/shop.handler')

dotenv.config()


const port = process.env.PORT || 8000

app.get('/login', (req, res) => {
    res.render('login', { noNavbar: true })
})

app.get('/logout', UserHandler.logoutUser)

app.get('/mail', (req, res) => {
    res.render('mail', {
        title: "2 Chicken Buckets",
        description: "from chilaw",
        link: "http://localhost:8000/order/claim?token=3332211"
    })
})

app.get('/order/claim', OrderHandler.claimOrder)

app.post('/', UserHandler.loginUser)

app.use(validateToken)

app.get('/', (req, res) => {

    switch (req.userObj.role) {
        case "ADMIN":
            return EmployeeHandler.employeePage
        case "OWNER":
            return ShopHandler.shopsPage
        case "DELIVERY":
            return DeliveryHandler.deliveryPage
        default:
            break;
    }
    return
})

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