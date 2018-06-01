const http = require('http');
const path = require('path');
const config = require('./config/defaultConfig');
const chalk = require('chalk');
const route  = require('./helper/route')



const server = http.createServer((req, res)=>{
  const filePath = path.join(config.root, req.url);
  route(req, res, filePath);
});

server.listen(config.port, config.hostName, ()=>{
  const addr = `http://${config.hostName}:${config.port}`;
  console.info(`Server Start at ${chalk.green(addr)}`)
});
