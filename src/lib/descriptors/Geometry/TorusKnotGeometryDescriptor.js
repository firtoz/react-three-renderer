import THREE from 'three';

import PropTypes from 'react/lib/ReactPropTypes';

import GeometryDescriptorBase from './GeometryDescriptorBase';

class TorusKnotGeometryDescriptor extends GeometryDescriptorBase {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    [
      'radius',
      'tube',
      'tubularSegments',
      'radialSegments',
      'p',
      'q',
      'heightScale',
    ].forEach(propName => {
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
