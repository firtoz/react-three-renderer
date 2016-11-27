import invariant from 'fbjs/lib/invariant';

import warning from 'fbjs/lib/warning';

import events from 'events';

import PropTypes from 'react/lib/ReactPropTypes';
import checkReactTypeSpec from 'react/lib/checkReactTypeSpec';
import React3Renderer from '../React3Instance';

const { EventEmitter } = events;

/**
 * @abstract
 */
class THREEElementDescriptor {
  constructor(react3RendererInstance: React3Renderer) {
    this.react3RendererInstance = react3RendererInstance;
    this.propUpdates = {};
    this.propDeletes = {};
    this.propDefaults = {};
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

  removeProp(name) {
    invariant(this.propTypes.hasOwnProperty(name), 'The property %s has not been defined', name);

    const simpleIndex = this._simpleProperties.indexOf(name);
    if (simpleIndex !== -1) {
      this._simpleProperties.splice(simpleIndex, 1);
    }

    delete this.propTypes[name];
    delete this.propDeletes[name];
    delete this.propUpdates[name];
    delete this.propDefaults[name];

    const updateInitialIndex = this._updateInitial.indexOf(name);
    if (updateInitialIndex !== -1) {
      this._updateInitial.splice(updateInitialIndex, 1);
    }

    delete this._initialOnly[name];
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

        this.propDefaults[name] = info.default;
      }
    } else {
      if (info.hasOwnProperty('update')) {
        this.propUpdates[name] = info.update;
      }

      if (info.hasOwnProperty('default')) {
        invariant(info.hasOwnProperty('update'),
          'The information should include a `update` property ' +
          'if it has a `default` property');

        this.propDeletes[name] = (threeObject) => {
          info.update(threeObject, info.default, true);
        };

        this.propDefaults[name] = info.default;
      } else {
        invariant(info.update === this.triggerRemount,
          `The type information for ${this.constructor.name}.${name} ` +
          'should include a `default` property if it\'s not going to trigger remount');
      }

      if (info.hasOwnProperty('remove')) {
        invariant(false, `Bad 'remove' info for ${this.constructor.name}.${name}`);
      }

      if (info.hasOwnProperty('updateInitial')) {
        invariant(info.hasOwnProperty('update'), 'The information should include a ' +
          '`update` property if it has a`updateInitial` property');

        if (process.env.NODE_ENV !== 'production') {
          invariant(info.hasOwnProperty('default')
            || this.propUpdates[name].length === 3
            || this.propUpdates[name] === this.triggerRemount,
            `Prop info for ${this.constructor.name}.${name} has 'updateInitial', ` +
            'but no \'default\', and ' +
            `the update function accepts ${this.propUpdates[name].length}` +
            ' parameters instead of 3.');
        }

        if (this._updateInitial.indexOf(name) === -1) {
          this._updateInitial.push(name);
        }
      }

      if (info.initialOnly) {
        invariant(info.hasOwnProperty('updateInitial'), 'The information should include a ' +
          '`updateInitial` property if it has an `initialOnly` property');
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

  placeRemountTrigger(threeObject, triggerRemount) {
    threeObject.userData._triggerRemount = triggerRemount;
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
      const childrenMarkup = threeObject.userData.markup.childrenMarkup;

      const increasedDistance = {
        ...data,
        distance: data.distance + 1,
      };

      childrenMarkup.forEach(childMarkup => childMarkup.threeObject.userData
        .events.emit('resource.added', increasedDistance));
    });

    eventsForObject.on('resource.removed', (data) => {
      const childrenMarkup = threeObject.userData.markup.childrenMarkup;

      const increasedDistance = {
        ...data,
        distance: data.distance + 1,
      };

      childrenMarkup.forEach(childMarkup => childMarkup.threeObject.userData
        .events.emit('resource.removed', increasedDistance));
    });

    threeObject.userData.events = eventsForObject;
    threeObject.userData._descriptor = this;

    this._updateInitial.forEach((propertyName) => {
      if (props.hasOwnProperty(propertyName)) {
        this.propUpdates[propertyName](threeObject, props[propertyName], true);
      } else {
        let originalValue;

        if (this.propDefaults.hasOwnProperty(propertyName)) {
          originalValue = this.propDefaults[propertyName];
        }

        this.propUpdates[propertyName](threeObject, originalValue, false);
      }
    });

    this._simpleProperties.forEach((propertyName) => {
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

  componentWillUnmount(threeObject) { // eslint-disable-line no-unused-vars

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
    propertyNames.forEach((propName) => {
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
    if (threeObject.userData._triggerRemount) {
      threeObject.userData._triggerRemount();

      delete threeObject.userData._triggerRemount;
    }
  }

  beginPropertyUpdates(threeObject) { // eslint-disable-line no-unused-vars
  }

  completePropertyUpdates(threeObject) { // eslint-disable-line no-unused-vars
  }

  beginChildUpdates(threeObject) { // eslint-disable-line no-unused-vars
  }

  completeChildUpdates(threeObject) { // eslint-disable-line no-unused-vars
  }
}

if (process.env.NODE_ENV !== 'production') {
  // @see ReactElementValidator

  const loggedTypeFailures = {};

  const getDeclarationErrorAddendum = (owner) => {
    if (owner) {
      const name = owner.getName();
      if (name) {
        return ` Check the render method of \`${name}\`.`;
      }
    }
    return '';
  };

  /**
   * Assert that the props are valid
   * @private
   */
  const _checkPropTypes = (componentName, propTypes, props, location, owner, element, debugID) => {
    const propNames = Object.keys(props);
    for (let i = 0; i < propNames.length; ++i) {
      const propName = propNames[i];

      if (propName === 'children') {
        continue;
      }

      if (!propTypes.hasOwnProperty(propName)) {
        const errorMessage = `Foreign prop ${propName} found in ${componentName}.`;

        if (!(errorMessage in loggedTypeFailures)) {
          const addendum = getDeclarationErrorAddendum(owner);

          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[errorMessage] = true;

          warning(false, `${errorMessage}${addendum}`);
        }
      }
    }

    checkReactTypeSpec(propTypes, props, location, componentName, element, debugID);
  };

  THREEElementDescriptor.prototype.checkPropTypes =
    function checkPropTypes(element, owner, debugID, props) {
      _checkPropTypes(element.type,
        this.propTypes,
        props,
        'prop',
        owner,
        element,
        debugID);
    };
}

module.exports = THREEElementDescriptor;
