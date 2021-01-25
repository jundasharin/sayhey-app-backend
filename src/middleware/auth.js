const jwt = require('jsonwebtoken')
const helper = require('../helper/response')

module.exports = {
    authorization: (req, res, next) => {
        let token = req.headers.authorization
        if (token) {
            token = token.split(' ')[1]
            jwt.verify(token, 'SAYHEY', (error, result) => {
                if ((error && error.name === 'JsonWebTokenError') || (error && error.name === 'TokenExpiredToken')) {
                    console.log(error)
                    return helper.response(res, 400, error.message)
                } else {
                    req.token = result
                    next()
                }
            })
        } else {
            return helper.response(res, 400, "Please Login First!")
        }
    }
}