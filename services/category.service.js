
const { Op } = require('sequelize');
const db = require('../models')
const Category = db.Category;

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
            }
        }
    }
    return await Category.findAndCountAll()
        .then((data) => {
            QuerySetting.offset = config._limit * page
            numPage = Math.ceil(data.count / page_limit)
            return Category.findAll(QuerySetting)
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

exports.getAll = async () => {
    try {
        return Category.findAll()
    } catch (err) {
        return err
    }
}
exports.getById = async (id) => {
    return Category.findOne({
        where: { id: id }
    })
}

exports.create = async (_object) => {
    return await Category.create(_object)
}
exports.update = async (userObj, id) => {
    await Category.update(userObj, {
        where: { id: id }
    }).then(data => {
        return data;
    }).catch(err => {
        return err
    })
}
exports.deleted = async (id) => {
    //return user_model.destroy()
    await Category.destroy({
        where: { id: id }
    }).then((data) => {
        return data;
    }).catch(err => {
        return err
    })
}
