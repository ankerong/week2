var dataJson = require('./data/data');
var data = {
    '/api/index': dataJson
}
module.exports = function(url) {
    return data[url];
}