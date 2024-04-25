if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express')
const errorHandle = require('./middlewares/errorHandle')
const cors = require('cors')
const router = require('./router')
const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(router)
app.use(errorHandle)

module.exports = app