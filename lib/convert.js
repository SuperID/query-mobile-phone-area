/**
 * 转换CSV数据库
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

var fs = require('fs');
var path = require('path');


function convertFile (inFile, outFile) {

  function parseLine (line) {
    return line.split(',').map(function (item) {
      item = item.trim();
      if (item[0] === '"' && item[item.length - 1]) item = item.slice(1, -1);
      return item;
    });
  }

  var data = {
    number: {},
    area: {},
    $area: {},
    $$area: 0,
    type: {},
    $type: {},
    $$type: 0
  };

  function formatId (id) {
    return id.toString(32);
  }

  function getAreaId (name) {
    if (!data.$area[name]) {
      var id = formatId(++data.$$area);
      data.$area[name] = id;
      data.area[id] = name;
    } else {
      var id = data.$area[name];
    }
    return id;
  }

  function getTypeId (name) {
    if (!data.$type[name]) {
      var id = formatId(++data.$$type);
      data.$type[name] = id;
      data.type[id] = name;
    } else {
      var id = data.$type[name];
    }
    return id;
  }

  function setNumber (number, area, type) {
    number = number.toString();
    var i1 = number.slice(0, 3);
    var i2 = number.slice(3);
    if (!data.number[i1]) data.number[i1] = [];
    if (area && type) {
      data.number[i1][i2] = [area, type];
    }
  }

  fs.readFileSync(inFile).toString().split('\n').slice(1).forEach(function (line) {
    var item = parseLine(line);
    var number = item[1];
    var area = getAreaId(item[2]);
    var type = getTypeId(item[3]);
    setNumber(number, area, type);
  });

  //fs.writeFileSync(outFile, JSON.stringify(data));

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


convertFile(path.resolve(__dirname, '../data/mobilephones.csv'), path.resolve(__dirname, '../data/mobilephones.txt'));
