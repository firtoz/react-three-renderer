import PropTypes from 'prop-types';
import ReactPropTypeLocationNames from 'react/lib/ReactPropTypeLocationNames';
import PropTypeError from './PropTypeError';

const ANONYMOUS = '<<anonymous>>';

// Returns class name of the object, if any.
function getClassName(propValue) {
  if (!(propValue.constructor
    && (propValue.constructor.name || propValue.constructor.displayName))) {
    return ANONYMOUS;
  }
  return propValue.constructor.name || propValue.constructor.displayName;
}


function createChainableTypeChecker(validate) {
  function checkType(isRequired,
                     props,
                     propName,
                     _componentName,
                     location,
                     _propFullName,
                     ...rest) {
    const componentName = _componentName || ANONYMOUS;
    const propFullName = _propFullName || propName;
    if (props[propName] === undefined) {
      const locationName = ReactPropTypeLocationNames[location];
      if (isRequired) {
        return new PropTypeError(
          `The ${locationName} \`${propFullName}\` is marked as required in ` +
          `\`${componentName}\`, but its value is \`undefined\`.`
        );
      }
      return null;
    }

    return validate(props, propName, componentName, location, propFullName, ...rest);
  }

  const chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);

  return chainedCheckType;
}

function createInstanceTypeChecker(expectedClass) {
  const originalInstanceOf = PropTypes.instanceOf(expectedClass);

  function validate(props, propName, componentName, location, propFullName, ...rest) {
    const originalResult = originalInstanceOf(props, propName,
      componentName, location, propFullName, ...rest);

    if (originalResult !== null) {
      const locationName = ReactPropTypeLocationNames[location];
      const expectedClassName = expectedClass.name || expectedClass.displayName || ANONYMOUS;
      const actualClassName = getClassName(props[propName]);
      return new PropTypeError(`Invalid ${locationName} \`${propFullName}\` of type ` +
        `\`${actualClassName}\` supplied to \`${componentName}\`, expected ` +
        `instance of \`${expectedClassName}\`.`);
    }

    return originalResult;
  }

  const typeChecker = createChainableTypeChecker(validate);

  const _type = `${expectedClass.displayName || expectedClass.name
  || expectedClass._type || expectedClass}`;

  typeChecker.toString = () => `${'```'} ${_type} ${'```'}`;

  typeChecker.isRequired.toString = () => `${typeChecker.toString()} *${'```'} required ${'```'}*`;

  typeChecker.displayName = _type;
  typeChecker.isRequired.displayName = _type;

  return typeChecker;
}

module.exports = createInstanceTypeChecker;
