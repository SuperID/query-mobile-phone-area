/**
 * 单元测试
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

var should = require('should');
var query = require('../');


describe('query-mobile-phone-area', function () {

  it('query()', function () {
    query(13800138000).should.eql({province: '北京', city: '北京', type: '中国移动'});
    query('13800138000').should.eql({province: '北京', city: '北京', type: '中国移动'});
  });

  it('query.query()', function () {
    query(13800138000).should.eql({province: '北京', city: '北京', type: '中国移动'});
    query('13800138000').should.eql({province: '北京', city: '北京', type: '中国移动'});
  });

  it('query.queryCountry()', function () {
    query.queryCountry(112345).should.eql({country: '美国', enCountry: 'United States', code: 'US', number: '12345'});
    query.queryCountry('112345').should.eql({country: '美国', enCountry: 'United States', code: 'US', number: '12345'});
    query.queryCountry('00112345').should.eql({country: '美国', enCountry: 'United States', code: 'US', number: '12345'});
    query.queryCountry('+112345').should.eql({country: '美国', enCountry: 'United States', code: 'US', number: '12345'});
    query.queryCountry(8613800138000).should.eql({country: '中国', enCountry: 'China', code: 'CN', number: '13800138000'});
    query.queryCountry('008613800138000').should.eql({country: '中国', enCountry: 'China', code: 'CN', number: '13800138000'});
    query.queryCountry('+8613800138000').should.eql({country: '中国', enCountry: 'China', code: 'CN', number: '13800138000'});
    query.queryCountry('+008613800138000').should.eql({country: '中国', enCountry: 'China', code: 'CN', number: '13800138000'});
  });

});
