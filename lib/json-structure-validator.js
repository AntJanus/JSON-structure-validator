var compareJSON = function(templateObj, comparedObj) {
  var keys = typeof templateObj === 'string' ? [] : Object.keys(templateObj);
  var error = '';

  // check all keys
  keys.forEach((key) => {
    var originalType = typeof templateObj[key];

    // if key exists
    if(comparedObj.hasOwnProperty(key)){
      //compare keys
      var recursive = compareJSON(templateObj[key], comparedObj[key]);

      // if they do not match, propagate error and append current key
      if(recursive !== true) {
        error = key + ' ' + recursive;
        return false;
      }
    } else {

      // key doesn't exist? propagate error
      error = key;
      return false;
    }
  });

  // if error, return error
  if(error && error.length > 0) {
    return error;
  }

  return true;
};

var comparison = function(templateObj, comparedObj) {
  var result = compareJSON(templateObj, comparedObj);

  if(result !== true) {
    return 'Objects do not match at ' + result;
  }

  return true;
};

module.exports = comparison;
