
const jwt = require('jsonwebtoken')

const verifyToken = (req,resp,next) => {
    const Authorization =  req.body.token || req.query.token || req.headers.authorization;
   if(!Authorization?.startsWith('Bearer ')) return resp.status(401).send({ smg: "Unauthorizeddf", code: 401 })
    const token = Authorization.split(' ')[1];

    if (!token) {
        return resp.status(401).send({ smg: "Unauthorized", code: 401 })
    }
    try {
        const decode = jwt.verify(token,process.env.TOKEN_KEY)
        req.user = decode;
    } catch (err) {
        return resp.status(401).send({ smg: err, code: 401 })
    }
    return next();
    
}

module.exports=verifyToken