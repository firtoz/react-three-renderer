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
  }

  applyInitialProps(self, props) { // eslint-disable-line no-unused-vars
    // do nothing for now

    const events = new EventEmitter();

    // pass down resources!

    events.on('resource.added', (data) => {
      const childrenMarkup = self.userData.childrenMarkup;

      childrenMarkup.forEach(childMarkup => childMarkup.userData.events.emit('resource.added', {
        id: data.id,
        distance: data.distance + 1,
        resource: data.resource,
      }));
    });

    events.on('resource.removed', (data) => {
      const childrenMarkup = self.userData.childrenMarkup;

      childrenMarkup.forEach(childMarkup => childMarkup.userData.events.emit('resource.removed', {
        id: data.id,
        distance: data.distance + 1,
      }));
    });

    self.userData.events = events;
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

  /**
   * @param {THREE.Object3D} threeObject
   */
  completePropertyUpdates(threeObject) { // eslint-disable-line no-unused-vars

  }

  highlight(threeObject) { // eslint-disable-line no-unused-vars
    // no highlighting by default!
  }

  hideHighlight(threeObject) { // eslint-disable-line no-unused-vars
    // no highlighting by default!
  }
}

export default THREEElementDescriptor;
