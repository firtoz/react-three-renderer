import * as THREE from 'three';

import PropTypes from 'prop-types';

import GeometryDescriptorBase from './GeometryDescriptorBase';

class TorusKnotGeometryDescriptor extends GeometryDescriptorBase {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    const defaultValues = [
      100, // 'radius',
      40, // 'tube',
      64, // 'tubularSegments',
      8, // 'radialSegments',
      2, // 'p',
      3, // 'q',
      undefined, // 'heightScale',
    ];

    [
      'radius',
      'tube',
      'tubularSegments',
      'radialSegments',
      'p',
      'q',
      'heightScale',
    ].forEach((propName, i) => {
      this.hasProp(propName, {
        type: PropTypes.number,
        update: this.triggerRemount,
        default: defaultValues[i],
      });
    });
  }

  construct(props) {
    const {
      radius,
      tube,
      tubularSegments,
      radialSegments,
      p,
      q,
      heightScale,
    } = props;

    return new THREE.TorusKnotGeometry(
      radius,
      tube,
      tubularSegments,
      radialSegments,
      p,
      q,
      heightScale);
  }
}

module.exports = TorusKnotGeometryDescriptor;
