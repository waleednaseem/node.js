const express = require('express')
const App = express()
const port = 4000
const bodyParser = require('body-parser')

// const ctrl = require('./Sequelize/Controllers')
const cors = require('cors')
const userRoute=require('./MongoDb/Routes/Users')
App.use(cors({
    origin:'*',
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH", "OPTIONS"],
}))



App.use(bodyParser.urlencoded({ extended: true }))
App.use(bodyParser.json())

App.use('/users',userRoute)

// App.use(express.urlencoded({ extended: true }));
// App.use(express.json())

// App.post('/Register', ctrl.makeUser)
// App.post('/login',ctrl.Login)
// App.post('/location',ctrl.findCountry)
// App.post('/insertdata',ctrl.insertData)
// App.post('/SearchByConsignee',ctrl.searchConsignee)
// App.post('/history',ctrl.history)
// App.post('/update', ctrl.updateUser)

require('./MongoDb/Config/db')

App.listen(port, () => {
    console.log('node connected')
})