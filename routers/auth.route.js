
const express = require('express')
const router = express.Router();

const AuthController = require('../controllers/auth.controller')

router
    .post("/login", AuthController.AuthLogin)
     
module.exports =router