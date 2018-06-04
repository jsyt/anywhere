const fs = require('fs');
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const path = require('path');
const handlebars = require('handlebars');
const mime = require('./mime');
const compress = require('./compress');
const range = require('./range');
const isFresh = require('./cache');


const tplPath = path.join(__dirname, '../template/dir.tpl');
const source = fs.readFileSync(tplPath);
const template = handlebars.compile(source.toString());

module.exports = async function (req, res, filePath, config){
  try {
    const stats = await stat(filePath);
    const contentPath = mime(filePath);
    if(stats.isDirectory()){
      const files = await readdir(filePath);
      res.statusCode = '200';
      res.setHeader('Content-Type', 'text/html');
      const dir = path.relative(config.root, filePath);
      const data = {
        title : path.basename(filePath),
        files,
        dir : dir ? `/${dir}` : ''
      };
      res.end(template(data));
    }else if(stats.isFile()){
      const {code, start, end} = range(stats.size, req, res);
      let rs;
      if(isFresh(stats, req, res)){
        res.statusCode = '304';
        res.end();
        return;
      }
      if(code === 200){
        res.statusCode = '200';
        rs = fs.createReadStream(filePath);
      }else if(code === 206){
        res.statusCode = '206';
        rs = fs.createReadStream(filePath, {start, end});
      }


      res.setHeader('Content-Type', contentPath);
      if(filePath.match(config.compress)){
        rs = compress(rs, req, res);
      }
      rs.pipe(res);
    }
  } catch (error) {
    res.statusCode = '404';
    res.setHeader('Content-Type', 'text/plain');
    res.end(`${filePath} is not a directory or file \n ${error}`);
    return;
  }
};

