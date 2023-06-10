
const express = require('express')
const router = express.Router();

const CateController = require('../controllers/category.controller')
const TokenVerify = require('../middleware/tokenVerify')
router
    .get("/list",TokenVerify, CateController.getCategory)
    .post("/create", TokenVerify,CateController.createCategory)
    .post("/update",TokenVerify, CateController.updateCategory)
    .post("/delete", TokenVerify, CateController.deleteCategory)
    .get("/select",TokenVerify,CateController.getSelect)
     
module.exports =router