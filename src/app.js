const http = require('http');
const path = require('path');
const config = require('./config/defaultConfig');
const chalk = require('chalk');
const route  = require('./helper/route');
const openUrl = require('./helper/openUrl');


class Server{
  constructor(conf){
    this.conf = Object.assign({}, config, conf);
  }

  start(){
    const server = http.createServer((req, res)=>{
      const filePath = path.join(this.conf.root, req.url);
      route(req, res, filePath, this.conf);
    });

    server.listen(this.conf.port, this.conf.hostName, ()=>{
      const addr = `http://${this.conf.hostName}:${this.conf.port}`;
      openUrl(addr);
      console.info(`Server Start at ${chalk.green(addr)}`);
    });
  }
}

module.exports = Server;
