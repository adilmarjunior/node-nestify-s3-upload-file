require('dotenv').config({
  path: process.env.NODE_ENV === "prod" ? ".env.prod" : ".env.test"
})

const server = require('./server')
const controllers = require('./controllers')

server.register(require('fastify-multipart'), {
  limits: {
    fieldNameSize: 100,
    fieldSize: 1000000,
    fields: 10, 
    fileSize: 100000,
    files: 1, 
    headerPairs: 2000
  }
})

server.register(controllers.bucketController, { prefix: 'v1/bucket' })
server.register(controllers.uploadFileController, { prefix: 'v1/upload' })


server.start(process.env.APP_PORT || 3000)