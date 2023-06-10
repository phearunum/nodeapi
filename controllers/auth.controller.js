
const authService = require('../services/auth.service')
const jwt = require('jsonwebtoken');
const Encript = require('../middleware/encrypt')


const AuthLogin = async (req, resp) => {
    const username = req.body.username;
    const password = req.body.password;
    await authService.LoginService(username)
        .then(async (data) => {
            const is_compared = await Encript.comparePassword(password, data.password);
            if (is_compared) {
                const token = jwt.sign({
                    id: data.id,username
                }, process.env.TOKEN_KEY, { expiresIn: '30000s' })
                const refreshToken = jwt.sign({
                    id: data.id,username
                },process.env.TOKEN_KEY,{expiresIn:'1d'})
                resp.status(200).send({
                    data: data,
                    code: 200,
                    smg: "success",
                    txt: is_compared,
                    token: token,
                    refreshToken:refreshToken
                })
            } else {
                resp.status(200).send({
                    data: null,
                    code: 200,
                    smg:"invalid password"
                })
            }
         
        }).catch((err) => {
            resp.status(200).send({
                data: null,
                code: 402,
                smg: err
            })
        })

}

module.exports = {
    AuthLogin
}