import invariant from 'fbjs/lib/invariant';
import React3Instance from '../React3DInstance';

/**
 * @abstract
 */
class THREEElementDescriptor {
  constructor(react3Instance:React3Instance) {
    /**
     * @protected
     * @type {React3Instance}
     */
    this._react3Instance = react3Instance;
    this.propUpdates = {};
  }

  applyInitialProps(self, props) { // eslint-disable-line no-unused-vars
    // do nothing for now
  }

  construct() {
    invariant(false, 'Missing constructor!');
  }

  // noinspection JSUnusedLocalSymbols
  addChildren(self, children) { // eslint-disable-line no-unused-vars
    invariant(false, `Cannot add children to ${this.constructor.name}!`);
  }

  moveChild() {
    invariant(false, `Cannot move children in ${this.constructor.name}!`);
  }

  removeChild() {
    invariant(false, `Cannot remove children in ${this.constructor.name}!`);
  }

  setParent() {
    invariant(false, `Cannot add parent to ${this.constructor.name}!`);
  }

  unmount() {
    invariant(false, `Cannot unmount ${this.constructor.name}!`);
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
}

export default THREEElementDescriptor;
