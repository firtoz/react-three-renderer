import THREE from 'three';
import GeometryDescriptorBase from './GeometryDescriptorBase';

class ParametricGeometryDescriptor extends GeometryDescriptorBase {
  constructor(react3Instance) {
    super(react3Instance);
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

    if (props.hasOwnProperty('dynamic')) {
      self.dynamic = !!props.dynamic;
    }
  }
}

export default ParametricGeometryDescriptor;
