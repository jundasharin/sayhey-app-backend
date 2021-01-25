const { connectHelper } = require('../helper/connector')

module.exports = {
    registerModel: (setData) => {
        return connectHelper('INSERT INTO user SET ?', setData)
    },
    checkEmailModel: (email) => {
        return connectHelper('SELECT * FROM user WHERE email = ?', email)
    }
}