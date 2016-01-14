import PropTypes from 'react/lib/ReactPropTypes';
import ReactPropTypeLocationNames from 'react/lib/ReactPropTypeLocationNames';

// Returns class name of the object, if any.
function getClassName(propValue) {
  if (!(propValue.constructor
    && (propValue.constructor.name || propValue.constructor.displayName))) {
    return '<<anonymous>>';
  }
  return propValue.constructor.name || propValue.constructor.displayName;
}

const ANONYMOUS = '<<anonymous>>';

function createChainableTypeChecker(validate) {
  function checkType(isRequired, props, propName, _componentName, location, _propFullName) {
    const componentName = _componentName || ANONYMOUS;
    const propFullName = _propFullName || propName;
    if (props[propName] === null) {
      const locationName = ReactPropTypeLocationNames[location];
      if (isRequired) {
        return new Error('Required ' + locationName + ' `' + propFullName +
          '` was not specified in ' + ('`' + componentName + '`.'));
      }
      return null;
    }

    return validate(props, propName, componentName, location, propFullName);
  }

  const chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);

  return chainedCheckType;
}

function createInstanceTypeChecker(expectedClass) {
  const originalInstanceOf = PropTypes.instanceOf(expectedClass);

  function validate(props, propName, componentName, location, propFullName) {
    const originalResult = originalInstanceOf(props, propName,
      componentName, location, propFullName);

    if (originalResult !== null) {
      const locationName = ReactPropTypeLocationNames[location];
      const expectedClassName = expectedClass.name || expectedClass.displayName || ANONYMOUS;
      const actualClassName = getClassName(props[propName]);
      return new Error('Invalid ' + locationName + ' `' + propFullName +
        '` of type ' + ('`' + actualClassName + '` supplied to `' +
        componentName + '`, expected ') +
        ('instance of `' + expectedClassName + '`.'));
    }

    return originalResult;
  }

  const typeChecker = createChainableTypeChecker(validate);

  const _type = `${expectedClass.displayName || expectedClass.name
  || expectedClass._type || expectedClass}`;

  typeChecker.toString = () => {
    return `${'```'} ${_type} ${'```'}`;
  };

  typeChecker.isRequired.toString = () => {
    return `${typeChecker.toString()} *${'```'} required ${'```'}*`;
  };

  typeChecker.displayName = _type;
  typeChecker.isRequired.displayName = _type;

  return typeChecker;
}

module.exports = createInstanceTypeChecker;
