

const userService = require('../services/user.service')
const Encript = require('../middleware/encrypt')

const userList =async (req, resp) => {
    await userService.getUsers()
        .then(data => {
            resp.send({
                data: data,
                smg: 'success',
                status: 200,
                err:''
            })
        })
        .catch(err => {
            resp.send({
                data: null,
                smg: 'error',
                status: 500,
                err:err
            })
        })
}

const findOneUser = async(req, resp) => {
    await userService.findOneById(req.params.id)
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

const createUser = async (req, resp) => {
    const userObj = {
        fname: req.body.fname,
        lname: req.body.lname,
        sex: req.body.sex,
        phone: req.body.phone,
        email: req.body.email,
        username: req.body.username,
    }
    userObj.password = await Encript.cryptPassword(req.body.password)
    await userService.create(userObj)
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

const updateUser = async (req,resp) => {
    const userObj = {
        fname: req.body.fname,
        lname: req.body.lname,
        sex: req.body.sex,
        phone: req.body.phone,
        email: req.body.email,
        username: req.body.username,
    }
    userObj.password = await Encrypt.cryptPassword(req.body.password)
    await userService.update(userObj,req.body.id)
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

const deleteUser = async(req,resp) => {
    await userService.deleted(req.body.id)
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
    userList,
    findOneUser,
    createUser,
    updateUser,
    deleteUser
}