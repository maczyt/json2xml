function hasOwn(obj, prop) {
  return obj.hasOwnProperty(prop);
}

function isType(type) {
  return function (obj) {
    return ({}).toString.call(obj) === '[object ' + type + ']'
  }
}

var isArray = isType('Array'),
    isObject = isType('Object');

function json2xml(json) {
  json = typeof json === 'string' ?
    JSON.parse(json) : json;
  var xml = parse(json);

  function parse(data) {
    if (typeof data !== 'object') {
      var type = typeof data;
      return '<'+type+'>'+data+'</'+type+'>'
    } else if (isArray(data)) {
      return '<array>' + function () {
        return data.map(function (item) {
          return parse(item)
        }).join('')
      }() + '</array>'
    } else if (isObject(data)) {
      return '<object>' + function () {
        var prop;
        var html = '';
        for (prop in data) {
          if (hasOwn(data, prop)) {
            html += '<item name="'+prop+'">'+parse(data[prop])+'</item>'
          }
        }
        return html;
      }() + '</object>'
    }
  }
  return xml;
}
