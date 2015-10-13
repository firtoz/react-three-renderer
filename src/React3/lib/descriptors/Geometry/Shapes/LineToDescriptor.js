import THREE from 'three';
import THREEElementDescriptor from '../../THREEElementDescriptor';

import invariant from 'fbjs/lib/invariant';

import resource from '../../decorators/resource';

import PropTypes from 'react/lib/ReactPropTypes';

import LineToAction from '../../../Shapes/LineToAction';

class LineToDescriptor extends THREEElementDescriptor {
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

  construct(props) {
    return new LineToAction(props.x, props.y);
  }
}

export default LineToDescriptor;
