import THREE from 'three.js';
import THREEElementDescriptor from '../../THREEElementDescriptor';

import invariant from 'fbjs/lib/invariant';

import resource from '../../decorators/resource';

import PropTypes from 'react/lib/ReactPropTypes';

import ShapeAction from '../../../Shapes/ShapeAction';

class PathDescriptorBase extends THREEElementDescriptor {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    this.hasProp('points', {
      type: PropTypes.arrayOf(PropTypes.instanceOf(THREE.Vector2)),
      update: this.triggerRemount,
      default: [],
    });
  }

  applyInitialProps(threeObject, props) {
    threeObject.userData = {
      ...threeObject.userData,
    };

    // paths don't have uuids
    threeObject.uuid = THREE.Math.generateUUID();

    return super.applyInitialProps(threeObject, props);
  }

  addChildren(threeObject, children) {
    // TODO: create paths here

    if (process.env.NODE_ENV !== 'production') {
      invariant(children.filter(this._invalidChild).length === 0, 'Shape children can only be shape actions!');
    } else {
      invariant(children.filter(this._invalidChild).length === 0, false);
    }

    // apply all actions in order
    children.forEach(child => {
      this.performChildAction(threeObject, child);
    });
  }

  performChildAction(threeObject, child) {
    child.performAction(threeObject);
  }

  addChild(threeObject, child, mountIndex) {
    this.triggerRemount(threeObject);
  }


  moveChild(threeObject) {
    this.triggerRemount(threeObject);
  }

  removeChild(threeObject, child) {
    this.triggerRemount(threeObject);
  }

  _invalidChild = child => {
    const invalid = !(
      child instanceof ShapeAction
    );

    if (invalid) {
      debugger;
    }

    return invalid;
  };

  highlight(threeObject) {
    const parentObject = threeObject.userData.markup.parentMarkup.threeObject;

    parentObject.userData._descriptor.highlight(parentObject);
  }

  getBoundingBoxes(threeObject) {
    const parentObject = threeObject.userData.markup.parentMarkup.threeObject;

    return parentObject.userData._descriptor.getBoundingBoxes(parentObject);
  }
}

export default PathDescriptorBase;
