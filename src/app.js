const http = require('http');
const config = require('./config/defaultConfig');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, rep)=>{
  const filePath = path.join(config.root, req.url);
  fs.stat(filePath, (error, stats)=>{
    if(error){
      rep.statusCode = '404';
      rep.setHeader('Content-Type', 'text/plain');
      rep.end(`${filePath} is not a directory or file`);
      return;
    }
    if(stats.isDirectory()){
      fs.readdir(filePath, (err, files)=>{
        rep.statusCode = '200';
        rep.setHeader('Content-Type', 'text/plain');
        rep.end(files.join(','));
      })
    }else if(stats.isFile()){
      rep.statusCode = '200';
      rep.setHeader('Content-Type', 'text/plain');
      fs.createReadStream(filePath).pipe(rep);
      // rep.end('');
    }
  })
});

server.listen(config.port, config.hostName, ()=>{
  const addr = `http://${config.hostName}:${config.port}`;
  console.info(`Server Start at ${chalk.green(addr)}`)
});
