import invariant from 'fbjs/lib/invariant';
import React3Renderer from '../React3Instance';

import ReactPropTypeLocations from 'react/lib/ReactPropTypeLocations';
import ReactPropTypeLocationNames from 'react/lib/ReactPropTypeLocationNames';
import warning from 'fbjs/lib/warning';

import events from 'events';
const {EventEmitter} = events;

import PropTypes from 'react/lib/ReactPropTypes';

/**
 * @abstract
 */
class THREEElementDescriptor {
  constructor(react3RendererInstance:React3Renderer) {
    this.react3RendererInstance = react3RendererInstance;
    this.propUpdates = {};
    this.propDeletes = {};
    this._initialOnly = {};
    this._updateInitial = [];
    this._simpleProperties = [];

    this.propTypes = {};

    this._hasName = false;
  }

  hasEvent(name) {
    this._hasEvents = true;

    this.hasProp(name, {
      type: PropTypes.func,
      updateInitial: true,
      update(threeObject, callback) {
        threeObject.userData._eventCallbacks[name] = callback;
      },
      default: null,
    });
  }

  hasProp(name, info) {
    invariant(info.hasOwnProperty('type'), 'The information should include a `type` property');
    invariant(!this.propTypes.hasOwnProperty(name) || info.override,
      'The property %s has already been defined', name);

    if (info.override) {
      // clean up simple prop
      const simpleIndex = this._simpleProperties.indexOf(name);
      if (simpleIndex !== -1) {
        this._simpleProperties.splice(simpleIndex, 1);
      }
    }

    this.propTypes[name] = info.type;

    if (info.hasOwnProperty('simple')) {
      this.registerSimpleProperties([name]);

      if (info.hasOwnProperty('default')) {
        this.propDeletes[name] = (threeObject) => {
          this.propUpdates[name](threeObject, info.default, true);
        };
      }
    } else {
      if (info.hasOwnProperty('update')) {
        this.propUpdates[name] = info.update;
      }

      if (info.hasOwnProperty('default')) {
        invariant(info.hasOwnProperty('update'), 'The information should include a `update` property if it has a'
          + '`default` property');

        this.propDeletes[name] = (threeObject) => {
          info.update(threeObject, info.default, true);
        };
      }

      if (info.hasOwnProperty('remove')) {
        invariant(!info.hasOwnProperty('default'), 'The information should not include ' +
          'both of `default` and `remove` properties');
        this.propDeletes[name] = (threeObject) => {
          info.update(threeObject, info.default);
        };
      }

      if (info.hasOwnProperty('updateInitial')) {
        invariant(info.hasOwnProperty('update'), 'The information should include a `update` property if it has a'
          + '`updateInitial` property');

        if (this._updateInitial.indexOf(name) === -1) {
          this._updateInitial.push(name);
        }
      }

      if (!!info.initialOnly) {
        invariant(info.hasOwnProperty('updateInitial'), 'The information should include a `updateInitial` property'
          + ' if it has an `initialOnly` property');
      }

      this._initialOnly[name] = info.initialOnly;
    }
  }

  hasName() {
    this._hasName = true;

    this.hasProp('name', {
      type: PropTypes.string,
      update: (threeObject, name) => {
        this._updateName(threeObject, name);
      },
      default: '',
    });
  }

  _updateName(threeObject, nextName) {
    const oldName = threeObject.name;

    threeObject.name = nextName;

    threeObject.userData.events.emit('rename', {
      oldName,
      nextName,
    });

    const markup = threeObject.userData.markup;

    if (markup._rootInstance) {
      markup._rootInstance.objectRenamed(threeObject, oldName, nextName);
    }
  }

  applyInitialProps(threeObject, props) {
    // do nothing for now

    const eventsForObject = new EventEmitter();

    if (this._hasName && props.name) {
      threeObject.name = props.name;
    }

    if (this._hasEvents) {
      threeObject.userData._eventCallbacks = {};
    }

    // pass down resources

    eventsForObject.on('resource.added', (data) => {
      const childrenMarkup = threeObject.userData.childrenMarkup;

      const increasedDistance = {
        ...data,
        distance: data.distance + 1,
      };

      childrenMarkup.forEach(childMarkup => childMarkup.userData.events.emit('resource.added', increasedDistance));
    });

    eventsForObject.on('resource.removed', (data) => {
      const childrenMarkup = threeObject.userData.childrenMarkup;

      const increasedDistance = {
        ...data,
        distance: data.distance + 1,
      };

      childrenMarkup.forEach(childMarkup => childMarkup.userData.events.emit('resource.removed', increasedDistance));
    });

    threeObject.userData.events = eventsForObject;
    threeObject.userData._descriptor = this;

    this._updateInitial.forEach(propertyName => {
      if (props.hasOwnProperty(propertyName)) {
        this.propUpdates[propertyName](threeObject, props[propertyName], true);
      } else {
        this.propUpdates[propertyName](threeObject, undefined, false);
      }
    });

    this._simpleProperties.forEach(propertyName => {
      if (props.hasOwnProperty(propertyName)) {
        threeObject[propertyName] = props[propertyName];
      }
    });
  }

  construct(props) { // eslint-disable-line no-unused-vars
    invariant(false, 'Missing constructor!');
  }

  // noinspection JSUnusedLocalSymbols
  addChildren(threeObject, children) { // eslint-disable-line no-unused-vars
    invariant(false, `Cannot add children to ${this.constructor.name}!`);
  }

  // noinspection JSUnusedLocalSymbols
  addChild(threeObject, child, mountIndex) { // eslint-disable-line no-unused-vars
    invariant(false, `Cannot add child to ${this.constructor.name}!`);
  }

