import THREE from 'three';
import THREEElementDescriptor from '../../THREEElementDescriptor';

import invariant from 'fbjs/lib/invariant';

import resource from '../../decorators/resource';

import PropTypes from 'react/lib/ReactPropTypes';

import MoveToAction from '../../../Shapes/MoveToAction';

class MoveToDescriptor extends THREEElementDescriptor {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    [
      'x',
      'y',
    ].forEach(propName => {
      this.hasProp(propName, {
        type: PropTypes.number.isRequired,
        update: this.triggerRemount,
        default: 0,
      });
    });
  }

  applyInitialProps(threeObject, props) {
    threeObject.userData = {
      ...threeObject.userData,
    };

    return super.applyInitialProps(threeObject, props);
  }

  setParent(threeObject, parentObject3D) {
    super.setParent(threeObject, parentObject3D);
  }

  construct(props) {
    return new MoveToAction(props.x, props.y);
  }
}

export default MoveToDescriptor;
