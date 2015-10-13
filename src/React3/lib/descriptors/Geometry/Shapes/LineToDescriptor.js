import THREE from 'three';
import THREEElementDescriptor from '../../THREEElementDescriptor';

import invariant from 'fbjs/lib/invariant';

import resource from '../../decorators/resource';

import PropTypes from 'react/lib/ReactPropTypes';

import LineToAction from '../../../Shapes/LineToAction';

class LineToDeescriptor extends THREEElementDescriptor {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    [
      'x',
      'y',
    ].forEach(propName => {
      this.hasProp(propName, {
        type: PropTypes.number.isRequired,
        simple: true,
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
    debugger;

    super.setParent(threeObject, parentObject3D);
  }

  construct(props) {
    return new LineToAction(props.x, props.y);
  }
}

export default LineToDeescriptor;
