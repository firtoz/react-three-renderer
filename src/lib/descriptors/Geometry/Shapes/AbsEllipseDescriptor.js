import PropTypes from 'react/lib/ReactPropTypes';

import ShapeActionDescriptorBase from './ShapeActionDescriptorBase';
import AbsEllipseAction from '../../../Shapes/AbsEllipseAction';

class AbsEllipseDescriptor extends ShapeActionDescriptorBase {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    [
      'x',
      'y',
      'xRadius',
      'yRadius',
      'startAngle',
      'endAngle',
    ].forEach(propName => {
      this.hasProp(propName, {
        type: PropTypes.number.isRequired,
        update: this.triggerRemount,
        default: 0,
      });
    });

    this.hasProp('clockwise', {
      type: PropTypes.bool,
      update: this.triggerRemount,
      default: false,
    });

    this.hasProp('rotation', {
      type: PropTypes.number,
      update: this.triggerRemount,
      default: 0,
    });
  }

  construct(props) {
    const {
      x,
      y,
      xRadius,
      yRadius,
      startAngle,
      endAngle,
      clockwise,
      rotation,
    } = props;

    return new AbsEllipseAction(
      x,
      y,
      xRadius,
      yRadius,
      startAngle,
      endAngle,
      clockwise,
      rotation
    );
  }
}

module.exports = AbsEllipseDescriptor;
