import PropTypes from 'prop-types';

import ShapeActionDescriptorBase from './ShapeActionDescriptorBase';
import QuadraticCurveToAction from '../../../Shapes/QuadraticCurveToAction';

class QuadraticCurveToDescriptor extends ShapeActionDescriptorBase {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    [
      'cpX',
      'cpY',
      'x',
      'y',
    ].forEach((propName) => {
      this.hasProp(propName, {
        type: PropTypes.number.isRequired,
        update: this.triggerRemount,
        default: 0,
      });
    });
  }

  construct(props) {
    const {
      cpX,
      cpY,
      x,
      y,
    } = props;

    return new QuadraticCurveToAction(
      cpX,
      cpY,
      x,
      y
    );
  }
}

module.exports = QuadraticCurveToDescriptor;
