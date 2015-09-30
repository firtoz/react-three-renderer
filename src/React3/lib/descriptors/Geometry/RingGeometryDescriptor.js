import THREE from 'three';
import GeometryDescriptorBase from './GeometryDescriptorBase';

import PropTypes from 'react/lib/ReactPropTypes';

class RingGeometryDescriptor extends GeometryDescriptorBase {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    this.propTypes = {
      ...this.propTypes,

      innerRadius: PropTypes.number,
      outerRadius: PropTypes.number,
      thetaSegments: PropTypes.number,
      phiSegments: PropTypes.number,
      thetaStart: PropTypes.number,
      thetaLength: PropTypes.number,
    };
  }

  construct(props) {
    const {
      innerRadius,
      outerRadius,
      thetaSegments,
      phiSegments,
      thetaStart,
      thetaLength,
      } = props;

    return new THREE.RingGeometry(innerRadius, outerRadius, thetaSegments, phiSegments, thetaStart, thetaLength);
  }
}

export default RingGeometryDescriptor;