  moveChild() {
    invariant(false, `Cannot move children in ${this.constructor.name}!`);
  }

  removeChild(threeObject, child) { // eslint-disable-line no-unused-vars
    invariant(false, `Cannot remove children in ${this.constructor.name}!`);
  }

  setParent(threeObject, parentObject3D) {
    const parentMarkup = parentObject3D.userData.markup;

    if (parentMarkup && parentMarkup._rootInstance) {
      parentMarkup._rootInstance.objectMounted(threeObject);
    }
  }

  componentWillUnmount(threeObject) {

  }

  unmount(threeObject) {
    const markup = threeObject.userData.markup;

    if (markup._rootInstance) {
      markup._rootInstance.objectRemoved(threeObject);
    }

    if (this._hasEvents) {
      delete threeObject.userData._eventCallbacks;
    }

    threeObject.userData.events.emit('dispose', {
      object: threeObject,
    });

    threeObject.userData.events.removeAllListeners();
  }

  removedFromParent(threeObject) {
    delete threeObject.userData.events;
  }

  // noinspection JSUnusedLocalSymbols
  deleteProperty(threeObject, propKey) { // eslint-disable-line no-unused-vars
    if (this.propDeletes[propKey]) {
      this.propDeletes[propKey](threeObject);
    } else if (process.env.NODE_ENV !== 'production') {
      warning(false, `Cannot delete property %s from ${this.constructor.name}`, propKey);
    }
  }

  updateProperty(threeObject, propKey, nextProp) {
    if (!this._initialOnly[propKey]) {
      if (this.propUpdates[propKey]) {
        this.propUpdates[propKey](threeObject, nextProp, true);
      } else {
        warning(false, `updating prop ${propKey} ( ${nextProp} ) for ${this.constructor.name}`);
        this.triggerRemount(threeObject);
      }
    } else {
      this.triggerRemount(threeObject);
    }
  }

  highlight(threeObject) { // eslint-disable-line no-unused-vars
    // no highlighting by default!
  }

  hideHighlight(threeObject) { // eslint-disable-line no-unused-vars
    // no highlighting by default!
  }

  /**
   * @protected
   * @param names
   */
  useSimpleUpdates(names) {
    for (let index = 0; index < names.length; ++index) {
      const propName = names[index];
      this.propUpdates[propName] = this._updateSimple.bind(this, propName);
    }
  }

  _updateSimple(propName, threeObject, propValue) {
    threeObject[propName] = propValue;
  }

  registerSimpleProperties(propertyNames) {
    propertyNames.forEach(propName => {
      if (this._simpleProperties.indexOf(propName) === -1) {
        this._simpleProperties.push(propName);
      }
    });

    this.useSimpleUpdates(propertyNames);
  }

  getBoundingBoxes(threeObject) { // eslint-disable-line no-unused-vars
    return [];
  }

  triggerRemount(threeObject) {
    threeObject.userData._triggerRemount();

    delete threeObject.userData._triggerRemount;
  }

  beginPropertyUpdates(threeObject, triggerRemount) {
    threeObject.userData._triggerRemount = triggerRemount;
  }

  completePropertyUpdates(threeObject) {
    delete threeObject.userData._triggerRemount;
  }

  beginChildUpdates(threeObject, triggerRemount) {
    threeObject.userData._triggerRemount = triggerRemount;
  }

  completeChildUpdates(threeObject) {
    delete threeObject.userData._triggerRemount;
  }
}

if (process.env.NODE_ENV !== 'production') {
  // @see ReactElementValidator

  const loggedTypeFailures = {};

  const getDeclarationErrorAddendum = (owner) => {
    if (owner) {
      const name = owner.getName();
      if (name) {
        return ' Check the render method of `' + name + '`.';
      }
    }
    return '';
  };

  /**
   * Assert that the props are valid
   * @private
   */
  const _checkPropTypes = (componentName, propTypes, props, location, owner) => {
    for (const propName in props) {
      if (props.hasOwnProperty(propName)) {
        if (propName === 'children') {
          continue;
        }

        const addendum = getDeclarationErrorAddendum(owner);

        const errorMessage = `Foreign prop ${propName} found in ${componentName}.`;
        if (!propTypes.hasOwnProperty(propName) && !(errorMessage in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[errorMessage] = true;

          warning(false, `${errorMessage}${addendum}`);
        }
      }
    }
    for (const propName in propTypes) {
      if (propTypes.hasOwnProperty(propName)) {
        let error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof propTypes[propName] !== 'function') {
            if (process.env.NODE_ENV !== 'production') {
              invariant(false, '%s: %s type `%s` is invalid; it must be a function, usually from '
                + 'React.PropTypes.', componentName || 'React class',
                ReactPropTypeLocationNames[location], propName);
            } else {
              invariant(false);
            }
          }
          error = propTypes[propName](props, propName, componentName, location);
        } catch (ex) {
          error = ex;
        }

        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker '
          + 'function must return `null` or an `Error` but returned a %s. '
          + 'You may have forgotten to pass an argument to the type checker '
          + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and '
          + 'shape all require an argument).', componentName || 'React class',
          ReactPropTypeLocationNames[location], propName, typeof error);

        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          const addendum = getDeclarationErrorAddendum(owner);
          warning(false, 'Failed propType: %s%s', error.message, addendum);
        }
      }
    }
  };

  THREEElementDescriptor.prototype.checkPropTypes = function checkPropTypes(name, owner, props) {
    _checkPropTypes(name, this.propTypes, props, ReactPropTypeLocations.prop, owner);
  };
}

export default THREEElementDescriptor;
