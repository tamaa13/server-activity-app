require('dotenv').config();

const express = require('express')
const errorHandle = require('./middlewares/errorHandle')
const cors = require('cors')
const port = process.env.PORT || 4000
const router = require('./router')
const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(router)
app.use(errorHandle)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})