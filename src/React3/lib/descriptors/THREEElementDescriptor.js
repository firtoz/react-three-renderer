import invariant from 'fbjs/lib/invariant';
import React3Renderer from '../React3DInstance';

import ReactPropTypeLocations from 'react/lib/ReactPropTypeLocations';
import ReactPropTypeLocationNames from 'react/lib/ReactPropTypeLocationNames.js';
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
    this._simpleProperties = [];

    this.propTypes = {};

    this._hasName = false;
  }

  hasName() {
    this._hasName = true;

    this.propTypes = {
      ...this.propTypes,

      'name': PropTypes.string,
    };


    this.propUpdates = {
      ...this.propUpdates,

      'name': this._updateName,
    };
  }

  _updateName = (threeObject, nextName) => {
    const oldName = threeObject.name;

    threeObject.name = nextName;

    threeObject.userData.events.emit('rename', {
      oldName,
      nextName,
    });

    const markup = threeObject.userData.markup;

    if (markup._rootInstance) {
      markup._rootInstance.objectRenamed(self, oldName, nextName);
    }
  };

  applyInitialProps(threeObject, props) {
    // do nothing for now

    const eventsForObject = new EventEmitter();

    if (this._hasName && props.name) {
      threeObject.name = props.name;
    }

    // pass down resources!

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
  addChildren(self, children) { // eslint-disable-line no-unused-vars
    invariant(false, `Cannot add children to ${this.constructor.name}!`);
  }

  moveChild() {
    invariant(false, `Cannot move children in ${this.constructor.name}!`);
  }

  removeChild(self, child) { // eslint-disable-line no-unused-vars
    invariant(false, `Cannot remove children in ${this.constructor.name}!`);
  }

  setParent(self, parentObject3D) {
    const parentMarkup = parentObject3D.userData.markup;

    if (parentMarkup && parentMarkup._rootInstance) {
      parentMarkup._rootInstance.objectMounted(self);
    }
  }

  unmount(self) { // eslint-disable-line no-unused-vars
    const markup = self.userData.markup;

    if (markup._rootInstance) {
      markup._rootInstance.objectRemoved(self);
    }

    self.userData.events.emit('dispose', {
      object: self,
    });

    self.userData.events.removeAllListeners();
  }

  removedFromParent(self) {
    delete self.userData.events;
  }

  // noinspection JSUnusedLocalSymbols
  deleteProperty(threeObject, propKey) { // eslint-disable-line no-unused-vars
    invariant(false, `Cannot delete property from ${this.constructor.name}!`);
  }

  updateProperty(threeObject, propKey, nextProp) {
    if (this.propUpdates[propKey]) {
      this.propUpdates[propKey](threeObject, nextProp);
    } else {
      invariant(false, `updating prop ${propKey} ( ${nextProp} ) for ${this.constructor.name}`);
    }
  }

  /**
   * @param {THREE.Object3D} threeObject
   */
  beginPropertyUpdates(threeObject) { // eslint-disable-line no-unused-vars

  }

  completePropertyUpdates(threeObject) { // eslint-disable-line no-unused-vars

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
    for (let i = 0; i < names.length; ++i) {
      const propName = names[i];
      this.propUpdates[propName] = this._updateSimple.bind(this, propName);
    }
  }

  _updateSimple(propName, self, propValue) {
    self[propName] = propValue;
  }

  registerSimpleProperties(propertyNames) {
    this._simpleProperties = this._simpleProperties.concat(propertyNames);

    this.useSimpleUpdates(propertyNames);
  }

  getBoundingBoxes(threeObject) { // eslint-disable-line no-unused-vars
    return [];
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
        if(propName === 'children') {
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
              invariant(false, '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', componentName || 'React class', ReactPropTypeLocationNames[location], propName);
            } else {
              invariant(false);
            }
          }
          error = propTypes[propName](props, propName, componentName, location);
        } catch (ex) {
          error = ex;
        }

        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', ReactPropTypeLocationNames[location], propName, typeof error);

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
