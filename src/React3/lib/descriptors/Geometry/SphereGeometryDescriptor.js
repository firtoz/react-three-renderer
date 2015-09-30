import THREE from 'three';
import GeometryDescriptorBase from './GeometryDescriptorBase';

import PropTypes from 'react/lib/ReactPropTypes';

class SphereGeometryDescriptor extends GeometryDescriptorBase {
  constructor(react3Instance) {
    super(react3Instance);

    this.propUpdates = {
      ...this.propUpdates,
    };

    this.propTypes = {
      ...this.propTypes,

      radius: PropTypes.number,
      widthSegments: PropTypes.number,
      heightSegments: PropTypes.number,
      phiStart: PropTypes.number,
      phiLength: PropTypes.number,
      thetaStart: PropTypes.number,
      thetaLength: PropTypes.number,
    };
  }

  construct(props) {
    const {
      radius,
      widthSegments,
      heightSegments,
      phiStart,
      phiLength,
      thetaStart,
      thetaLength,
      } = props;

    return new THREE.SphereBufferGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength);
  }
}

export default SphereGeometryDescriptor;
