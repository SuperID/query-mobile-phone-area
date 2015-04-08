# query-mobile-phone-area
查询手机号码归属地

## 安装

```bash
$ npm install query-mobile-phone-area --save
```

## 使用

```javascript
var query = require('query-mobile-phone-area');

console.log(query('13800138000'));
// 输出： { province: '北京', city: '北京', type: '中国移动' }
```
