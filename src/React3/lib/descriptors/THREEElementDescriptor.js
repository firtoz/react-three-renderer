import invariant from 'fbjs/lib/invariant';

/**
 * @abstract
 */
class THREEElementDescriptor {
  constructor(react3Instance) {
    /**
     * @protected
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
    invariant(false, 'Cannot add children to this type!');
  }

  moveChild() {
    invariant(false, 'Cannot add children to this type!');
  }

  removeChild() {
    invariant(false, 'Cannot add children to this type!');
  }

  setParent() {
    invariant(false, 'Cannot add parent to this type!');
  }

  unmount() {
    invariant(false, 'Cannot unmount this type!');
  }

  // noinspection JSUnusedLocalSymbols
  deleteProperty(threeObject, propKey) { // eslint-disable-line no-unused-vars
    invariant(false, 'Cannot delete property!');
  }

  updateProperty(threeObject, propKey, nextProp) {
    if (this.propUpdates[propKey]) {
      this.propUpdates[propKey](threeObject, nextProp);
    } else {
      invariant(false, `updating prop ${propKey} ${nextProp} for ${threeObject}`);
    }
  }
}

export default THREEElementDescriptor;
