import THREE from 'three';
import GeometryDescriptorBase from './GeometryDescriptorBase';

import PropTypes from 'react/lib/ReactPropTypes';

class ParametricGeometryDescriptor extends GeometryDescriptorBase {
  constructor(react3Instance) {
    super(react3Instance);

    this.propTypes = {
      ...this.propTypes,

      parametricFunction: PropTypes.func.isRequired,
      slices: PropTypes.number.isRequired,
      stacks: PropTypes.number.isRequired,
    };
  }

  construct(props) {
    const {
      parametricFunction,
      slices,
      stacks,
      } = props;

    return new THREE.ParametricGeometry(parametricFunction, slices, stacks);
  }


  applyInitialProps(self, props) {
    super.applyInitialProps(self, props);
  }
}

export default ParametricGeometryDescriptor;
