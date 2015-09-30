import THREE from 'three';
import GeometryDescriptorBase from './GeometryDescriptorBase';

import PropTypes from 'react/lib/ReactPropTypes';

class CircleGeometryDescriptor extends GeometryDescriptorBase {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    this.propTypes = {
      ...this.propTypes,

      radius: PropTypes.number,
      segments: PropTypes.number,
      thetaStart: PropTypes.number,
      thetaLength: PropTypes.number,
    };
  }

  construct(props) {
    const {
      radius,
      segments,
      thetaStart,
      thetaLength,
      } = props;

    return new THREE.CircleGeometry(radius, segments, thetaStart, thetaLength);
  }
}

export default CircleGeometryDescriptor;
