import THREE from 'three';
import GeometryDescriptorBase from './GeometryDescriptorBase';

import PropTypes from 'react/lib/ReactPropTypes';

class LatheGeometryDescriptor extends GeometryDescriptorBase {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    [
      'segments',
      'phiStart',
      'phiLength',
    ].forEach(propName => {
      this.hasProp(propName, {
        type: PropTypes.number,
        update: this.remountInsteadOfUpdating,
        default: undefined,
      });
    });

    this.hasProp('points', {
      type: PropTypes.arrayOf(PropTypes.instanceOf(THREE.Vector3)).isRequired,
      update: this.remountInsteadOfUpdating,
      default: undefined,
    });
  }

  construct(props) {
    const {
      points,
      segments,
      phiStart,
      phiLength,
      } = props;

    return new THREE.LatheGeometry(points, segments, phiStart, phiLength);
  }
}

export default LatheGeometryDescriptor;
