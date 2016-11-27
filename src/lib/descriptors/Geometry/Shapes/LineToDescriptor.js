import PropTypes from 'react/lib/ReactPropTypes';

import ShapeActionDescriptorBase from './ShapeActionDescriptorBase';
import LineToAction from '../../../Shapes/LineToAction';

class LineToDescriptor extends ShapeActionDescriptorBase {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    [
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
    return new LineToAction(props.x, props.y);
  }
}

module.exports = LineToDescriptor;
