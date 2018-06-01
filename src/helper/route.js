const fs = require('fs');
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const path = require('path')
const config = require('../config/defaultConfig');
const handlebars = require('handlebars')
const mime = require('./mime');
const compress = require('./compress');


const tplPath = path.join(__dirname, '../template/dir.tpl');
const source = fs.readFileSync(tplPath);
const template = handlebars.compile(source.toString());

module.exports = async function (req, rep, filePath){
  try {
    const stats = await stat(filePath);
    const contentPath = mime(filePath);
    if(stats.isDirectory()){
      const files = await readdir(filePath)
      rep.statusCode = '200';
      rep.setHeader('Content-Type', 'text/html');
      const dir = path.relative(config.root, filePath);
      const data = {
        title : path.basename(filePath),
        files,
        dir : dir ? `/${dir}` : ''
      }
      rep.end(template(data));
    }else if(stats.isFile()){
      let rs = fs.createReadStream(filePath);
      rep.statusCode = '200';
      rep.setHeader('Content-Type', contentPath);
      if(filePath.match(config.compress)){
        rs = compress(rs, req, rep);
      }
      rs.pipe(rep);
    }
  } catch (error) {
    rep.statusCode = '404';
    rep.setHeader('Content-Type', 'text/plain');
    rep.end(`${filePath} is not a directory or file \n ${error}`);
    return;
  }
}

