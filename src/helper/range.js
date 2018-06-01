
module.exports = (totalSize, req, res) => {
  const range = req.headers['range'];
  if(!range){
    return {code : 200}
  }
  const size = range.match(/bytes=(\d*)-(\d*)/);
  const start = size[1];
  const end = size[2];
  if(start < 0 || end > totalSize || start > end){
    return {code : 200}
  }

  res.setHeader('Accept-Ranges', 'bytes');
  res.setHeader('Content-Range', `byte ${start}-${end}/${totalSize}`);
  res.setHeader('Content-Length', end - start);

  return {
    code : 206,
    start: parseInt(start),
    end: parseInt(end)
  }

}
