import md5 from './md5'

const app_key='1000000001';
const sign_method='md5';
const version='1.0';
const mapStr='8D39A387911BE502FC6BBE46400B84F2';
function checkSecret(data)
  {
      var paramMap=data;
      paramMap['app_key'] = app_key;
      paramMap['sign_method'] = sign_method;
      paramMap['v'] = version;
      var sign = getSign(paramMap);
      data.sign = sign;
      return data;
  }

/**
 * @param paramMap
 * @return string
 */
function getSign(paramMap)
{
    var str = mapStr;
    var keys = Object.keys(paramMap);
    keys = keys.sort();
    for (var i in keys) {
        if (paramMap[keys[i]] != "") {
            str += keys[i];
            str += paramMap[keys[i]];
        }
    }
    str += mapStr;
    str = md5(str);
    str = str.toUpperCase();
    return str;
}

export default checkSecret