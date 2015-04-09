/**
 * 查询手机号码归属地
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

var query = require('./lib/query').query;
var queryCountry = require('./lib/query_country').query;
var queryCountryInfo = require('./lib/query_country').queryInfo;


module.exports = exports = function (number) {
  return query(number);
};

exports.query = query;

exports.queryCountry = queryCountry;

exports.queryCountryInfo = queryCountryInfo;
