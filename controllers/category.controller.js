
const CategoryService = require('../services/category.service')


const getCategory = async (req,resp) => {
    await CategoryService.lists(req.query.page, req.query.limit, req.query.q)
        .then((data) => {
            resp.send({
                data: data,
                smg: 'success',
                status: 200,
                err:''
            })
        }).catch((err) => {
            resp.send({
                data: null,
                smg: 'error',
                status: 500,
                err:err
            })
    })
}

const getSelect = async (req,resp) => {
    await CategoryService.getAll()
    .then((data) => {
        resp.send({
            data: data,
            smg: 'success',
            status: 200,
            err:''
        })
    }).catch((err) => {
        resp.send({
            data: null,
            smg: 'error',
            status: 500,
            err:err
        })
    })
}

const findCaregory = async(req, resp) => {
    await CategoryService.getById(req.params.id)
    .then((data) => {
        resp.send({
            data: data,
            smg: 'success',
            status: 200,
            err:''
        })
    }).catch((err) => {
        resp.send({
            data: null,
            smg: 'error',
            status: 500,
            err:err
        })
    })
}

const createCategory = async (req,resp)=>{
    const catObject = {
        name: req.body.name,
        note: req.body.note,
        type: req.body.type,
    }
    await CategoryService.create(catObject)
    .then((data) => {
        resp.send({
            data: data,
            smg: 'success',
            status: 200,
            err:''
        })
    }).catch((err) => {
        resp.send({
            data: null,
            smg: 'error',
            status: 500,
            err:err
        })
    })
}
const updateCategory = async (req,resp) => {
    const catObject = {
        name: req.body.name,
        note: req.body.note,
        type: req.body.type,
    }
    await CategoryService.update(catObject,req.body.id)
    .then((data) => {
        resp.send({
            data: data,
            smg: 'success',
            status: 200,
            err:''
        })
    }).catch((err) => {
        resp.send({
            data: null,
            smg: 'error',
            status: 500,
            err:err
        })
    })
}

const deleteCategory = async(req,resp) => {
    await CategoryService.deleted(req.body.id)
    .then((data) => {
        resp.send({
            data: data,
            smg: 'success',
            status: 200,
            err:''
        })
    }).catch((err) => {
        resp.send({
            data: null,
            smg: 'error',
            status: 500,
            err:err
        })
    })
}

module.exports = {
    getCategory,
    findCaregory,
    createCategory,
    updateCategory,
    deleteCategory,
    getSelect
}