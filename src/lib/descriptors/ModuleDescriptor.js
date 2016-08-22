import ReactPropTypeLocationNames from 'react/lib/ReactPropTypeLocationNames';

import THREEElementDescriptor from './THREEElementDescriptor';
import Module from '../Module';
import PropTypeError from '../utils/PropTypeError';

// Returns class name of the object, if any.
// Used for the subclass proptype checker
function getClassName(propValue) {
  if (!propValue.constructor || !propValue.constructor.name) {
    return '<<anonymous>>';
  }
  return propValue.constructor.name;
}

class ModuleDescriptor extends THREEElementDescriptor {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    const moduleSubclassValidator = (props, propName, componentName, location, propFullName) => {
      const locationName = ReactPropTypeLocationNames[location];

      if (!props[propName]) {
        return new PropTypeError(`Required ${locationName} \`${propFullName}\` ` +
          `was not specified in \`${componentName}\`.`);
      }

      if (!(props[propName].prototype instanceof Module)) {
        const actualClassName = getClassName(props[propName]);

        return new PropTypeError(`Invalid ${locationName} \`${propFullName}\` ` +
          `of type \`${actualClassName}\` supplied to \`${componentName}\`, ` +
          'expected subclass of `Module`.');
      }

      // success returns undefined
      return undefined;
    };

    moduleSubclassValidator.toString = () =>
      `${'```'} subclass of ReactThreeRenderer.Module ${'```'} *${'```'} required ${'```'}*`;

    this.hasProp('descriptor', {
      type: moduleSubclassValidator,
      update: this.triggerRemount,
      default: undefined,
    });
  }

  construct(props) {
    // going insane here but... let's... just do this.
    const ModuleClass = props.descriptor;
    return new ModuleClass();
  }

  applyInitialProps(threeObject, props) {
    super.applyInitialProps(threeObject, props);

    threeObject.setup(this.react3RendererInstance);
  }

  unmount(threeObject) {
    threeObject.dispose();

    super.unmount(threeObject);
  }
}

module.exports = ModuleDescriptor;
