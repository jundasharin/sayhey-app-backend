const router = require('express').Router()
const {
    register,
    login
} = require('../controller/userController')
// const {
//     authorization
// } = require('../middleware/auth')

router.post('/signup', register)
router.post('/signin', login)

module.exports = router