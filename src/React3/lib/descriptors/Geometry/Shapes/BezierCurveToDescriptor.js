import THREE from 'three';
import THREEElementDescriptor from '../../THREEElementDescriptor';

import invariant from 'fbjs/lib/invariant';

import resource from '../../decorators/resource';

import PropTypes from 'react/lib/ReactPropTypes';

import BezierCurveToAction from '../../../Shapes/BezierCurveToAction';

class BezierCurveToDescriptor extends THREEElementDescriptor {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    [
      'cp1X',
      'cp1Y',
      'cp2X',
      'cp2Y',
      'aX',
      'aY',
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
    const {
      cp1X,
      cp1Y,
      cp2X,
      cp2Y,
      aX,
      aY,
      } = props;

    return new BezierCurveToAction(
      cp1X,
      cp1Y,
      cp2X,
      cp2Y,
      aX,
      aY
    );
  }
}

export default BezierCurveToDescriptor;
