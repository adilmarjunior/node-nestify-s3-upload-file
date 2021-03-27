const fastify = require('fastify')({ logger: process.env.LOG_SERVER })

class Server {
  constructor(server){
    this.server = server;
  }

  async start(port){
    try {
      await this.server.listen(port)
      this.server.log.info(`Server running at port: ${port}`)
    } catch (err) {
      this.server.log.error(err)
      process.exit(1)
    }
  }

  register(module, options={}){
    this.server.register(module, options)
  }

  getServer(){
    return this.server;
  }
}

module.exports = new Server(fastify);
