import THREE from 'three';
import GeometryDescriptorBase from './GeometryDescriptorBase';

import PropTypes from 'react/lib/ReactPropTypes';

class TorusKnotGeometryDescriptor extends GeometryDescriptorBase {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    this.propTypes = {
      ...this.propTypes,

      radius: PropTypes.number,
      tube: PropTypes.number,
      radialSegments: PropTypes.number,
      tubularSegments: PropTypes.number,
      p: PropTypes.number,
      q: PropTypes.number,
      heightScale: PropTypes.number,
    };
  }

  construct(props) {
    const {
      radius,
      tube,
      radialSegments,
      tubularSegments,
      p,
      q,
      heightScale,
      } = props;

    return new THREE.TorusKnotGeometry(radius, tube, radialSegments, tubularSegments, p, q, heightScale);
  }
}

export default TorusKnotGeometryDescriptor;
