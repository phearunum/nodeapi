const { Op, fn, col, literal } = require('sequelize');
const db = require('../models')
const Transaction = db.Transaction;

exports.TransactionReport =async (page,page_limit,page_query,fdate,tdate)=> {
    let numPage = 0;
    let QuerySetting = {
        limit: page_limit,
        offset: 0
    }
    return await Transaction.findAndCountAll()
        .then(data => {
            QuerySetting.offset = QuerySetting.limit * page
            numPage = Math.ceil(data.count / page_limit)
            return Transaction.findAll({
                row: true,
                where: {
                    trancDate: {
                        [Op.between]:[fdate,tdate]
                    },
                    name: { [Op.iLike]: `%${page_query}%` }

                },
                QuerySetting
            }).then((objData) => {
                return ({
                    data: objData,
                    total: data.count,
                    current: page,
                    perPage: page_limit,
                    previous: page > 0 ? page - 1 : undefined,
                    next: page < numPage - 1 ? parseInt(page + 1) : undefined
                })
            })
    })
}


exports.TransactionSummry = async(fdate,tdate) => {
    return await Transaction.findAll({
        attributes: ['type', [fn('sum', col('amount')), 'total']],
        group: ['type'],
        row: true,
        where: {
            trancDate: {
                [Op.between]:[fdate,tdate]
            }
        }
    })
}

exports.create = async (_object) => {
    return await Transaction.create(_object)
}
exports.lists = async (page = 0, page_limit = 0, page_query = "") => {
    const config = {
        _offset: 0,
        _limit: page_limit
    }
    let numPage = 0;
    let QuerySetting = {
        limit: config._limit,
        offset: config._offset
    }
    if (page_query !== "") {
        QuerySetting = {
            limit: config._limit,
            where: {
                name: { [Op.iLike]: `%${page_query}%` }
            },
          
        }
    }
    return await Transaction.findAndCountAll()
        .then((data) => {
            QuerySetting.offset = config._limit * page
            numPage = Math.ceil(data.count / page_limit)
            return Transaction.findAll(QuerySetting)
                .then((objData) => {
                    return ({
                        data: objData,
                        total: data.count,
                        current: page,
                        perPage: page_limit,
                        previous: page > 0 ? page - 1 : undefined,
                        next: page < numPage - 1 ? parseInt(page + 1) : undefined
                    })
                })
        })
        .catch((err) => {
            return err
        })
}