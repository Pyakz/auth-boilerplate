const JWT = require('jsonwebtoken');

module.exports = function(req,res,next) {
    const { token } = req.cookies
    if(!token) return res.status(401).end('Access Denied')
    try {
        const verified = JWT.verify(token, process.env.SECRET_KEY)
        req.user = verified
    } catch (error) {
        return res.status(400).end(error.toString())
    }
    next()
}