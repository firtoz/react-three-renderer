import PropTypes from 'react/lib/ReactPropTypes';

import ShapeActionDescriptorBase from './ShapeActionDescriptorBase';
import BezierCurveToAction from '../../../Shapes/BezierCurveToAction';

class BezierCurveToDescriptor extends ShapeActionDescriptorBase {
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

module.exports = BezierCurveToDescriptor;
