
const express = require('express')
const router = express.Router();

const TrancController = require('../controllers/tranc.controller')
const TokenVerify = require('../middleware/tokenVerify');
router
    .post("/summary",TokenVerify,TrancController.getTransactionSummary)
    .get("/list",TokenVerify, TrancController.getList)
    .post("/create", TokenVerify, TrancController.createTransaction)
    .post("/report", TokenVerify,TrancController.getTransactionReport)

     
module.exports =router