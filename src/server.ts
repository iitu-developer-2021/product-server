import 'dotenv/config'
import express from 'express'
import router from './routes/index'
import { sequelize } from './core/db'
import { config } from './config'

const app = express()

app.use(express.json())

app.use(router)

sequelize
    .authenticate()
    .then(() => sequelize.sync())
    .then(async () => {
        console.log('Successfully connected to database')
        app.listen(config.PORT, () => {
            console.log('App is running on port ' + config.PORT)
        })
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error)
    })
