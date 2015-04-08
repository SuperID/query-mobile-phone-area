/**
 * 查询手机号码归属地
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

var load = require('./lib/load');

module.exports = exports = function (number) {
  return load.query(load.data, number);
};
