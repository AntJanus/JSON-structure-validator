var _ = require('lodash');

module.exports = comparison;

var types = [
  'function',
  'number',
  'string',
  'regex'
];

var compareJSON = function(parent, compared) {
  var keys = _.keys(parent);
  var error = '';

  _.each(keys, function(key){
    if(_.has(compared, key)){
      if(typeTest(parent[key], compared[key])) {

      } else {
        error = key;
        return false;
      }

      var recursive = compareJSON(parent[key], compared[key]);
      if(recursive !== true) {
        error = key + ' ' + recursive;
        return false;
      }
    } else {
      error = key;
      return false;
    }
  });

  if(!_.isEmpty(error)) {
    return error;
  }

  return true;
};

function comparison(parent, compared) {
  var result = compareJSON(parent, compared);

  if(result !== true) {
    return 'Objects do not match at ' + result;
  }

  return true;
};

function typeTest(type, testValue) {
  if(typeof type === 'regex') {
    return testValue.test(type);
  }

  if(_.has(types, type)) {
    return typeof testValue === type;
  }

  return true;
}

