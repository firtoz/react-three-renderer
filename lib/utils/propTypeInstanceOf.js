'use strict';

var _ReactPropTypes = require('react/lib/ReactPropTypes');

var _ReactPropTypes2 = _interopRequireDefault(_ReactPropTypes);

var _ReactPropTypeLocationNames = require('react/lib/ReactPropTypeLocationNames');

var _ReactPropTypeLocationNames2 = _interopRequireDefault(_ReactPropTypeLocationNames);

var _PropTypeError = require('./PropTypeError');

var _PropTypeError2 = _interopRequireDefault(_PropTypeError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ANONYMOUS = '<<anonymous>>';

// Returns class name of the object, if any.
function getClassName(propValue) {
  if (!(propValue.constructor && (propValue.constructor.name || propValue.constructor.displayName))) {
    return ANONYMOUS;
  }
  return propValue.constructor.name || propValue.constructor.displayName;
}

function createChainableTypeChecker(validate) {
  function checkType(isRequired, props, propName, _componentName, location, _propFullName) {
    var componentName = _componentName || ANONYMOUS;
    var propFullName = _propFullName || propName;
    if (props[propName] === undefined) {
      var locationName = _ReactPropTypeLocationNames2.default[location];
      if (isRequired) {
        return new _PropTypeError2.default('The ' + locationName + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
      }
      return null;
    }

    for (var _len = arguments.length, rest = Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {
      rest[_key - 6] = arguments[_key];
    }

    return validate.apply(undefined, [props, propName, componentName, location, propFullName].concat(rest));
  }

  var chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);

  return chainedCheckType;
}

function createInstanceTypeChecker(expectedClass) {
  var originalInstanceOf = _ReactPropTypes2.default.instanceOf(expectedClass);

  function validate(props, propName, componentName, location, propFullName) {
    for (var _len2 = arguments.length, rest = Array(_len2 > 5 ? _len2 - 5 : 0), _key2 = 5; _key2 < _len2; _key2++) {
      rest[_key2 - 5] = arguments[_key2];
    }

    var originalResult = originalInstanceOf.apply(undefined, [props, propName, componentName, location, propFullName].concat(rest));

    if (originalResult !== null) {
      var locationName = _ReactPropTypeLocationNames2.default[location];
      var expectedClassName = expectedClass.name || expectedClass.displayName || ANONYMOUS;
      var actualClassName = getClassName(props[propName]);
      return new _PropTypeError2.default('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
    }

    return originalResult;
  }

  var typeChecker = createChainableTypeChecker(validate);

  var _type = '' + (expectedClass.displayName || expectedClass.name || expectedClass._type || expectedClass);

  typeChecker.toString = function () {
    return '```' + ' ' + _type + ' ' + '```';
  };

  typeChecker.isRequired.toString = function () {
    return typeChecker.toString() + ' *' + '```' + ' required ' + '```' + '*';
  };

  typeChecker.displayName = _type;
  typeChecker.isRequired.displayName = _type;

  return typeChecker;
}

module.exports = createInstanceTypeChecker;