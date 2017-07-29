import * as THREE from 'three';

import PropTypes from 'prop-types';

import BufferGeometryDescriptorBase from './BufferGeometryDescriptorBase';

import propTypeInstanceOf from '../../utils/propTypeInstanceOf';

class EdgesGeometryDescriptor extends BufferGeometryDescriptorBase {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    this.hasProp('thresholdAngle', {
      type: PropTypes.number,
      update: this.updateCacheAndReplace.bind(this, 'thresholdAngle'),
      default: undefined,
    });

    this.hasProp('geometry', {
      type: PropTypes.oneOfType([
        propTypeInstanceOf(THREE.Geometry),
        propTypeInstanceOf(THREE.BufferGeometry),
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
