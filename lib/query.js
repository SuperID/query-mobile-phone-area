/**
 * 查询国内号码归属地
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

var fs = require('fs');
var path = require('path');
var zlib = require('zlib');
var debug = require('debug')('query-mobile-phone-area');


function loadData (inFile) {

  var blocks = zlib.gunzipSync(fs.readFileSync(inFile)).toString().split('----------\n');

  var data = {
    type: {},
    area: {},
    number: {}
  };

  blocks.forEach(function (block) {
    var lines = block.split('\n');
    if (lines[0] === 'type') {
      loadType(lines.slice(1));
    } else if (lines[0] === 'area') {
      loadArea(lines.slice(1));
    } else if (lines[0].substr(0, 7) === 'number-') {
      loadNumber(lines[0].substr(7), lines.slice(1));
    } else {
      console.error('unknown type: %s', lines[0]);
    }
  });

  function loadType (lines) {
    lines.forEach(function (line) {
      var s = line.trim().split(',');
      if (s.length === 2) data.type[s[0]] = s[1];
    });
  }

  function loadArea (lines) {
    lines.forEach(function (line) {
      var s = line.trim().split(',');
      if (s.length === 2) data.area[s[0]] = s[1];
    });
  }

  function loadNumber (number, lines) {
    if (!data.number[number]) data.number[number] = [];
    var map = data.number[number];
    lines.forEach(function (line, i) {
      var s = line.trim().split(',');
      if (s.length === 2) map[i] = s;
    });
  }

  return data;

}


var data = loadData(path.resolve(__dirname, '../data/mobilephones.data'));


function query (number) {
  number = number.toString();
  var data = exports.data;
  var i = parseInt(number.slice(0, 3), 10);
  var j = parseInt(number.slice(3, 7), 10);
  debug('query: number=%s, i=%s, j=%s', number, i in data.number, data.number[i] && data.number[i][j]);
  if (data.number[i] && data.number[i][j]) {
    var info = data.number[i][j];
    var area = data.area[info[0]];
    var type = data.type[info[1]];
    var s = area.split(/\s+/);
    return {province: s[0], city: s[1], type: type};
  }
}

exports.data = data;
exports.query = query;
