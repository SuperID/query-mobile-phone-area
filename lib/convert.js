/**
 * 转换CSV数据库
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

var fs = require('fs');
var path = require('path');
var debug = require('debug')('query-mobile-phone-area');


var data = {
  number: {},
  area: {},
  $area: {},
  $$area: 0,
  type: {},
  $type: {},
  $$type: 0
};

function parseLine (line) {
  return line.split(',').map(function (item) {
    item = item.trim();
    if (item[0] === '"' && item[item.length - 1]) item = item.slice(1, -1);
    return item;
  });
}

function formatId (id) {
  return id.toString(32);
}

function getAreaId (name) {
  var id;
  if (!data.$area[name]) {
    id = formatId(++data.$$area);
    data.$area[name] = id;
    data.area[id] = name;
  } else {
    id = data.$area[name];
  }
  return id;
}

function getTypeId (name) {
  var id;
  if (!data.$type[name]) {
    id = formatId(++data.$$type);
    data.$type[name] = id;
    data.type[id] = name;
  } else {
    id = data.$type[name];
  }
  return id;
}

function setNumber (number, area, type) {
  number = number.toString();
  var i = parseInt(number.slice(0, 3), 10);
  var j = parseInt(number.slice(3), 10);
  if (!data.number[i]) data.number[i] = [];
  data.number[i][j] = [area, type];
}

function loadFromFile (inFile) {
  fs.readFileSync(inFile).toString().split('\n').slice(1).forEach(function (line, i) {
    var item = parseLine(line);
    if (item.length < 4) return;
    var number = item[1];
    var area = item[2].trim();
    var type = item[3].trim();
    if (area && type) {
      var areaId = getAreaId(area);
      var typeId = getTypeId(type);
      setNumber(number, areaId, typeId);
    }
  });
}

function saveToFile (outFile) {
  var save = [];

  save.push('type');
  for (var i in data.type) {
    save.push([i, data.type[i]].join(','));
  }
  save.push('----------');

  save.push('area');
  for (var i in data.area) {
    save.push([i, data.area[i]].join(','));
  }
  save.push('----------');

  for (var i in data.number) {
    save.push('number-' + i);
    for (var j = 0; j < data.number[i].length; j++) {
      save.push(data.number[i][j]);
    }
    save.push('----------');
  }

  fs.writeFileSync(outFile, save.join('\n'));
}


loadFromFile(path.resolve(__dirname, '../data/mobilephones-2.csv'));
loadFromFile(path.resolve(__dirname, '../data/mobilephones-1.csv'));
saveToFile(path.resolve(__dirname, '../data/mobilephones.txt'));
