import * as THREE from 'three';

import PropTypes from 'react/lib/ReactPropTypes';

import BufferGeometryDescriptorBase from './BufferGeometryDescriptorBase';

class EdgesGeometryDescriptor extends BufferGeometryDescriptorBase {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    this.hasProp('thresholdAngle', {
      type: PropTypes.number,
      update: this.updateCacheAndReplace.bind(this, 'thresholdAngle'),
      default: undefined,
    });

    this.hasProp('geometry', {
      type: PropTypes.oneOf([
        THREE.Geometry,
        THREE.BufferGeometry,
      ]).isRequired,
      update: this.updateCacheAndReplace.bind(this, 'geometry'),
      default: undefined,
    });
  }

  construct(props) {
    const {
      geometry,
      thresholdAngle,
    } = props;

    return new THREE.EdgesGeometry(geometry, thresholdAngle);
  }
}

module.exports = EdgesGeometryDescriptor;
