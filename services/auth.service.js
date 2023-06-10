
const db = require('../models')
const auth_model = db.Users;

exports.LoginService = async (username) => {
    return await auth_model.findOne({
        where: {
            username:username
        }
    })
}