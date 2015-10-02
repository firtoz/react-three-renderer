import Viewport from '../Viewport';

import THREEElementDescriptor from './THREEElementDescriptor';

import PropTypes from 'react/lib/ReactPropTypes';

class ViewportDescriptor extends THREEElementDescriptor {
  constructor(react3Instance) {
    super(react3Instance);

    this.propTypes = {
      ...this.propTypes,

      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,

      cameraName: PropTypes.string.isRequired,
    };

    this.useSimpleUpdates([
      'x',
      'y',
      'width',
      'height',
      'cameraName',
    ]);
  }

  construct(props) {
    return new Viewport(props);
  }

  unmount() {
    super.unmount(threeObject);
  }

  setParent(threeObject, parentObject3D) {
    super.setParent(threeObject, parentObject3D);
  }
}

export default ViewportDescriptor;
