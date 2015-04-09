/**
 * 查询国际手机号码归属地
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

var fs = require('fs');
var path = require('path');
var debug = require('debug')('query-mobile-phone-area');


var COUNTRY_NUMBER = {};
var MAX_CNUMBER_LENGTH = 0;
var COUNTRY_CODE = {};
fs.readFileSync(path.resolve(__dirname, '../data/countries.txt')).toString().split('\n').forEach(function (item) {
  var s = item.split(',').map(function (item) {
    return item.trim();
  });
  if (s.length < 3) return;
  var item = {code: s[1], name: s[2], enName: s[3], number: s[0]};
  COUNTRY_NUMBER[item.number] = item;
  COUNTRY_CODE[item.code] = item;
  if (s[0].length > MAX_CNUMBER_LENGTH) MAX_CNUMBER_LENGTH = s[0].length;
});


function query (number) {
  number = number.toString().replace(/^\+?0*/, '');
  debug('query: number=%s', number);
  for (var i = 1; i <= MAX_CNUMBER_LENGTH; i++) {
    var n = number.slice(0, i);
    debug('query: test, number=%s, n=%s', number, n);
    if (COUNTRY_NUMBER[n]) {
      return {
        code: COUNTRY_NUMBER[n].code,
        number: number.slice(i),
        country: COUNTRY_NUMBER[n].name,
        enCountry: COUNTRY_NUMBER[n].enName
      };
    }
  }
}

function queryInfo (code) {
  debug('queryInfo: code=%s', code);
  return COUNTRY_CODE[code];
}

exports.data = COUNTRY_NUMBER;
exports.query = query;
exports.queryInfo = queryInfo;
