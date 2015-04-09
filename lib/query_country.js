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
fs.readFileSync(path.resolve(__dirname, '../data/countries.txt')).toString().split('\n').forEach(function (item) {
  var s = item.split(',').map(function (item) {
    return item.trim();
  });
  if (s.length < 3) return;
  COUNTRY_NUMBER[s[2]] = {name: s[0], code: s[1]};
  if (s[2].length > MAX_CNUMBER_LENGTH) MAX_CNUMBER_LENGTH = s[2].length;
});


function query (number) {
  number = number.toString().replace(/^\+?0*/, '');
  debug('query: number=%s', number);
  for (var i = 1; i <= MAX_CNUMBER_LENGTH; i++) {
    var n = number.slice(0, i);
    debug('query: test, number=%s, n=%s', number, n);
    if (COUNTRY_NUMBER[n]) {
      return {
        country: COUNTRY_NUMBER[n].name,
        code: COUNTRY_NUMBER[n].code,
        number: number.slice(i)
      };
    }
  }
}

exports.data = COUNTRY_NUMBER;
exports.query = query;
