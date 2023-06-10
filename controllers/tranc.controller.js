const { DATE } = require('sequelize')
const TrancService = require('../services/transaction.service')


const getTransactionReport = async (req, resp) => {
    const { page, limit, q, fdate, tdate } = req.body
    await TrancService.TransactionReport(page, limit, q, fdate, tdate)
        .then((data) => {
            resp.send({
                data: data,
                smg: 'success',
                status: 200,
                err: ''
            })
        }).catch((err) => {
            resp.send({
                data: null,
                smg: 'error',
                status: 500,
                err: err.message
            })
        })
}

const getTransactionSummary = async (req, resp) => {
    const { tdate, fdate } = req.body;
    await TrancService.TransactionSummry(fdate, tdate)
        .then((data) => {
            resp.send({
                data: data,
                smg: 'success',
                status: 200,
                err: ''
            })
        }).catch((err) => {
            resp.send({
                data: null,
                smg: 'error',
                status: 500,
                err: err
            })
        })
}

const getList = async (req, resp) => {
    await TrancService.lists(req.query.page, req.query.limit, req.query.q)
        .then((data) => {
            resp.send({
                data: data,
                smg: 'success',
                status: 200,
                err: ''
            })
        }).catch((err) => {
            resp.send({
                data: null,
                smg: 'error',
                status: 500,
                err: err
            })
        })
}
const createTransaction = async (req, resp) => {
    const catObject = {
        name: req.body.name,
        amount: req.body.amount,
        note: req.body.note,
        type: req.body.type,
        trancDate: new Date().toISOString().slice(0, 10)

    }
    await TrancService.create(catObject)
        .then((data) => {
            resp.send({
                data: data,
                smg: 'success',
                status: 200,
                err: ''
            })
        }).catch((err) => {
            resp.send({
                data: null,
                smg: 'error',
                status: 500,
                err: err
            })
        })
}

module.exports = {
    createTransaction,
    getList,
    getTransactionSummary,
    getTransactionReport
}