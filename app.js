const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const routerNavigation = require('./src/routerNavigation')

// const socket = require('socket.io')
// const http = require('http')
// const server = http.createServer(app)
// const io = socket(server, {
//   cors: {
//     origin: '*',
//   },
// })

const app = express()
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))

app.use('/', routerNavigation)

app.listen(4000, () => {
  console.log('Express app listening on Port : 4000')
})
