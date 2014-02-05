var _ = require('lodash');

var compareJSON = function(parent, compared) {
  var keys = _.keys(parent);
  var error = '';

  _.each(keys, function(key){
    if(_.has(compared, key)){
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
