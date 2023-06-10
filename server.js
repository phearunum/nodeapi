
const express = require('express');
const cors = require('cors')
const app = express();
const apiRoute = require('./routers')
require('dotenv').config()
const corsOption = {
    origin: '*',
    optionsSuccessStatus:200
}
app.use(express.json());
app.use(cors(corsOption))
app.use(express.urlencoded({ extended: true }))

app.use('/api', apiRoute)

app.listen(4000, '127.0.0.1', () => {
    console.log("API service running")
})

