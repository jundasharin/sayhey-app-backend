const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const helper = require('../helper/response')

const { 
    registerModel, 
    checkEmailModel 
} = require('../model/userModel')

module.exports = {
  register: async (req, res) => {
    try {
        const {
            username,
            email,
            password
        } = req.body
        const salt = bcrypt.genSaltSync(10)
        const encryptPassword = bcrypt.hashSync(password, salt)

        const setData = {
            username,
            email,
            password: encryptPassword
        }
        const result = await registerModel(setData)
        return helper.response(res, 200, 'Registration is Successful', result)
    } catch (error) {
        return helper.response(res, 400, 'Registration Failed', error)
    }
  },
  login: async (req, res) => {
      try {
          const { email, password } = req.body
          const checkDataUser = await checkEmailModel(email)
        //   console.log(checkEmailUser)
          if (checkDataUser.length > 0) {
              const checkPassword = bcrypt.compareSync(password, checkDataUser[0].password)
              if (checkPassword) {
                  const {
                      userId,
                      username,
                      email,
                      status,
                      name,
                      phoneNumber,
                      bio,
                      lat,
                      lng,
                      image
                  } = checkDataUser[0]
                  const payload = {
                      userId,
                      username,
                      email,
                      status,
                      name,
                      phoneNumber,
                      bio,
                      lat,
                      lng,
                      image
                  }
                  const token = jwt.sign(payload, "SAYHEY", {
                      expiresIn: 7 * 24 * 60 * 60
                  })
                  const result = { ...payload, token}
                  return helper.response(res, 200, "Success Login!", result)
              } else {
                return helper.response(res, 400, "Wrong Password. Try Again!")   
              }
          } else {
              return helper.response(res, 400, "Email is not Registered!")
          }
      } catch (error) {
          console.log(error)
          return helper.response(res, 400, "Bad Requests", error)
      }
  }
}
