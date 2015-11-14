/**
 * 转换CSV数据库
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

var fs = require('fs');
var path = require('path');
var zlib = require('zlib');
var debug = require('debug')('query-mobile-phone-area');


function saveCompressFile (source, target) {
  var data = fs.readFileSync(source);
  fs.writeFileSync(target, zlib.gzipSync(data));
}

saveCompressFile(path.resolve(__dirname, '../data/mobilephones.txt'), path.resolve(__dirname, '../data/mobilephones.data'));
saveCompressFile(path.resolve(__dirname, '../data/countries.txt'), path.resolve(__dirname, '../data/countries.data'));
