import invariant from 'fbjs/lib/invariant';
import React3Renderer from '../React3DInstance';

import events from 'events';
const {EventEmitter} = events;

/**
 * @abstract
 */
class THREEElementDescriptor {
  constructor(react3RendererInstance:React3Renderer) {
    this.react3RendererInstance = react3RendererInstance;
    this.propUpdates = {};
    this._simpleProperties = [];
  }

  applyInitialProps(self, props) { // eslint-disable-line no-unused-vars
    // do nothing for now

    const eventsForObject = new EventEmitter();

    // pass down resources!

    eventsForObject.on('resource.added', (data) => {
      const childrenMarkup = self.userData.childrenMarkup;

      const increasedDistance = {
        ...data,
        distance: data.distance + 1,
      };

      childrenMarkup.forEach(childMarkup => childMarkup.userData.events.emit('resource.added', increasedDistance));
    });

    eventsForObject.on('resource.removed', (data) => {
      const childrenMarkup = self.userData.childrenMarkup;

      const increasedDistance = {
        ...data,
        distance: data.distance + 1,
      };

      childrenMarkup.forEach(childMarkup => childMarkup.userData.events.emit('resource.removed', increasedDistance));
    });

    self.userData.events = eventsForObject;
    self.userData._descriptor = this;

    this._simpleProperties.forEach(propertyName => {
      if (props.hasOwnProperty(propertyName)) {
        self[propertyName] = props[propertyName];
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
    // yep that's allowed

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

  getBoundingBoxes(threeObject) {
    return [];
  }
}

export default THREEElementDescriptor;
