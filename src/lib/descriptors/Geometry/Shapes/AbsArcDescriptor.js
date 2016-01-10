import ShapeActionDescriptorBase from './ShapeActionDescriptorBase';

import PropTypes from 'react/lib/ReactPropTypes';

import AbsArcAction from '../../../Shapes/AbsArcAction';

class AbsArcDescriptor extends ShapeActionDescriptorBase {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    [
      'x',
      'y',
      'radius',
      'startAngle',
      'endAngle',
    ].forEach(propName => {
      this.hasProp(propName, {
        type: PropTypes.number.isRequired,
        update: this.triggerRemount,
        'default': 0,
      });
    });

    this.hasProp('clockwise', {
      type: PropTypes.bool.isRequired,
      update: this.triggerRemount,
      'default': false,
    });
  }

  construct(props) {
    const {
      x,
      y,
      radius,
      startAngle,
      endAngle,
      clockwise,
      } = props;

    return new AbsArcAction(
      x,
      y,
      radius,
      startAngle,
      endAngle,
      clockwise
    );
  }
}

module.exports = AbsArcDescriptor;
