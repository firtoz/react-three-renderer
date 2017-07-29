import * as THREE from 'three';

import PropTypes from 'prop-types';

import GeometryDescriptorBase from './GeometryDescriptorBase';

class CircleGeometryDescriptor extends GeometryDescriptorBase {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    [
      'radius',
      'segments',
      'thetaStart',
      'thetaLength',
    ].forEach((propName) => {
      this.hasProp(propName, {
        type: PropTypes.number,
        update: this.triggerRemount,
        default: undefined,
      });
    });
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

module.exports = CircleGeometryDescriptor;
