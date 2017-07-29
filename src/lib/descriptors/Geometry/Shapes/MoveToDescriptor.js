import PropTypes from 'prop-types';

import ShapeActionDescriptorBase from './ShapeActionDescriptorBase';
import MoveToAction from '../../../Shapes/MoveToAction';

class MoveToDescriptor extends ShapeActionDescriptorBase {
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
    return new MoveToAction(props.x, props.y);
  }
}

module.exports = MoveToDescriptor;
