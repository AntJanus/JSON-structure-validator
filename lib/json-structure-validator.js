var compareJSON = function(parent, compared) {
  var keys = Object.keys(parent);
  var error = '';

  keys.forEach(function(key){
    if(compared[key]){
      var recursive = compareJSON(parent[key], compared[key]);
      if(recursive !== true) {
        error = key + ' ' + recursive;
        return false;
      }
    }
    else {
      error = key;
      return false;
    }
  });

  if(!_.isEmpty(error)) {
    return error;
  }

  return true;
};

var comparison = function(parent, compared) {
  var result = compareJSON(parent, compared);
  if(result !== true) {
    return 'Objects do not match at ' + result;
  }

  return true;
};


module.exports = comparison;
