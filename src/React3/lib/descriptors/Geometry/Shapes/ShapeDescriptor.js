import THREE from 'three';
import THREEElementDescriptor from '../../THREEElementDescriptor';

import invariant from 'fbjs/lib/invariant';

import resource from '../../decorators/resource';

import PropTypes from 'react/lib/ReactPropTypes';

import ShapeAction from '../../../Shapes/ShapeAction';
//import ShapeHoleContainer from '../../../Shapes/ShapeHoleContainer';

@resource
class ShapeDescriptor extends THREEElementDescriptor {
  _invalidChild = child => {
    const invalid = !(
      child instanceof ShapeAction
    );

    if (invalid) {
      debugger;
    }

    return invalid;
  };


  applyInitialProps(threeObject, props) {
    threeObject.userData = {
      ...threeObject.userData,
    };

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
      child.performAction(threeObject);
    });

    // TODO what do we do after all actions are performed?
  }

  setParent(threeObject, parentObject3D) {
    super.setParent(threeObject, parentObject3D);
  }

  addChild(threeObject, child, mountIndex) {
    // TODO: trigger remount

    this.triggerRemount(threeObject);
  }

  removeChild(threeObject, child) {
    // TODO: trigger remount

    this.triggerRemount(threeObject);
  }

  construct(props) {
    return new THREE.Shape();
  }
}

export default ShapeDescriptor;
