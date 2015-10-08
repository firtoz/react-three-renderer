import Viewport from '../Viewport';

import THREEElementDescriptor from './THREEElementDescriptor';

import PropTypes from 'react/lib/ReactPropTypes';

class ViewportDescriptor extends THREEElementDescriptor {
  constructor(react3Instance) {
    super(react3Instance);

    [
      'x',
      'y',
      'width',
      'height',
    ].forEach(propName => {
      this.hasProp(propName, {
        type: PropTypes.number.isRequired,
        simple: true,
      });
    });

    this.hasProp('cameraName', {
      type: PropTypes.string.isRequired,
      simple: true,
    });
  }

  construct(props) {
    return new Viewport(props);
  }
}

export default ViewportDescriptor;
